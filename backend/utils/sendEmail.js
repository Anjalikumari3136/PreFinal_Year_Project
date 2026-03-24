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
        console.log(`Email successfully ACCEPTED by Brevo for ${options.email}. Status: ${response.status}`);
        return response.data;
    } catch (error) {
        console.error('--- BREVO EMAIL ERROR ---');
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
