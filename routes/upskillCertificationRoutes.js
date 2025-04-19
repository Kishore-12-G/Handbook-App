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

/**
 * @swagger
 * components:
 *   schemas:
 *     Certification:
 *       type: object
 *       required:
 *         - course
 *         - type
 *         - price
 *       properties:
 *         certificationId:
 *           type: string
 *           example: "cert123"
 *         course:
 *           type: string
 *           example: "React Fullstack"
 *         type:
 *           type: string
 *           example: "Technical"
 *         price:
 *           type: number
 *           example: 4999
 *         description:
 *           type: string
 *           example: "Comprehensive React Fullstack course"
 *
 * /upskill/courses:
 *   get:
 *     summary: Get all certification courses
 *     tags: [Certifications]
 *     responses:
 *       200:
 *         description: All courses retrieved
 *       400:
 *         description: Failed to retrieve courses
 *
 *   post:
 *     summary: Create a new certification course
 *     tags: [Certifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Certification'
 *     responses:
 *       201:
 *         description: Course created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error

 * /upskill/courses/{courseId}:
 *   get:
 *     summary: Get a certification course by ID
 *     tags: [Certifications]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         example: "cert123"
 *     responses:
 *       200:
 *         description: Course fetched by ID
 *       404:
 *         description: Course not found
 *
 *   put:
 *     summary: Update a certification course by ID
 *     tags: [Certifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         example: "cert123"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Certification'
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server error
 *
 *   delete:
 *     summary: Delete a certification course by ID
 *     tags: [Certifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         example: "cert123"
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 *       500:
 *         description: Unable to delete course
 */

// Public Routes
router.get('/courses', getAllCourse);
router.get('/courses/:courseId', getCourseById);

// Protected Routes
router.post('/courses', protect, createCourse);
router.put('/courses/:courseId', protect, updateCourse);
router.delete('/courses/:courseId', protect, deleteCourse);

module.exports = router;
