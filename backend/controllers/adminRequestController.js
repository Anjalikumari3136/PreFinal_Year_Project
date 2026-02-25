import Request from '../models/Request.js';
import { createNotification } from './notificationController.js';

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
        const { status, resolutionNotes } = req.body;
        const request = await Request.findById(req.params.id);

        if (request) {
            request.status = status || request.status;
            request.resolutionNotes = resolutionNotes || request.resolutionNotes;
            if (req.body.assignedTo) request.assignedTo = req.body.assignedTo;

            const updatedRequest = await request.save();

            // Notify student
            await createNotification({
                title: 'Request Update',
                message: `Your request has been updated to ${status}.`,
                recipients: [request.student],
                sender: req.user._id,
                isGeneral: false
            });

            res.json(updatedRequest);
        } else {
            res.status(404).json({ message: 'Request not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getAllRequests, updateRequestStatus };
