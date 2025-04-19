const express = require('express');
const router = express.Router();
const { getAllRates, addTdRates, updateTdRate, deleteTdRates } = require('../controllers/tdRateController');
const { protect } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Travel Rates
 *   description: API for managing travel allowances and rates
 */

/**
 * @swagger
 * /api/tdRates:
 *   get:
 *     tags: [Travel Rates]
 *     summary: Get all Travel Rates
 *     responses:
 *       200:
 *         description: List of all travel rates
 *       500:
 *         description: Internal server error
 * 
 *   post:
 *     tags: [Travel Rates]
 *     summary: Add a new Travel Rate
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rankCategory
 *               - hotelAllowance
 *               - taxiAllowance
 *               - foodAllowance
 *             properties:
 *               rankCategory:
 *                 type: string
 *               hotelAllowance:
 *                 type: number
 *               taxiAllowance:
 *                 type: string
 *               foodAllowance:
 *                 type: number
 *     responses:
 *       201:
 *         description: New rate added successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/tdRates/{tdRateId}:
 *   put:
 *     tags: [Travel Rates]
 *     summary: Update a Travel Rate
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: tdRateId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rankCategory:
 *                 type: string
 *               hotelAllowance:
 *                 type: number
 *               taxiAllowance:
 *                 type: string
 *               foodAllowance:
 *                 type: number
 *     responses:
 *       200:
 *         description: TD rate updated successfully
 *       400:
 *         description: No fields to update
 *       500:
 *         description: Internal server error
 * 
 *   delete:
 *     tags: [Travel Rates]
 *     summary: Delete a Travel Rate
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: tdRateId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: TD rate deleted successfully
 *       404:
 *         description: TD rate not found
 *       500:
 *         description: Internal server error
 */

// Routes
router.get('/', getAllRates);
router.post('/', protect, addTdRates);
router.put('/:tdRateId', protect, updateTdRate);
router.delete('/:tdRateId', protect, deleteTdRates);

module.exports = router;
