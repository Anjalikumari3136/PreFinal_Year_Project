import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();

const students = [
    {
        name: "Anjali Kumari",
        email: "anjali@student.edu",
        password: "password123",
        role: "STUDENT",
        department: "Computer Science",
        studentId: "CS2024001",
        year: 3,
        semester: 6,
        isActive: true,
        status: "APPROVED",
        isVerified: true
    },
    {
        name: "Rahul Singh",
        email: "rahul@student.edu",
        password: "password123",
        role: "STUDENT",
        department: "Engineering",
        studentId: "EN2024012",
        year: 2,
        semester: 4,
        isActive: true,
        status: "APPROVED",
        isVerified: true
    },
    {
        name: "Priya Sharma",
        email: "priya@student.edu",
        password: "password123",
        role: "STUDENT",
        department: "Business",
        studentId: "BS2024005",
        year: 4,
        semester: 8,
        isActive: false,
        status: "APPROVED",
        isVerified: true
    },
    {
        name: "Amit Patel",
        email: "amit@student.edu",
        password: "password123",
        role: "STUDENT",
        department: "Computer Science",
        studentId: "CS2024088",
        year: 1,
        semester: 2,
        isActive: true,
        status: "PENDING",
        isVerified: true
    }
];

const seedStudents = async () => {
    try {
        await connectDB();

        console.log('Clearing existing students...');
        await User.deleteMany({ role: 'STUDENT' });

        console.log('Seeding new student data...');
        await User.insertMany(students);

        console.log('SUCCESS: Sample students added to the database!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedStudents();
