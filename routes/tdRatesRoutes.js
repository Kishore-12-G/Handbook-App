const express = require('express');
const router = express.Router();
const { getAllRates, addTdRates, updateTdRate, deleteTdRates } = require('../controllers/tdRateController');
const { protect } = require('../middleware/auth');

// Routes
router.get('/', getAllRates);
router.post('/', protect, addTdRates);
router.put('/:tdRateId', protect, updateTdRate);
router.delete('/:tdRateId', protect, deleteTdRates);

module.exports = router;