import Feedback from '../models/Feedback.js';

// @desc    Create new feedback/complaint
// @route   POST /api/feedback
const createFeedback = async (req, res) => {
    const { title, description, category } = req.body;
    try {
        const feedback = new Feedback({
            student: req.user._id,
            title,
            description,
            category
        });
        const createdFeedback = await feedback.save();
        res.status(201).json(createdFeedback);
    } catch (error) {
        res.status(400).json({ message: 'Invalid feedback data' });
    }
};

// @desc    Get my feedback history
// @route   GET /api/feedback
const getMyFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find({ student: req.user._id }).sort({ createdAt: -1 });
        res.json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all feedback (Admin)
// @route   GET /api/admin/feedback
const getAllFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find({})
            .populate('student', 'name email studentId')
            .sort({ createdAt: -1 });
        res.json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update feedback status/response (Admin)
// @route   PUT /api/admin/feedback/:id
const updateFeedbackAdmin = async (req, res) => {
    try {
        const { status, adminResponse } = req.body;
        const feedback = await Feedback.findById(req.params.id);

        if (feedback) {
            feedback.status = status || feedback.status;
            feedback.adminResponse = adminResponse || feedback.adminResponse;
            const updated = await feedback.save();
            res.json(updated);
        } else {
            res.status(404).json({ message: 'Feedback not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createFeedback, getMyFeedback, getAllFeedback, updateFeedbackAdmin };
