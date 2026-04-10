import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();

const seedDirect = async () => {
    try {
        await connectDB();

        // --- Admin 1 ---
        const adminEmail1 = "admin@university.edu";
        const adminPass = "admin123";
        await User.deleteOne({ email: adminEmail1 });
        await User.create({
            name: "Super Admin",
            email: adminEmail1,
            password: adminPass,
            role: "ADMIN",
            department: "Administration",
            status: "APPROVED",
            isVerified: true
        });

        // --- Admin 2 (Typo Variation) ---
        const adminEmail2 = "admin@universiy.edu";
        await User.deleteOne({ email: adminEmail2 });
        await User.create({
            name: "Super Admin",
            email: adminEmail2,
            password: adminPass,
            role: "ADMIN",
            department: "Administration",
            status: "APPROVED",
            isVerified: true
        });

        console.log(`\nSUCCESS: Admin accounts created/updated.`);
        console.log(`Email 1: ${adminEmail1}`);
        console.log(`Email 2: ${adminEmail2}`);
        console.log(`Password: ${adminPass}\n`);

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedDirect();
