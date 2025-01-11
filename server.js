require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Import Routes
const statsRoutes = require('./routes/stats');
const deviationRoutes = require('./routes/deviation');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 30000, // 30 seconds timeout
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Use the Routes
app.use('/', statsRoutes);
app.use('/', deviationRoutes);

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});