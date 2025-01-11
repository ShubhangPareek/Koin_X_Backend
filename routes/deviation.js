const express = require('express');
const { getCryptoDeviation } = require('../controllers/cryptoController');

const router = express.Router();

// Define the /deviation endpoint
router.get('/deviation', getCryptoDeviation);

module.exports = router;