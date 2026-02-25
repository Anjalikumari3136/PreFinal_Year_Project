import express from 'express';
const router = express.Router();
import {
    createMentorshipRequest,
    getMyMentorshipRequests,
    getAllMentorshipRequests,
    scheduleMeeting,
    getFacultyMeetings,
    getMentorsList,
    updateMentorshipStatus
} from '../controllers/mentorshipController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Faculty middleware (could be moved to authMiddleware.js)
const faculty = (req, res, next) => {
    if (req.user && (req.user.role === 'FACULTY' || req.user.role === 'ADMIN')) {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as faculty' });
    }
};

router.route('/request').post(protect, createMentorshipRequest);
router.route('/my-requests').get(protect, getMyMentorshipRequests);
router.route('/faculty').get(protect, getMentorsList);
router.route('/admin/requests').get(protect, admin, getAllMentorshipRequests);
router.route('/admin/schedule/:id').put(protect, admin, scheduleMeeting);
router.route('/admin/status/:id').put(protect, admin, updateMentorshipStatus);
router.route('/faculty/meetings').get(protect, faculty, getFacultyMeetings);

export default router;
