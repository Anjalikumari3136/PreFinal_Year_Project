import express from 'express';
import { getFacultyDashboard, updateApprovalStatus, sendNoticeToStudents, getGrievances, getAssignedGrievances, resolveGrievance, getFacultyMentorships, updateMentorshipStatusAsFaculty } from '../controllers/facultyController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Middleware to check if user is Faculty
const facultyOnly = (req, res, next) => {
    if (req.user && req.user.role === 'FACULTY') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as Faculty' });
    }
};

router.use(protect);
router.use(facultyOnly);

router.get('/dashboard', getFacultyDashboard);
router.put('/approvals/:id', updateApprovalStatus);
router.post('/send-notice', sendNoticeToStudents);
router.get('/grievances', getGrievances); // Or whichever is correct
router.get('/assigned-grievances', getAssignedGrievances);
router.put('/grievances/:id', resolveGrievance);
router.get('/mentorship', getFacultyMentorships);
router.put('/mentorship/:id', updateMentorshipStatusAsFaculty);

export default router;
