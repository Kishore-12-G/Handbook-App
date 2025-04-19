const express = require('express');
const router = express.Router();
const { getAllRules, getRuleById, addTdRule, updateRule, deleteRule } = require('../controllers/tdRuleController');
const { protect } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Travel Rules
 *   description: API for managing travel rules
 */

/**
 * @swagger
 * /api/td-rules:
 *   get:
 *     tags: [Travel Rules]
 *     summary: Get all Travel Rules
 *     responses:
 *       200:
 *         description: List of travel rules
 *       400:
 *         description: Internal server error
 *   
 *   post:
 *     tags: [Travel Rules]
 *     summary: Create a new Travel Rule
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ruleNumber
 *               - title
 *             properties:
 *               ruleNumber:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               iconUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Rule created successfully
 *       409:
 *         description: Rule already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/td-rules/{ruleNumber}:
 *   get:
 *     tags: [Travel Rules]
 *     summary: Get a Travel Rule by Rule Number
 *     parameters:
 *       - name: ruleNumber
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Travel Rule found
 *       404:
 *         description: Rule not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/td-rules/{tdRulesId}:
 *   put:
 *     tags: [Travel Rules]
 *     summary: Update a Travel Rule
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: tdRulesId
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
 *               ruleNumber:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               iconUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rule updated successfully
 *       404:
 *         description: Rule not found
 *       409:
 *         description: Rule number already exists
 *       500:
 *         description: Internal server error
 * 
 *   delete:
 *     tags: [Travel Rules]
 *     summary: Delete a Travel Rule
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: tdRulesId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rule deleted successfully
 *       404:
 *         description: Rule not found
 *       500:
 *         description: Internal server error
 */

// Routes
router.get('/', getAllRules);
router.get('/:ruleNumber', getRuleById);
router.post('/', protect, addTdRule);
router.put('/:tdRulesId', protect, updateRule);
router.delete('/:tdRulesId', protect, deleteRule);

module.exports = router;