import Request from '../models/Request.js';
import { createNotification } from './notificationController.js';

import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Get all requests (Admin View)
// @route   GET /api/admin/requests
// @access  Private/Admin
const getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find({})
            .populate('student', 'name email studentId')
            .sort({ createdAt: -1 });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update request status & resolution
// @route   PUT /api/admin/requests/:id
// @access  Private/Admin
const updateRequestStatus = async (req, res) => {
    try {
        const { status, resolutionNotes, assignedTo } = req.body;
        const request = await Request.findById(req.params.id);

        if (request) {
            const isNewAssignment = assignedTo && request.assignedTo?.toString() !== assignedTo.toString();

            request.status = status || request.status;
            request.resolutionNotes = resolutionNotes || request.resolutionNotes;
            if (assignedTo) request.assignedTo = assignedTo;

            const updatedRequest = await request.save();

            // Notify student
            if (status) {
                await createNotification({
                    title: 'Request Update',
                    message: `Your request has been updated to ${status}.`,
                    recipients: [request.student],
                    sender: req.user._id,
                    isGeneral: false
                }).catch(err => console.log('Notification error:', err));
            }

            // Email Student
            const student = await User.findById(request.student);
            if (student && student.email && status) {
                await sendEmail({
                    email: student.email,
                    name: student.name,
                    subject: 'Request Status Updated',
                    htmlContent: `
                        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                            <h2 style="color: #0c4a6e;">Campus Connect Update</h2>
                            <p>Hi <strong>${student.name}</strong>,</p>
                            <p>Your request titled "<b>${request.title || 'Student Query'}</b>" has been updated.</p>
                            <div style="background: #f8fafc; padding: 15px; border-radius: 5px; margin: 15px 0;">
                                <p><strong>Status:</strong> ${request.status}</p>
                                ${request.resolutionNotes ? `<p><strong>Official Notes:</strong> ${request.resolutionNotes}</p>` : ''}
                            </div>
                            <p>Log in to your Student Portal for more details.</p>
                        </div>
                    `
                });
            }

            // Email Faculty if assignedTo is provided (even if re-assigned)
            if (assignedTo) {
                const faculty = await User.findById(assignedTo);
                if (faculty && faculty.email) {
                    await sendEmail({
                        email: faculty.email,
                        name: faculty.name,
                        subject: '🚨 New Case Assigned: Student Grievance',
                        htmlContent: `
                            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                                <h2 style="color: #ea580c;">New Grievance Desk Assignment</h2>
                                <p>Dear Professor <strong>${faculty.name}</strong>,</p>
                                <p>A student request has been formally assigned to your desk by the Campus Administration.</p>
                                <div style="background: #fff7ed; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #ea580c;">
                                    <p><strong>Case Title:</strong> ${request.title || 'Student Query'}</p>
                                    <p><strong>Student ID:</strong> ${student?.studentId || 'N/A'}</p>
                                    <p><strong>Category:</strong> ${request.category || 'General'}</p>
                                </div>
                                <p>Please log in to your <strong>Faculty Console</strong> to review the details and provide an official resolution.</p>
                                <br/>
                                <p>Regards,<br/>Campus Administration Bureau</p>
                            </div>
                        `
                    }).catch(err => console.log('Faculty email error:', err));
                }
            }

            res.json(updatedRequest);
        } else {
            res.status(404).json({ message: 'Request not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getAllRequests, updateRequestStatus };
