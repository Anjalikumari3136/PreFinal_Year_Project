import mongoose from 'mongoose';

const feedbackSchema = mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Academic', 'Infrastructure', 'Harassment', 'Other'],
        default: 'Other'
    },
    status: {
        type: String,
        enum: ['PENDING', 'REVIEWED', 'RESOLVED'],
        default: 'PENDING'
    },
    adminResponse: {
        type: String
    }
}, {
    timestamps: true
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
