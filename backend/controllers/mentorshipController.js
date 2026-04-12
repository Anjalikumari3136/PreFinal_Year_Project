import Mentorship from '../models/Mentorship.js';
import User from '../models/User.js';
import { createNotification } from './notificationController.js';

import sendEmail from '../utils/sendEmail.js';

// @desc    Request a mentor
// @route   POST /api/mentorship/request
// @access  Private/Student
const createMentorshipRequest = async (req, res) => {
    const { mentorId, message } = req.body;

    if (!mentorId || !message) {
        return res.status(400).json({ message: 'Please provide mentor and message' });
    }

    try {
        const mentorship = new Mentorship({
            student: req.user._id,
            mentor: mentorId,
            requestMessage: message,
            status: 'PENDING'
        });

        const createdMentorship = await mentorship.save();

        // Notify faculty via Email
        const faculty = await User.findById(mentorId);
        if (faculty && faculty.email) {
            await sendEmail({
                email: faculty.email,
                name: faculty.name,
                subject: 'New Mentorship Request',
                htmlContent: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                        <h2 style="color: #ea580c;">New Student Mentorship Request</h2>
                        <p>Dear Professor <strong>${faculty.name}</strong>,</p>
                        <p>A new student has requested you to be their Academic Mentor.</p>
                        <div style="background: #fff7ed; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #ea580c;">
                            <p><strong>Student Name:</strong> ${req.user.name}</p>
                            <p><strong>Message:</strong> "${message}"</p>
                        </div>
                        <p>Please log in to your <strong>Faculty Mentee Console</strong> to review and authorize this request.</p>
                        <br/>
                        <p>Regards,<br/>Campus Support Bureau</p>
                    </div>
                `
            }).catch(err => console.log('Mentorship Email Error:', err));
        }

        res.status(201).json(createdMentorship);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get student's mentorship requests
// @route   GET /api/mentorship/my-requests
// @access  Private/Student
const getMyMentorshipRequests = async (req, res) => {
    try {
        const requests = await Mentorship.find({ student: req.user._id })
            .populate('mentor', 'name department designation profileDetails')
            .sort({ createdAt: -1 });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all mentorship requests (for Admin)
// @route   GET /api/mentorship/admin/requests
// @access  Private/Admin
const getAllMentorshipRequests = async (req, res) => {
    try {
        const requests = await Mentorship.find({})
            .populate('student', 'name studentId department year')
            .populate('mentor', 'name department designation')
            .sort({ createdAt: -1 });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Admin assigns/schedules a meeting or updates status
// @route   PUT /api/mentorship/admin/schedule/:id
// @access  Private/Admin
const scheduleMeeting = async (req, res) => {
    const { date, time, location, meetingNotes, adminResponse, mentorId } = req.body;

    try {
        const mentorship = await Mentorship.findById(req.params.id);

        if (!mentorship) {
            return res.status(404).json({ message: 'Mentorship request not found' });
        }

        if (date && time && location) {
            mentorship.meetingDetails = {
                date,
                time,
                location,
                meetingNotes
            };
            mentorship.status = 'SCHEDULED';
        } else {
            mentorship.status = 'APPROVED';
        }

        if (mentorId) {
            mentorship.mentor = mentorId;
        }

        mentorship.adminResponse = adminResponse;

        // Also update the student's assigned mentor in User model
        const student = await User.findById(mentorship.student);
        if (student) {
            student.assignedMentor = mentorship.mentor;
            await student.save();
        }

        const updatedMentorship = await (await mentorship.save()).populate('mentor', 'name department designation');

        // Notify student of scheduled/approved mentorship
        await createNotification({
            title: 'Mentorship Update',
            message: mentorship.status === 'SCHEDULED'
                ? `Mentorship meeting scheduled for ${date} at ${time}.`
                : 'Your mentorship request has been approved.',
            recipients: [mentorship.student],
            sender: req.user._id
        });

        // Notify mentor
        await createNotification({
            title: 'New Mentorship Assignment',
            message: `You have been assigned as a mentor for student.`,
            recipients: [mentorship.mentor],
            sender: req.user._id
        });

        res.json(updatedMentorship);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Admin updates request status (Reject/Cancel)
// @route   PUT /api/mentorship/admin/status/:id
// @access  Private/Admin
const updateMentorshipStatus = async (req, res) => {
    const { status, adminResponse } = req.body;
    try {
        const mentorship = await Mentorship.findById(req.params.id);
        if (!mentorship) return res.status(404).json({ message: 'Request not found' });

        mentorship.status = status;
        mentorship.adminResponse = adminResponse;

        const updated = await mentorship.save();
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get faculty mentorships/meetings
// @route   GET /api/mentorship/faculty/meetings
// @access  Private/Faculty
const getFacultyMeetings = async (req, res) => {
    try {
        const meetings = await Mentorship.find({
            mentor: req.user._id,
            status: { $in: ['SCHEDULED', 'APPROVED'] }
        })
            .populate('student', 'name studentId department year')
            .sort({ 'meetingDetails.date': 1 });

        res.json(meetings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get faculty list (for Students to request)
// @route   GET /api/mentorship/faculty
// @access  Private
const getMentorsList = async (req, res) => {
    try {
        const faculty = await User.find({ role: 'FACULTY' }).select('name department designation profileDetails facultyRoles');
        res.json(faculty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    createMentorshipRequest,
    getMyMentorshipRequests,
    getAllMentorshipRequests,
    scheduleMeeting,
    getFacultyMeetings,
    getMentorsList,
    updateMentorshipStatus
};
