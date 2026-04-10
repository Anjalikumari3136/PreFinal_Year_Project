import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();

const testLogin = async () => {
    try {
        await connectDB();
        const email = "admin@university.edu";
        const pass = "pass-admin123";
        
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found!");
            process.exit();
        }

        const isMatch = await user.matchPassword(pass);
        console.log(`Password Match for ${email}: ${isMatch}`);
        
        process.exit();
    } catch (error) {
        console.error("Error:", error.message);
        process.exit(1);
    }
};

testLogin();
