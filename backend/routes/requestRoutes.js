import express from 'express';
import { createRequest, getMyRequests } from '../controllers/requestController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createRequest).get(protect, getMyRequests);

export default router;
