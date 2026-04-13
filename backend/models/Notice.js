import mongoose from 'mongoose';

const noticeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true
    },
    audience: {
        type: String,
        enum: ['STUDENT', 'FACULTY', 'BOTH'],
        default: 'BOTH'
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const Notice = mongoose.model('Notice', noticeSchema);

export default Notice;
