const Crypto = require('../models/crypto');
const { calculateStandardDeviation } = require('../utils/standardDeviation');

// Controller to fetch the latest stats for a cryptocurrency
const getCryptoStats = async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: 'Coin query parameter is required' });
  }

  try {
    const latestData = await Crypto.findOne({ coin }).sort({ timestamp: -1 });

    if (!latestData) {
      return res.status(404).json({ error: 'Data not found for the requested coin' });
    }

    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      '24hChange': latestData.change24h,
    });
  } catch (error) {
    console.error('Error fetching stats:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to calculate the standard deviation for the last 100 records
const getCryptoDeviation = async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: 'Coin query parameter is required' });
  }

  try {
    const records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);

    if (!records || records.length === 0) {
      return res.status(404).json({ error: 'No records found for the requested coin' });
    }

    const prices = records.map((record) => record.price);
    const deviation = calculateStandardDeviation(prices);

    res.json({ deviation });
  } catch (error) {
    console.error('Error calculating deviation:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getCryptoStats, getCryptoDeviation };