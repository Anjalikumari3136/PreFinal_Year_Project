import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();

const checkDB = async () => {
    try {
        await connectDB();
        const students = await User.find({ role: 'STUDENT' });
        console.log("\n--- STUDENT USERS IN DB ---");
        students.forEach(s => {
            console.log(`Name: ${s.name}`);
            console.log(`Email: ${s.email}`);
            console.log(`Verified: ${s.isVerified}`);
            console.log(`Status: ${s.status}`);
            console.log("--------------------------");
        });
        process.exit();
    } catch (error) {
        console.error("Error:", error.message);
        process.exit(1);
    }
};

checkDB();
