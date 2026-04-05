
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();

const seedDirect = async () => {
    try {
        await connectDB();

        // --- Admin ---
        const adminEmail = "admin@university.edu";
        // Convert to string in case, though schema handles it
        const adminPass = "admin123";

        // Delete existing if any to ensure clean slate with known password
        await User.deleteOne({ email: adminEmail });

        const admin = await User.create({
            name: "Super Admin",
            email: adminEmail,
            password: adminPass,
            role: "ADMIN",
            department: "Administration",
            status: "APPROVED",
            isVerified: true
        });

        console.log(`\nSUCCESS: Admin created.`);
        console.log(`Email: ${admin.email}`);
        console.log(`Password: ${adminPass}\n`);


        // --- Faculty ---
        const facultyEmail = "faculty@university.edu";
        const facultyPass = "faculty123";

        await User.deleteOne({ email: facultyEmail });

        const faculty = await User.create({
            name: "Dr. Sarah Wilson",
            email: facultyEmail,
            password: facultyPass,
            role: "FACULTY",
            department: "Computer Science",
            designation: "Professor",
            status: "APPROVED",
            isVerified: true
        });

        console.log(`SUCCESS: Faculty created.`);
        console.log(`Email: ${faculty.email}`);
        console.log(`Password: ${facultyPass}\n`);

        process.exit();

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedDirect();
