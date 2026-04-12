import Request from '../models/Request.js';
import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Create new request
// @route   POST /api/requests
// @access  Private
const createRequest = async (req, res) => {
    const { category, title, description } = req.body;

    if (!category || !title || !description) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    try {
        let assignedTo = null;

        // Auto-routing logic with fallback for demo/testing
        if (category === 'DEAN_OFFICE') {
            const dean = await User.findOne({ designation: /Dean/i }) || await User.findOne({ department: 'DEAN_OFFICE' });
            if (dean) assignedTo = dean._id;
        } else if (category === 'ACADEMIC') {
            const professor = await User.findOne({ designation: /Professor/i }) || await User.findOne({ department: 'Computer Science', role: 'FACULTY' });
            if (professor) assignedTo = professor._id;
        } else {
            // Priority: find someone from that department, otherwise assign to first available faculty (for testing)
            let genericFaculty = await User.findOne({ department: category, role: 'FACULTY' });
            if (!genericFaculty) {
                genericFaculty = await User.findOne({ role: 'FACULTY' });
            }
            if (genericFaculty) assignedTo = genericFaculty._id;
        }

        const request = new Request({
            student: req.user._id,
            category,
            title,
            description,
            assignedTo // Could be null if no direct match found
        });

        const createdRequest = await request.save();

        // 📧 SEND EMAIL TO ASSIGNED FACULTY
        if (assignedTo) {
            const facultyUser = await User.findById(assignedTo);
            if (facultyUser && facultyUser.email) {
                await sendEmail({
                    email: facultyUser.email,
                    name: facultyUser.name,
                    subject: `[ACTION REQUIRED] New Student Query: ${title}`,
                    htmlContent: `
                        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                            <h2 style="color: #ea580c;">New Institutional Query Received</h2>
                            <p>Hello <strong>${facultyUser.name}</strong>,</p>
                            <p>A new student query has been assigned to your department for review.</p>
                            <div style="background: #fdf2f8; padding: 15px; border-radius: 5px; margin: 20px 0;">
                                <p><strong>Subject:</strong> ${title}</p>
                                <p><strong>Student:</strong> ${req.user.name}</p>
                            </div>
                            <p>Please log in to the <strong>UniSupport Faculty Portal</strong> to provide a resolution.</p>
                            <br/>
                            <p>Regards,<br/>Campus Support Bureau</p>
                        </div>
                    `
                });
            }
        }

        res.status(201).json(createdRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

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
