const express = require('express');
const router = express.Router();
const {
  getAllCourse,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/upskillCertificationController');
const { protect } = require('../middleware/auth');


// Public Routes
router.get('/', getAllCourse);
router.get('/:courseId', getCourseById);

// Protected Routes
router.post('/', protect, createCourse);
router.put('/:courseId', protect, updateCourse);
router.delete('/:courseId', protect, deleteCourse);

module.exports = router;