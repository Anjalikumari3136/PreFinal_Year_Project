import express from 'express';
import {
    getStudents,
    getFullStudentProfile,
    updateUserStatus,
    getFaculty,
    updateFacultyRoles,
    getFacultyWorkload,
    assignMentor,
    getAuditLogs,
    getDashboardStats,
    getPendingUsers,
    addFaculty,
    updateFaculty,
    deleteFaculty
} from '../controllers/adminController.js';
import { getAllRequests, updateRequestStatus } from '../controllers/adminRequestController.js';
import { getAllFeedback, updateFeedbackAdmin } from '../controllers/feedbackController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(admin);

// Student Management
router.get('/stats', getDashboardStats);
router.get('/students', getStudents);
router.get('/students/:id/full', getFullStudentProfile);
router.get('/pending-approvals', getPendingUsers);
router.put('/users/:id/status', updateUserStatus);
router.put('/students/:id/mentor', assignMentor);

// Faculty Management
router.get('/faculty', getFaculty);
router.get('/faculty/workload', getFacultyWorkload);
router.post('/faculty', addFaculty);
router.put('/faculty/:id', updateFaculty);
router.delete('/faculty/:id', deleteFaculty);
router.put('/faculty/:id/roles', updateFacultyRoles);

// Request Mgmt Routes
router.get('/requests', getAllRequests);
router.put('/requests/:id', updateRequestStatus);

// Feedback & Grievance
router.get('/feedback', getAllFeedback);
router.put('/feedback/:id', updateFeedbackAdmin);

// Logs
router.get('/audit-logs', getAuditLogs);

export default router;
