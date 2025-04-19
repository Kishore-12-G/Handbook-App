const express = require('express');
const router = express.Router();
const { getChecklist, addChecklist, updateChecklist } = require('../controllers/tdClaimChecklistController');
const { protect } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: TD Claim Checklist
 *   description: API for managing TD Claim Checklist documents
 */

/**
 * @swagger
 * api/tdClaimChecklist:
 *   get:
 *     tags: [TD Claim Checklist]
 *     summary: Get the Checklist document
 *     responses:
 *       200:
 *         description: Checklist Document Retrieved Successfully
 *       404:
 *         description: Checklist Document not found
 *       500:
 *         description: Internal Server Error
 *
 *   post:
 *     tags: [TD Claim Checklist]
 *     summary: Add a new Checklist document
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - fileUrl
 *             properties:
 *               title:
 *                 type: string
 *               fileUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: New Checklist Uploaded successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * api/tdClaimChecklist/{checklistId}:
 *   put:
 *     tags: [TD Claim Checklist]
 *     summary: Update a Checklist document
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: checklistId
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
 *               title:
 *                 type: string
 *               fileUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Checklist updated successfully
 *       404:
 *         description: Checklist not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/', getChecklist);
router.post('/', protect, addChecklist);
router.put('/:checklistId', protect, updateChecklist);

module.exports = router;
