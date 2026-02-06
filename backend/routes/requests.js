const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Request = require('../models/Request');
const Student = require('../models/Student');
const Volunteer = require('../models/Volunteer');

// @desc    Create new request
// @route   POST /api/v1/requests
// @access  Private (Student)
router.post('/', protect, async (req, res, next) => {
    try {
        const student = await Student.findOne({ userId: req.user._id });
        const request = await Request.create({
            studentId: student._id,
            ...req.body
        });
        res.status(201).json(request);
    } catch (error) {
        next(error);
    }
});

// @desc    Get request by ID
// @route   GET /api/v1/requests/:id
// @access  Private
router.get('/:id', protect, async (req, res, next) => {
    try {
        const request = await Request.findById(req.params.id)
            .populate('studentId', 'fullName university phone')
            .populate('volunteerId', 'fullName phone rating');
        res.json(request);
    } catch (error) {
        next(error);
    }
});

// @desc    Update request
// @route   PUT /api/v1/requests/:id
// @access  Private
router.put('/:id', protect, async (req, res, next) => {
    try {
        const request = await Request.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        res.json(request);
    } catch (error) {
        next(error);
    }
});

// @desc    Cancel request
// @route   DELETE /api/v1/requests/:id
// @access  Private (Student)
router.delete('/:id', protect, async (req, res, next) => {
    try {
        await Request.findByIdAndUpdate(req.params.id, { status: 'cancelled' });
        res.json({ message: 'Request cancelled' });
    } catch (error) {
        next(error);
    }
});

// @desc    Rate volunteer
// @route   POST /api/v1/requests/:id/rate
// @access  Private (Student)
router.post('/:id/rate', protect, async (req, res, next) => {
    try {
        const { rating, feedback } = req.body;
        const request = await Request.findByIdAndUpdate(
            req.params.id,
            { rating, feedback },
            { new: true }
        );

        // Update volunteer rating
        const volunteer = await Volunteer.findById(request.volunteerId);
        volunteer.totalRatings += 1;
        volunteer.rating = ((volunteer.rating * (volunteer.totalRatings - 1)) + rating) / volunteer.totalRatings;
        await volunteer.save();

        res.json(request);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
