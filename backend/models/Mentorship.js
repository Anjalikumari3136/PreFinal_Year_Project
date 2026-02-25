import mongoose from 'mongoose';

const MentorshipSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'REJECTED', 'SCHEDULED', 'COMPLETED', 'CANCELLED'],
        default: 'PENDING'
    },
    requestMessage: {
        type: String,
        required: true
    },
    meetingDetails: {
        date: { type: Date },
        time: { type: String },
        location: { type: String }, // e.g., Room 101 or Zoom Link
        meetingNotes: { type: String }
    },
    adminResponse: {
        type: String
    }
}, { timestamps: true });

const Mentorship = mongoose.model('Mentorship', MentorshipSchema);
export default Mentorship;
