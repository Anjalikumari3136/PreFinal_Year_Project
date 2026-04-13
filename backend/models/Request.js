import mongoose from 'mongoose';

const RequestSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: {
        type: String,
        enum: [
            'ACADEMIC', 'ADMINISTRATIVE', 'EXAM', 'FEES', 
            'REGISTRAR', 'SPORTS', 'LIBRARY', 'PLACEMENT', 
            'HOSTEL', 'TRANSPORT', 'IT_SUPPORT', 'DEAN_OFFICE', 'OTHER'
        ],
        required: true
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
        type: String,
        enum: ['PENDING', 'IN_PROGRESS', 'RESOLVED', 'REJECTED'],
        default: 'PENDING'
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    resolutionNotes: { type: String },
    attachments: [{ type: String }]
}, { timestamps: true });

const Request = mongoose.model('Request', RequestSchema);
export default Request;
