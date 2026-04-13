import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    targetAudience: {
        type: String,
        enum: ['ALL', 'STUDENTS', 'FACULTY'],
        default: 'ALL'
    },
    recipients: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        isRead: { type: Boolean, default: false }
    }],
    isGeneral: { type: Boolean, default: false }
}, { timestamps: true });

const Notification = mongoose.model('Notification', NotificationSchema);
export default Notification;
