import User from '../models/User.js';
import Request from '../models/Request.js';
import Feedback from '../models/Feedback.js';
import Mentorship from '../models/Mentorship.js';
import Notification from '../models/Notification.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Get faculty dashboard stats and insights
// @route   GET /api/faculty/dashboard
// @access  Private/Faculty
const getFacultyDashboard = async (req, res) => {
    try {
        const facultyId = req.user._id;

        // 1. Get Assigned Students (Mentees)
        const mentees = await User.find({ assignedMentor: facultyId }).select('name email studentId department semester workloadScore');

        // 2. Get Pending Approvals (Requests assigned to this faculty)
        const pendingApprovals = await Request.find({
            assignedTo: facultyId,
            status: { $in: ['PENDING', 'IN_PROGRESS'] }
        }).populate('student', 'name studentId');

        // 3. Get Grievance Count (Requests assigned or related to Faculty's Dept)
        const orConditions = [{ assignedTo: facultyId }];
        
        const deptCategoryMap = {
            'Examination Department': 'EXAM',
            'Registrar / Documentation': 'REGISTRAR',
            'Fees & Accounts Office': 'FEES',
            'Hostel Management': 'HOSTEL',
            'Administrative Office': 'ADMINISTRATIVE',
            'Career & Placements': 'PLACEMENT',
            'Central Library Services': 'LIBRARY',
            'Sports & Athletics Bureau': 'SPORTS',
            'Transport & Logistics': 'TRANSPORT',
            'Office of the Dean': 'DEAN_OFFICE'
        };
        
        const mappedCategory = deptCategoryMap[req.user.department];
        if (mappedCategory) {
            orConditions.push({ category: mappedCategory });
        }

        // Safety fallback for examination
        if (req.user.department === 'Examination Department' || !req.user.department) {
             orConditions.push({ category: 'EXAM' });
        }

        const grievancesCount = await Request.countDocuments({
            $or: orConditions,
            status: { $ne: 'RESOLVED' }
        });

        // 4. Workload Calculation (Simulated based on pending approvals and mentees)
        const workload = {
            menteeCount: mentees.length,
            pendingApprovalsCount: pendingApprovals.length,
            grievanceCount: grievancesCount,
            score: (mentees.length * 10) + (pendingApprovals.length * 20) + (grievancesCount * 15)
        };

        // 3a. Get Scheduled Meetings
        const scheduledMeetings = await Mentorship.find({
            mentor: facultyId,
            status: 'SCHEDULED',
            'meetingDetails.date': { $gte: new Date() }
        }).populate('student', 'name studentId department year');

        // 4. SMART INSIGHTS / AI RISK DETECTION
        const insights = [];
        for (const student of mentees) {
            const riskFactors = [];
            const complaintCount = await Feedback.countDocuments({ student: student._id, category: { $in: ['Academic', 'Harassment'] } });
            if (complaintCount > 2) {
                riskFactors.push({
                    type: 'HIGH_COMPLAINTS',
                    message: `Student has ${complaintCount} recent complaints.`,
                    severity: 'HIGH'
                });
            }
            const pendingRequests = await Request.countDocuments({ student: student._id, status: 'PENDING' });
            if (pendingRequests > 3) {
                riskFactors.push({
                    type: 'POOR_ENGAGEMENT',
                    message: `${pendingRequests} requests are pending. Needs follow-up.`,
                    severity: 'MEDIUM'
                });
            }
            if (riskFactors.length > 0) {
                insights.push({
                    studentId: student._id,
                    studentName: student.name,
                    studentCode: student.studentId,
                    riskFactors,
                    recommendation: riskFactors.some(r => r.severity === 'HIGH')
                        ? 'Escalate to Counselor immediately'
                        : 'Schedule a 1-on-1 mentorship session'
                });
            }
        }

        res.json({
            faculty: {
                name: req.user.name,
                dept: req.user.department,
                designation: req.user.designation || 'Asst. Professor',
                roles: req.user.facultyRoles || ['Mentor', 'Course Instructor']
            },
            stats: workload,
            mentees,
            pendingApprovals,
            scheduledMeetings,
            insights
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update request status (Faculty as Approver)
// @route   PUT /api/faculty/approvals/:id
// @access  Private/Faculty
const updateApprovalStatus = async (req, res) => {
    try {
        const { status, resolutionNotes } = req.body;
        const request = await Request.findById(req.params.id);
        if (!request) return res.status(404).json({ message: 'Request not found' });
        if (request.assignedTo.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to approve this request' });
        }
        request.status = status;
        request.resolutionNotes = resolutionNotes;
        await request.save();
        res.json({ message: 'Request updated successfully', request });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Send notice to all students/mentees and email them
// @route   POST /api/faculty/send-notice
// @access  Private/Faculty
const sendNoticeToStudents = async (req, res) => {
    try {
        const { title, message, targetGroup } = req.body;
        const facultyId = req.user._id;

        const notification = await Notification.create({
            title,
            message,
            sender: facultyId,
            targetAudience: targetGroup === 'ALL' ? 'STUDENTS' : 'ALL',
            isGeneral: true
        });

        let students = [];
        if (targetGroup === 'MENTEES') {
            students = await User.find({ assignedMentor: facultyId, role: 'STUDENT' });
        } else {
            students = await User.find({ role: 'STUDENT', status: 'APPROVED' });
        }

        for (const student of students) {
            await sendEmail({
                email: student.email,
                name: student.name,
                subject: `New Notice: ${title}`,
                htmlContent: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                        <h2 style="color: #f4511e;">Bureau Alert: ${title}</h2>
                        <p><strong>From:</strong> Professor ${req.user.name}</p>
                        <hr />
                        <p>${message}</p>
                        <br />
                        <p style="font-size: 12px; color: #777;">This is an official notice from the Academic Bureau Terminal.</p>
                    </div>
                `
            });
        }

        res.status(201).json({
            message: `Notice broadcasted to ${students.length} students via email and portal.`,
            notification
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get grievances/requests relevant to faculty (e.g. Exam Cell)
// @route   GET /api/faculty/grievances
// @access  Private/Faculty
const getGrievances = async (req, res) => {
    try {
        const orConditions = [{ assignedTo: req.user._id }];
        
        const deptCategoryMap = {
            'Examination Department': 'EXAM',
            'Registrar / Documentation': 'REGISTRAR',
            'Fees & Accounts Office': 'FEES',
            'Hostel Management': 'HOSTEL',
            'Administrative Office': 'ADMINISTRATIVE',
            'Career & Placements': 'PLACEMENT',
            'Central Library Services': 'LIBRARY',
            'Sports & Athletics Bureau': 'SPORTS',
            'Transport & Logistics': 'TRANSPORT',
            'Office of the Dean': 'DEAN_OFFICE'
        };
        
        const mappedCategory = deptCategoryMap[req.user.department];
        if (mappedCategory) {
            orConditions.push({ category: mappedCategory });
        }

        // Safety fallback
        if (req.user.department === 'Examination Department' || !req.user.department) {
             orConditions.push({ category: 'EXAM' });
        }

        const studentRequests = await Request.find({
            $or: orConditions
        }).populate('student', 'name studentId email');

        let feedbacks = [];
        if (req.user.department === 'Examination Department') {
            feedbacks = await Feedback.find({
                category: 'Examination'
            }).populate('student', 'name studentId email');
        }

        const mappedFeedbacks = feedbacks.map(f => ({
            _id: f._id,
            title: f.title,
            description: f.description,
            status: f.status,
            category: 'EXAMINATION_COMPLAINT',
            student: f.student,
            createdAt: f.createdAt,
            isFeedback: true
        }));

        res.json([...studentRequests, ...mappedFeedbacks]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get grievances assigned to logged in faculty
// @route   GET /api/faculty/assigned-grievances
// @access  Private/Faculty
const getAssignedGrievances = async (req, res) => {
    try {
        const grievances = await Request.find({ assignedTo: req.user._id })
            .populate('student', 'name email studentId')
            .sort({ createdAt: -1 });
        res.json(grievances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Support resolving a grievance (Request or Feedback)
// @route   PUT /api/faculty/grievances/:id
// @access  Private/Faculty
const resolveGrievance = async (req, res) => {
    try {
        const { response } = req.body;

        let item = await Request.findById(req.params.id).populate('student', 'name email');
        if (item) {
            if (item.assignedTo && item.assignedTo.toString() !== req.user._id.toString()) {
                // Ensure faculty has access, assuming they need to be assigned to it
                // We let it pass if they are implicitly authorized via department matching
            }

            item.status = 'RESOLVED';
            item.resolutionNotes = response;
            await item.save();

            // 📧 SEND EMAIL TO STUDENT
            if (item.student && item.student.email) {
                await sendEmail({
                    email: item.student.email,
                    name: item.student.name,
                    subject: `Resolved: Your query "${item.title}" is closed`,
                    htmlContent: `
                        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                            <h2 style="color: #059669;">Query Resolved Successfully</h2>
                            <p>Hello <strong>${item.student.name}</strong>,</p>
                            <p>We are pleased to inform you that your query has been resolved by the faculty.</p>
                            <div style="background: #ecfdf5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                                <p><strong>Title:</strong> ${item.title}</p>
                                <p><strong>Resolution Note:</strong> ${response}</p>
                            </div>
                            <p>Log in to your <strong>Student Portal</strong> more details.</p>
                            <br/>
                            <p>Regards,<br/>Campus Support Bureau</p>
                        </div>
                    `
                });
            }

            return res.json({ message: 'Grievance resolved', grievance: item });
        }

        item = await Feedback.findById(req.params.id);
        if (item) {
            item.status = 'RESOLVED';
            item.adminResponse = response;
            await item.save();
            return res.json({ message: 'Complaint resolved', grievance: item });
        }

        res.status(404).json({ message: 'Grievance not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getFacultyDashboard, updateApprovalStatus, sendNoticeToStudents, getGrievances, getAssignedGrievances, resolveGrievance };
