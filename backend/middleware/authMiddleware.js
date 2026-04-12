import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
    let token;

    console.log('Auth check for:', req.originalUrl);
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');
            console.log('Token verified for user:', req.user?._id);

            next();
        } catch (error) {
            console.error('Auth Middleware Error:', error.message);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401);
        // throw new Error('Not authorized, no token');
        // Use basic send for now to avoid custom error handler dependencies
        res.json({ message: 'Not authorized, no token' });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'ADMIN') {
        next();
    } else {
        res.status(401);
        res.json({ message: 'Not authorized as an admin' });
    }
};

const facultyOrAdmin = (req, res, next) => {
    if (req.user && (req.user.role === 'ADMIN' || req.user.role === 'FACULTY')) {
        next();
    } else {
        res.status(401);
        res.json({ message: 'Not authorized as Faculty or Admin' });
    }
};

export { protect, admin, facultyOrAdmin };
