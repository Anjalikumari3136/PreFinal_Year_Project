import Request from '../models/Request.js';

// @desc    Create new request
// @route   POST /api/requests
// @access  Private
const createRequest = async (req, res) => {
    const { category, title, description } = req.body;

    if (!category || !title || !description) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    try {
        const request = new Request({
            student: req.user._id,
            category,
            title,
            description,
        });

        const createdRequest = await request.save();
        res.status(201).json(createdRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user requests
// @route   GET /api/requests
// @access  Private
const getMyRequests = async (req, res) => {
    try {
        const requests = await Request.find({ student: req.user._id }).sort({ createdAt: -1 });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createRequest, getMyRequests };
