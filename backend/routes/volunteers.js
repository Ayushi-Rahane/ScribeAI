const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Volunteer = require('../models/Volunteer');
const Request = require('../models/Request');

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
            .populate('studentId', 'fullName university disabilityType specificNeeds')
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
            .populate('studentId', 'fullName university phone')
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
            .populate('studentId', 'fullName university')
            .sort('-createdAt');
        res.json(history);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
