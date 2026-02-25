import Notification from '../models/Notification.js';
import { sendNotification } from '../utils/socket.js';

// @desc    Get all notifications for a user
// @route   GET /api/notifications
// @access  Private
export const getUserNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        const notifications = await Notification.find({
            $or: [
                { 'recipients.user': userId },
                { targetAudience: 'ALL' },
                { targetAudience: req.user.role === 'STUDENT' ? 'STUDENTS' : 'FACULTY' }
            ]
        }).sort({ createdAt: -1 }).limit(20);

        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
export const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (notification) {
            const recipient = notification.recipients.find(
                r => r.user.toString() === req.user._id.toString()
            );
            if (recipient) {
                recipient.isRead = true;
                await notification.save();
                res.json({ message: 'Notification marked as read' });
            } else {
                // If it's a general notification, we might need a different way to track read status
                // For now just return success
                res.json({ message: 'General notification acknowledged' });
            }
        } else {
            res.status(404).json({ message: 'Notification not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Helper to create and send notification
export const createNotification = async (data) => {
    try {
        const { title, message, recipients, targetAudience, sender, isGeneral } = data;

        const notification = await Notification.create({
            title,
            message,
            sender,
            targetAudience: targetAudience || 'ALL',
            recipients: recipients ? recipients.map(id => ({ user: id })) : [],
            isGeneral: isGeneral || false
        });

        // Send via socket
        if (recipients && recipients.length > 0) {
            recipients.forEach(userId => {
                sendNotification(userId.toString(), notification);
            });
        } else if (targetAudience) {
            // Room-based broadcast could be added here
            // For now just emit to all if ALL
            // sendNotificationToAll(notification);
        }

        return notification;
    } catch (error) {
        console.error('Error creating notification:', error);
    }
};
