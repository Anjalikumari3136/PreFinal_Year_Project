import User from '../models/User.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            console.log('User found, updating with:', JSON.stringify(req.body).substring(0, 100) + '...');
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            if (req.body.password) {
                user.password = req.body.password;
            }

            // Update profileDetails
            if (req.body.profileDetails) {
                user.profileDetails = {
                    ...user.profileDetails,
                    ...req.body.profileDetails
                };
            }

            // Update other fields if provided
            if (req.body.phone) {
                if (!user.profileDetails) {
                    user.profileDetails = {
                        bio: '',
                        contactNumber: '',
                        avatar: '',
                        cgpa: 0
                    };
                }
                user.profileDetails.contactNumber = req.body.phone;
            }

            const updatedUser = await user.save();
            console.log('User saved successfully');

            // Return user data without password
            const userResponse = updatedUser.toObject();
            delete userResponse.password;

            res.json(userResponse);
        } else {
            console.log('User not found during update');
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Update Profile Error:', error);
        res.status(500).json({ message: error.message });
    }
};

export { getUserProfile, updateUserProfile };
