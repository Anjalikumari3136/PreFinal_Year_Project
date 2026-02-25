import User from '../models/User.js';
import Request from '../models/Request.js';
import Feedback from '../models/Feedback.js';
import AuditLog from '../models/AuditLog.js';
import Mentorship from '../models/Mentorship.js';

// Helper to log actions
const logAction = async (action, adminId, targetId, details = '') => {
    try {
        await AuditLog.create({
            action,
            performedBy: adminId,
            targetUser: targetId,
            details
        });
    } catch (err) {
        console.error('Audit Log Error:', err);
    }
};

// @desc    Get counts for dashboard
// @route   GET /api/admin/stats
const getDashboardStats = async (req, res) => {
    try {
        const studentsCount = await User.countDocuments({ role: 'STUDENT' });
        const facultyCount = await User.countDocuments({ role: 'FACULTY' });
        const pendingRequestsCount = await Request.countDocuments({ status: 'PENDING' });
        const totalFeedbackCount = await Feedback.countDocuments();
        const pendingMentorshipCount = await Mentorship.countDocuments({ status: 'PENDING' });

        res.json({
            students: studentsCount,
            faculty: facultyCount,
            requests: pendingRequestsCount,
            feedback: totalFeedbackCount,
            mentorship: pendingMentorshipCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all students with advanced filters
// @route   GET /api/admin/students
const getStudents = async (req, res) => {
    try {
        const { department, year, semester, status, limit } = req.query;
        let query = { role: 'STUDENT' };

        if (department) query.department = department;
        if (year) query.year = year;
        if (semester) query.semester = semester;
        if (status !== undefined) query.isActive = status === 'active';

        let studentsQuery = User.find(query)
            .select('-password')
            .populate('assignedMentor', 'name')
            .sort({ createdAt: -1 });

        if (limit) studentsQuery = studentsQuery.limit(parseInt(limit));

        const students = await studentsQuery;

        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get comprehensive student profile (Academic + History)
// @route   GET /api/admin/students/:id/full
const getFullStudentProfile = async (req, res) => {
    try {
        const student = await User.findById(req.params.id).select('-password').populate('assignedMentor', 'name email');
        if (!student) return res.status(404).json({ message: 'Student not found' });

        const requests = await Request.find({ student: student._id }).sort({ createdAt: -1 });
        const feedbacks = await Feedback.find({ student: student._id }).sort({ createdAt: -1 });

        res.json({
            profile: student,
            history: {
                requests,
                feedbacks
            },
            riskIndicators: {
                pendingCount: requests.filter(r => r.status === 'PENDING').length,
                complaintCount: feedbacks.filter(f => f.category === 'Harassment' || f.category === 'Academic').length,
                isHighRisk: requests.filter(r => r.status === 'PENDING').length > 3 || feedbacks.length > 5
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Assign faculty roles and expertise
// @route   PUT /api/admin/faculty/:id/roles
const updateFacultyRoles = async (req, res) => {
    try {
        const { facultyRoles, designation, department } = req.body;
        const faculty = await User.findById(req.params.id);

        if (faculty) {
            faculty.facultyRoles = facultyRoles || faculty.facultyRoles;
            faculty.designation = designation || faculty.designation;
            faculty.department = department || faculty.department;

            await faculty.save();
            await logAction('UPDATE_FACULTY_ROLES', req.user._id, faculty._id, `Updated roles to: ${faculty.facultyRoles.join(', ')}`);

            res.json({ message: 'Faculty profile updated', faculty });
        } else {
            res.status(404).json({ message: 'Faculty not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Faculty Workload Matrix
// @route   GET /api/admin/faculty/workload
const getFacultyWorkload = async (req, res) => {
    try {
        const facultyList = await User.find({ role: 'FACULTY' }).select('name department facultyRoles');

        const workloadMatrix = await Promise.all(facultyList.map(async (f) => {
            const menteeCount = await User.countDocuments({ assignedMentor: f._id });
            const activeRequests = await Request.countDocuments({ assignedTo: f._id, status: { $ne: 'RESOLVED' } });

            return {
                _id: f._id,
                name: f.name,
                dept: f.department,
                roles: f.facultyRoles,
                mentees: menteeCount,
                tasks: activeRequests,
                score: (menteeCount * 5) + (activeRequests * 10)
            };
        }));

        res.json(workloadMatrix);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a new faculty member
// @route   POST /api/admin/faculty
const addFaculty = async (req, res) => {
    try {
        const { name, email, password, department, designation, facultyRoles } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const faculty = await User.create({
            name,
            email,
            password,
            role: 'FACULTY',
            department,
            designation,
            facultyRoles: facultyRoles || []
        });

        await logAction('ADD_FACULTY', req.user._id, faculty._id, `Added faculty: ${faculty.name}`);

        res.status(201).json(faculty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update faculty member details
// @route   PUT /api/admin/faculty/:id
const updateFaculty = async (req, res) => {
    try {
        const { name, email, department, designation, facultyRoles, isActive } = req.body;
        const faculty = await User.findById(req.params.id);

        if (!faculty) {
            return res.status(404).json({ message: 'Faculty not found' });
        }

        faculty.name = name || faculty.name;
        faculty.email = email || faculty.email;
        faculty.department = department || faculty.department;
        faculty.designation = designation || faculty.designation;
        faculty.facultyRoles = facultyRoles || faculty.facultyRoles;
        if (isActive !== undefined) faculty.isActive = isActive;

        const updatedFaculty = await faculty.save();
        await logAction('UPDATE_FACULTY_DETAILS', req.user._id, faculty._id, `Updated details for: ${faculty.name}`);

        res.json(updatedFaculty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete/Deactivate faculty
// @route   DELETE /api/admin/faculty/:id
const deleteFaculty = async (req, res) => {
    try {
        const faculty = await User.findById(req.params.id);
        if (!faculty) return res.status(404).json({ message: 'Faculty not found' });

        await User.findByIdAndDelete(req.params.id);
        await logAction('DELETE_FACULTY', req.user._id, req.params.id, `Deleted faculty member`);

        res.json({ message: 'Faculty member removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Audit Logs
// @route   GET /api/admin/audit-logs
const getAuditLogs = async (req, res) => {
    try {
        const logs = await AuditLog.find({})
            .populate('performedBy', 'name role adminRole')
            .populate('targetUser', 'name role')
            .sort({ createdAt: -1 })
            .limit(100);
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Existing functions modified to log
const updateUserStatus = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.isActive = req.body.isActive;
            await user.save();
            await logAction(user.isActive ? 'ACTIVATE_USER' : 'DEACTIVATE_USER', req.user._id, user._id);
            res.json({ message: 'Status updated' });
        }
    } catch (error) { res.status(500).json({ message: error.message }); }
};

const getFaculty = async (req, res) => {
    try {
        const faculty = await User.find({ role: 'FACULTY' }).select('-password');
        res.json(faculty);
    } catch (error) { res.status(500).json({ message: error.message }); }
};

const assignMentor = async (req, res) => {
    try {
        const student = await User.findById(req.params.id);
        student.assignedMentor = req.body.mentorId;
        await student.save();
        await logAction('ASSIGN_MENTOR', req.user._id, student._id, `Assigned mentor: ${req.body.mentorId}`);
        res.json({ message: 'Mentor assigned' });
    } catch (error) { res.status(500).json({ message: error.message }); }
};

export {
    getStudents,
    getFullStudentProfile,
    updateUserStatus,
    getFaculty,
    updateFacultyRoles,
    getFacultyWorkload,
    assignMentor,
    getAuditLogs,
    getDashboardStats,
    addFaculty,
    updateFaculty,
    deleteFaculty
};
