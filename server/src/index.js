const express = require('express');
const app = express();
const { PORT, CLIENT_URL } = require('./constants/index');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');
const cron = require('node-cron');

// Import passport middleware
require('./middleware/passport_middleware');

// Start middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(passport.initialize());

// Import routes
const authRoutes = require('./routes/authRoutes');
const cryptoRoutes = require('./routes/cryptoRoutes');
const { fetchChartData } = require('./hooks/fetchChartData');
const fetchMarket = require('./hooks/cryptoMarketFetch');

app.use('/api/auth', authRoutes);
app.use('/api/crypto', cryptoRoutes);

// app start
const appStart = () => {
  try {
    app.listen(PORT, () => {
      console.log(`App running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

appStart();

// Fetch Crypto Data

// 3 AM, 9 AM, 3 PM, and 9 PM,
cron.schedule('0 3,9,15,21 * * *', () => {
  fetchChartData(1);
});

// At 12 PM and 12 AM
cron.schedule('0 0,12 * * *', () => {
  fetchChartData(7);
});

// Once a day at 6 PM
cron.schedule('0 18 * * *', () => {
  fetchChartData(30);
});

// Once every 3 days at 6 AM
cron.schedule('0 6 */3 * *', () => {
  fetchChartData(365);
});

// Every 5 minutes
cron.schedule('*/5 * * * *', () => {
  fetchMarket();
});
