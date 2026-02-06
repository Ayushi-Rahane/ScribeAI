const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const Student = require('../models/Student');
const Volunteer = require('../models/Volunteer');
const Request = require('../models/Request');
const User = require('../models/User');

// @desc    Get all students
// @route   GET /api/v1/admin/students
// @access  Private (Admin)
router.get('/students', protect, authorize('admin'), async (req, res, next) => {
    try {
        const students = await Student.find().populate('userId', 'email isActive createdAt');
        res.json(students);
    } catch (error) {
        next(error);
    }
});

// @desc    Get all volunteers
// @route   GET /api/v1/admin/volunteers
// @access  Private (Admin)
router.get('/volunteers', protect, authorize('admin'), async (req, res, next) => {
    try {
        const volunteers = await Volunteer.find().populate('userId', 'email isActive createdAt');
        res.json(volunteers);
    } catch (error) {
        next(error);
    }
});

// @desc    Verify volunteer
// @route   PUT /api/v1/admin/verify-volunteer/:id
// @access  Private (Admin)
router.put('/verify-volunteer/:id', protect, authorize('admin'), async (req, res, next) => {
    try {
        const volunteer = await Volunteer.findByIdAndUpdate(
            req.params.id,
            { isVerified: true },
            { new: true }
        );
        res.json(volunteer);
    } catch (error) {
        next(error);
    }
});

// @desc    Get platform statistics
// @route   GET /api/v1/admin/stats
// @access  Private (Admin)
router.get('/stats', protect, authorize('admin'), async (req, res, next) => {
    try {
        const totalStudents = await Student.countDocuments();
        const totalVolunteers = await Volunteer.countDocuments();
        const totalRequests = await Request.countDocuments();
        const activeRequests = await Request.countDocuments({ status: { $in: ['pending', 'accepted', 'in-progress'] } });
        const completedRequests = await Request.countDocuments({ status: 'completed' });

        res.json({
            totalStudents,
            totalVolunteers,
            totalRequests,
            activeRequests,
            completedRequests
        });
    } catch (error) {
        next(error);
    }
});

// @desc    Toggle user active status
// @route   PUT /api/v1/admin/users/:id/toggle-status
// @access  Private (Admin)
router.put('/users/:id/toggle-status', protect, authorize('admin'), async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        user.isActive = !user.isActive;
        await user.save();
        res.json(user);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
