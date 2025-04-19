const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  calculateAllowance,
  getAllowanceHistory,
  getAllowanceCalculationById
} = require('../controllers/allowanceController');

/**
 * @swagger
 * tags:
 *   name: Allowance
 *   description: APIs for Allowance Calculations and History
 */

/**
 * @swagger
 * /api/allowance/calculate:
 *   post:
 *     tags: [Allowance]
 *     summary: Calculate Allowance
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - basicPay
 *               - distanceTravelled
 *             properties:
 *               jobDesignation:
 *                 type: string
 *               basicPay:
 *                 type: number
 *               marriedStatus:
 *                 type: boolean
 *               distanceTravelled:
 *                 type: number
 *               vehicleIncluded:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                   weight:
 *                     type: number
 *                   details:
 *                     type: string
 *     responses:
 *       201:
 *         description: Allowance Calculated Successfully
 *       400:
 *         description: Required fields missing
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/allowance/history:
 *   get:
 *     tags: [Allowance]
 *     summary: Get user's allowance calculation history (paginated)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Allowance History Fetched Successfully
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/allowance/calculations/{calculationId}:
 *   get:
 *     tags: [Allowance]
 *     summary: Get a specific allowance calculation by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: calculationId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Allowance Found
 *       404:
 *         description: Calculation not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/calculate', protect, calculateAllowance);
router.get('/history', protect, getAllowanceHistory);
router.get('/calculations/:calculationId', protect, getAllowanceCalculationById);

module.exports = router;
