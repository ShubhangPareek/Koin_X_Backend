require('dotenv').config(); // Load environment variables

const mongoose = require('mongoose');
const axios = require('axios');
const Crypto = require('../models/crypto');

// Function to fetch and save cryptocurrency data
const fetchCryptoData = async () => {
  const coins = ['bitcoin', 'matic-network', 'ethereum'];
  try {
    console.log('Fetching data from CoinGecko...');
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(
        ','
      )}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`
    );
    console.log('API Response:', data);

    for (const coin of coins) {
      const cryptoData = {
        coin,
        price: data[coin].usd,
        marketCap: data[coin].usd_market_cap,
        change24h: data[coin].usd_24h_change,
      };
      console.log('Attempting to save:', cryptoData);

      try {
        await Crypto.create(cryptoData);
        console.log(`Data saved for ${coin}`);
      } catch (dbError) {
        console.error(`Error saving ${coin} data:`, dbError.message);
      }
    }
    console.log('Data fetch and save completed successfully.');
  } catch (error) {
    console.error('Error fetching data from API:', error.message);
  }
};

// Connect to MongoDB and run the script
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/koinx-backend';
console.log('MONGO_URI:', MONGO_URI); // Debug log for MONGO_URI

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // 30 seconds timeout
})
  .then(() => {
    console.log('MongoDB connected');
    fetchCryptoData().then(() => mongoose.disconnect());
  })
  .catch((err) => console.error('MongoDB connection error:', err));