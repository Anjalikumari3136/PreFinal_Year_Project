import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    scheduledDate: { type: Date, required: true },
    status: {
        type: String,
        enum: ['REQUESTED', 'CONFIRMED', 'COMPLETED', 'CANCELLED'],
        default: 'REQUESTED'
    },
    topics: { type: String },
    notes: { type: String }
}, { timestamps: true });

const Session = mongoose.model('Session', SessionSchema);
export default Session;
