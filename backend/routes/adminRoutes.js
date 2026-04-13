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
    deleteFaculty,
    broadcastNotice
} from '../controllers/adminController.js';
import { getAllRequests, updateRequestStatus } from '../controllers/adminRequestController.js';
import { getAllFeedback, updateFeedbackAdmin } from '../controllers/feedbackController.js';
import { protect, admin, facultyOrAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

// --- SHARED ROUTES (Faculty & Admin) ---
router.get('/faculty', facultyOrAdmin, getFaculty); // Faculty list can be viewed by faculty too
router.post('/broadcast', facultyOrAdmin, broadcastNotice);

// --- ADMIN EXCLUSIVE ROUTES ---
// Student Management
router.get('/stats', admin, getDashboardStats);
// router.post('/broadcast', admin, broadcastNotice); // removed duplicate
router.get('/students', admin, getStudents);
router.get('/students/:id/full', admin, getFullStudentProfile);
router.get('/pending-approvals', admin, getPendingUsers);
router.put('/users/:id/status', admin, updateUserStatus);
router.put('/students/:id/mentor', admin, assignMentor);

// Faculty Management
router.get('/faculty/workload', admin, getFacultyWorkload);
router.post('/faculty', admin, addFaculty);
router.put('/faculty/:id', admin, updateFaculty);
router.delete('/faculty/:id', admin, deleteFaculty);
router.put('/faculty/:id/roles', admin, updateFacultyRoles);

// Request Mgmt Routes
router.get('/requests', admin, getAllRequests);
router.put('/requests/:id', admin, updateRequestStatus);

// Feedback & Grievance
router.get('/feedback', admin, getAllFeedback);
router.put('/feedback/:id', admin, updateFeedbackAdmin);

// Logs
router.get('/audit-logs', admin, getAuditLogs);

export default router;
