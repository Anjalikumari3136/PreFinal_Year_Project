import express from 'express';
const router = express.Router();
import { getUserNotifications, markAsRead } from '../controllers/notificationController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getUserNotifications);
router.route('/:id/read').put(protect, markAsRead);

export default router;
