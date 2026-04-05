import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['STUDENT', 'FACULTY', 'ADMIN'],
        default: 'STUDENT'
    },
    adminRole: {
        type: String,
        enum: ['Super Admin', 'Academic Admin', 'Faculty Coordinator', 'Counselor Admin', 'Staff'],
        default: 'Staff'
    },
    department: { type: String },
    studentId: { type: String }, // For students
    year: { type: Number }, // 1, 2, 3, 4
    semester: { type: Number }, // 1-8
    isActive: { type: Boolean, default: true },
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'REJECTED'],
        default: 'PENDING'
    },
    assignedMentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    designation: { type: String }, // For faculty
    facultyRoles: [{
        type: String,
        enum: ['Course Instructor', 'Mentor', 'Counselor', 'Request Approver']
    }],
    workloadScore: { type: Number, default: 0 },
    otp: { type: String },
    otpExpires: { type: Date },
    isVerified: { type: Boolean, default: false },
    profileDetails: {
        bio: String,
        contactNumber: String,
        avatar: String,
        cgpa: Number
    }
}, { timestamps: true });

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
UserSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', UserSchema);
export default User;
