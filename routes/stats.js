const express = require('express');
const { getCryptoStats } = require('../controllers/cryptoController');

const router = express.Router();

// Define the /stats endpoint
router.get('/stats', getCryptoStats);

module.exports = router;