const express = require('express');
const router = express.Router();
const { getChecklist, addChecklist, updateChecklist } = require('../controllers/tdClaimChecklistController');
const { protect } = require('../middleware/auth');



router.get('/', getChecklist);
router.post('/', protect, addChecklist);
router.put('/:checklistId', protect, updateChecklist);

module.exports = router;