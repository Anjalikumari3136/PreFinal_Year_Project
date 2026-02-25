import express from 'express';
import { getFacultyDashboard, updateApprovalStatus } from '../controllers/facultyController.js';
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

export default router;
