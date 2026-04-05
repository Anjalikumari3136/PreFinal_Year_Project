import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            if (user.status !== 'APPROVED' && user.role !== 'ADMIN') {
                return res.status(403).json({ 
                    message: user.status === 'REJECTED' 
                        ? 'Your registration was rejected by the administrator.' 
                        : 'Your account is pending administrator approval.' 
                });
            }

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department,
                studentId: user.studentId,
                semester: user.semester,
                assignedMentor: user.assignedMentor,
                profileDetails: user.profileDetails,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Register a new user (with OTP verification)
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password, role, department, studentId } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Generate 6-digit OTP
        const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes from now

        const user = await User.create({
            name,
            email,
            password,
            role: role || 'STUDENT',
            department,
            studentId,
            otp: generatedOTP,
            otpExpires,
            isVerified: false,
            status: (role === 'FACULTY') ? 'PENDING' : 'APPROVED'
        });

        if (user) {
            console.log(`New user registered: ${user.email}. Sending OTP...`);
            
            // Send OTP email
            await sendEmail({
                email: user.email,
                name: user.name,
                subject: 'Verify Your Email - Campus Connect OTP',
                htmlContent: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; max-width: 600px;">
                        <h2>Campus Connect Account Verification</h2>
                        <p>Hi ${user.name},</p>
                        <p>Your OTP for verifying your account is:</p>
                        <div style="background: #f4f4f4; padding: 15px; font-size: 24px; font-weight: bold; text-align: center; border-radius: 5px;">
                            ${generatedOTP}
                        </div>
                        <p>This OTP is valid for 10 minutes.</p>
                    </div>
                `
            });

            res.status(201).json({
                message: 'OTP sent to your email. Please verify to activate.',
                email: user.email
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Verify OTP and activate account
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'Account is already verified' });
        }

        if (user.otp === otp && user.otpExpires > Date.now()) {
            user.isVerified = true;
            user.otp = undefined; // Clear OTP
            user.otpExpires = undefined; // Clear expiry
            await user.save();

            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
                message: 'Email verified successfully!'
            });
        } else {
            res.status(400).json({ message: 'Invalid or expired OTP' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Request password reset (Sends OTP)
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate 6-digit OTP
        const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

        user.otp = generatedOTP;
        user.otpExpires = otpExpires;
        await user.save();

        // Send Email
        await sendEmail({
            email: user.email,
            name: user.name,
            subject: 'Reset Your Password - Campus Connect OTP',
            htmlContent: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; max-width: 600px;">
                    <h2>Password Reset Request</h2>
                    <p>Hi ${user.name},</p>
                    <p>Use the following OTP to reset your password:</p>
                    <div style="background: #f4f4f4; padding: 15px; font-size: 24px; font-weight: bold; text-align: center; border-radius: 5px;">
                        ${generatedOTP}
                    </div>
                    <p>This OTP is valid for 10 minutes.</p>
                </div>
            `
        });

        res.json({ message: 'Reset OTP sent to your email' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Reset password with OTP
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.otp === otp && user.otpExpires > Date.now()) {
            user.password = newPassword; // Middleware will hash it
            user.otp = undefined;
            user.otpExpires = undefined;
            await user.save();

            res.json({ message: 'Password reset successful! You can now log in.' });
        } else {
            res.status(400).json({ message: 'Invalid or expired OTP' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { authUser, registerUser, verifyOTP, forgotPassword, resetPassword };
