import User from '../models/User.js';
import Request from '../models/Request.js';
import Feedback from '../models/Feedback.js';
import Mentorship from '../models/Mentorship.js';

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

        // 3. Workload Calculation (Simulated based on pending approvals and mentees)
        const workload = {
            menteeCount: mentees.length,
            pendingApprovalsCount: pendingApprovals.length,
            score: (mentees.length * 10) + (pendingApprovals.length * 20) // Simple weighting
        };

        // 3a. Get Scheduled Meetings
        const scheduledMeetings = await Mentorship.find({
            mentor: facultyId,
            status: 'SCHEDULED',
            'meetingDetails.date': { $gte: new Date() }
        }).populate('student', 'name studentId department year');

        // 4. SMART INSIGHTS / AI RISK DETECTION (Logic-based for Final Year Project)
        const insights = [];

        for (const student of mentees) {
            const riskFactors = [];

            // Factor 1: Multiple Complaints
            const complaintCount = await Feedback.countDocuments({ student: student._id, category: { $in: ['Academic', 'Harassment'] } });
            if (complaintCount > 2) {
                riskFactors.push({
                    type: 'HIGH_COMPLAINTS',
                    message: `Student has ${complaintCount} recent complaints.`,
                    severity: 'HIGH'
                });
            }

            // Factor 2: High Pending Requests (Poor engagement or blockers)
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

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        // Ensure faculty is the one assigned
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

export { getFacultyDashboard, updateApprovalStatus };
