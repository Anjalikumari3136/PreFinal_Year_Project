import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { createServer } from 'http';
import { initSocket } from './utils/socket.js';

dotenv.config();

// Connect to Database
connectDB();

const app = express();
const httpServer = createServer(app);

// Routes
import authRoutes from './routes/authRoutes.js';
import requestRoutes from './routes/requestRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import facultyRoutes from './routes/facultyRoutes.js';
import mentorshipRoutes from './routes/mentorshipRoutes.js';
import userRoutes from './routes/userRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import noticeRoutes from './routes/noticeRoutes.js';

// Initialize Socket.io
initSocket(httpServer);

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/mentorship', mentorshipRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/notices', noticeRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('CampusConnect API is running...');
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
