import sendEmail from './utils/sendEmail.js';
import dotenv from 'dotenv';
dotenv.config();

const test = async () => {
    console.log("Testing email with config:");
    console.log("SENDER:", process.env.BREVO_SENDER_EMAIL);
    console.log("API KEY:", process.env.BREVO_API_KEY ? "EXISTS" : "MISSING");

    try {
        await sendEmail({
            email: 'er.ak3136@gmail.com', // Sending to the sender email as a test
            name: 'Test User',
            subject: 'Test OTP - Campus Connect',
            htmlContent: '<h1>Your OTP is 123456</h1>'
        });
        console.log("Test finished. Check logs above.");
    } catch (err) {
        console.error("Test failed script level:", err);
    }
};

test();
