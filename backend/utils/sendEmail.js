import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Sends an email using Brevo REST API (v3)
 */
const sendEmail = async (options) => {
    try {
        const url = 'https://api.brevo.com/v3/smtp/email';
        
        const data = {
            sender: { 
                name: process.env.BREVO_SENDER_NAME || 'Campus Connect', 
                email: process.env.BREVO_SENDER_EMAIL || 'noreply@campusconnect.com' 
            },
            to: [{ 
                email: options.email, 
                name: options.name || 'User' 
            }],
            subject: options.subject,
            htmlContent: options.htmlContent || `<p>${options.message}</p>`
        };

        const config = {
            headers: {
                'accept': 'application/json',
                'api-key': process.env.BREVO_API_KEY,
                'content-type': 'application/json'
            }
        };

        const response = await axios.post(url, data, config);
        console.log('\x1b[32m%s\x1b[0m', '------------------------------------------------');
        console.log('\x1b[32m%s\x1b[0m', `  EMAIL SENT TO: ${options.email}`);
        console.log('\x1b[32m%s\x1b[0m', `  SUBJECT: ${options.subject}`);
        if (options.htmlContent && options.htmlContent.includes('bold')) {
            const otpCode = options.htmlContent.match(/\d{6}/);
            if (otpCode) console.log('\x1b[33m%s\x1b[0m', `  OTP CODE: ${otpCode[0]}`);
        }
        console.log('\x1b[32m%s\x1b[0m', '------------------------------------------------');
        return response.data;
    } catch (error) {
        console.error('\x1b[31m%s\x1b[0m', '--- BREVO EMAIL ERROR ---');
        // Log the OTP even if mail fails so user is not stuck
        if (options.htmlContent) {
            const otpCode = options.htmlContent.match(/\d{6}/);
            if (otpCode) console.log('\x1b[31m%s\x1b[0m', `  [FALLBACK] OTP WAS: ${otpCode[0]}`);
        }
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', JSON.stringify(error.response.data));
        } else {
            console.error('Error Message:', error.message);
        }
        console.error('--------------------------');
    }
};

export default sendEmail;
