import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { getNotices } from '../controllers/adminController.js';

router.get('/', protect, getNotices);

export default router;
