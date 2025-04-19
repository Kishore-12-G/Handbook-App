const express = require('express');
const router = express.Router();
const {
  CreateEnrollments,
  getEnrollmentsById,
  updateEnrollment,
  getUserEnrollments
} = require("../controllers/upskillEnrollmentsController");
const { protect } = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Enrollment:
 *       type: object
 *       required:
 *         - certificationId
 *         - userId
 *       properties:
 *         certificationId:
 *           type: string
 *           example: "cert123"
 *         userId:
 *           type: string
 *           example: "user123"
 *         name:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           example: "john.doe@example.com"
 *         phone:
 *           type: string
 *           example: "1234567890"
 *         description:
 *           type: string
 *           example: "Interested in the certification."

 * /api/upskill/enrollments:
 *   post:
 *     summary: Create a new enrollment
 *     tags: [Enrollments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Enrollment'
 *     responses:
 *       201:
 *         description: Course enrollment successful
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error

 * /api/upskill/enrollments/{enrollmentId}:
 *   get:
 *     summary: Get enrollment by ID
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: enrollmentId
 *         required: true
 *         schema:
 *           type: string
 *         example: "enroll123"
 *     responses:
 *       200:
 *         description: Enrollment fetched successfully
 *       404:
 *         description: Enrollment not found

 *   put:
 *     summary: Update enrollment by ID
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: enrollmentId
 *         required: true
 *         schema:
 *           type: string
 *         example: "enroll123"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Enrollment'
 *     responses:
 *       200:
 *         description: Enrollment updated successfully
 *       500:
 *         description: Server Error

 * /api/upskill/enrollments/users/{userId}:
 *   get:
 *     summary: Get all enrollments for a user
 *     tags: [Enrollments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         example: "user123"
 *     responses:
 *       200:
 *         description: Enrollments fetched
 *       404:
 *         description: User not found
 */

// POST /upskill/enrollments
router.post('/', protect, CreateEnrollments);

// GET /upskill/enrollments/:enrollmentId
router.get('/:enrollmentId', getEnrollmentsById);

// PUT /upskill/enrollments/:enrollmentId
router.put('/:enrollmentId', updateEnrollment);

// GET /upskill/enrollments/users/:userId
router.get('/users/:userId', protect, getUserEnrollments);

module.exports = router;
