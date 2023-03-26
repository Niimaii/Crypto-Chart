const express = require('express');
const app = express();
const { PORT, CLIENT_URL } = require('./constants/index');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');

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
const cryptoDataFetch = require('./hooks/cryptoFetch');

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

// setInterval(() => {
//   cryptoDataFetch(1);
// }, 70 * 1000);
