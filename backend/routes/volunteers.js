const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');
const Volunteer = require('../models/Volunteer');
const Request = require('../models/Request');

// @desc    Get all available volunteers (for students to browse)
// @route   GET /api/v1/volunteers
// @access  Private (Student)
router.get('/', protect, authorize('student'), async (req, res, next) => {
    try {
        const volunteers = await Volunteer.find()
            .populate('userId', 'email')
            .select('fullName phone subjects languages availability experience rating totalRatings userId volunteerType hourlyRate city state profilePicture')
            .sort('-rating');

        // Add completed assignments count for each volunteer
        const volunteersWithStats = await Promise.all(
            volunteers.map(async (volunteer) => {
                const completedCount = await Request.countDocuments({
                    volunteerId: volunteer._id,
                    status: 'completed'
                });

                return {
                    ...volunteer.toObject(),
                    completedAssignments: completedCount
                };
            })
        );

        res.json(volunteersWithStats);
    } catch (error) {
        next(error);
    }
});

// @desc    Get volunteer profile
// @route   GET /api/v1/volunteers/profile
// @access  Private (Volunteer)
router.get('/profile', protect, authorize('volunteer'), async (req, res, next) => {
    try {
        const volunteer = await Volunteer.findOne({ userId: req.user._id });
        res.json(volunteer);
    } catch (error) {
        next(error);
    }
});

// @desc    Update volunteer profile
// @route   PUT /api/v1/volunteers/profile
// @access  Private (Volunteer)
router.put('/profile', protect, authorize('volunteer'), async (req, res, next) => {
    try {
        const volunteer = await Volunteer.findOneAndUpdate(
            { userId: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );
        res.json(volunteer);
    } catch (error) {
        next(error);
    }
});

// @desc    Get incoming requests
// @route   GET /api/v1/volunteers/incoming
// @access  Private (Volunteer)
router.get('/incoming', protect, authorize('volunteer'), async (req, res, next) => {
    try {
        const requests = await Request.find({
            status: 'pending',
            volunteerId: null
        })
            .populate('studentId', 'fullName university disabilityType specificNeeds profilePicture')
            .sort('-createdAt');
        res.json(requests);
    } catch (error) {
        next(error);
    }
});

// @desc    Accept request
// @route   POST /api/v1/volunteers/accept/:requestId
// @access  Private (Volunteer)
router.post('/accept/:requestId', protect, authorize('volunteer'), async (req, res, next) => {
    try {
        const volunteer = await Volunteer.findOne({ userId: req.user._id });
        const request = await Request.findByIdAndUpdate(
            req.params.requestId,
            {
                volunteerId: volunteer._id,
                status: 'accepted'
            },
            { new: true }
        );
        res.json(request);
    } catch (error) {
        next(error);
    }
});

// @desc    Get active assignments
// @route   GET /api/v1/volunteers/active
// @access  Private (Volunteer)
router.get('/active', protect, authorize('volunteer'), async (req, res, next) => {
    try {
        const volunteer = await Volunteer.findOne({ userId: req.user._id });
        const assignments = await Request.find({
            volunteerId: volunteer._id,
            status: { $in: ['accepted', 'in-progress'] }
        })
            .populate('studentId', 'fullName university phone profilePicture')
            .sort('examDate');
        res.json(assignments);
    } catch (error) {
        next(error);
    }
});

// @desc    Get assignment history
// @route   GET /api/v1/volunteers/history
// @access  Private (Volunteer)
router.get('/history', protect, authorize('volunteer'), async (req, res, next) => {
    try {
        const volunteer = await Volunteer.findOne({ userId: req.user._id });
        const history = await Request.find({
            volunteerId: volunteer._id,
            status: 'completed'
        })
            .populate('studentId', 'fullName university profilePicture')
            .sort('-createdAt');
        res.json(history);
    } catch (error) {
        next(error);
    }
});

// @desc    Get volunteer stats (rating, reviews, completed assignments)
// @route   GET /api/v1/volunteers/stats
// @access  Private (Volunteer)
router.get('/stats', protect, authorize('volunteer'), async (req, res, next) => {
    try {
        const volunteer = await Volunteer.findOne({ userId: req.user._id });

        if (!volunteer) {
            return res.status(404).json({ message: 'Volunteer profile not found' });
        }

        // Get count of completed assignments
        const completedCount = await Request.countDocuments({
            volunteerId: volunteer._id,
            status: 'completed'
        });

        res.json({
            averageRating: volunteer.rating || 0,
            totalReviews: volunteer.totalRatings || 0,
            completedAssignments: completedCount
        });
    } catch (error) {
        next(error);
    }
});

// @desc    Upload volunteer profile photo
// @route   POST /api/v1/volunteers/profile/photo
// @access  Private (Volunteer)
router.post('/profile/photo', protect, authorize('volunteer'), upload.single('photo'), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a photo' });
        }

        // Construct the photo URL
        const photoUrl = `/uploads/profiles/${req.file.filename}`;

        // Update volunteer profile with photo URL
        const volunteer = await Volunteer.findOneAndUpdate(
            { userId: req.user._id },
            { profilePicture: photoUrl },
            { new: true, runValidators: true }
        );

        if (!volunteer) {
            return res.status(404).json({ message: 'Volunteer profile not found' });
        }

        res.json({
            message: 'Photo uploaded successfully',
            profilePicture: photoUrl,
            volunteer
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
