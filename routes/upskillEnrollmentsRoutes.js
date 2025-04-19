const express = require('express');
const router = express.Router();
const {
  CreateEnrollments,
  getEnrollmentsById,
  updateEnrollment,
  getUserEnrollments
} = require("../controllers/upskillEnrollmentsController");
const { protect } = require('../middleware/auth');


// Make sure the specific routes come before the parameter routes
router.get('/users/:userId', protect, getUserEnrollments);

// POST /api/upskill/enrollments
router.post('/', protect, CreateEnrollments);

// GET /api/upskill/enrollments/:enrollmentId
router.get('/:applicationId', getEnrollmentsById);

// PUT /api/upskill/enrollments/:enrollmentId
router.put('/:applicationId', updateEnrollment);

module.exports = router;