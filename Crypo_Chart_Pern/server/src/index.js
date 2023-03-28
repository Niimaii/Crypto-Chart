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

// ================= Periodically Call API =================

// Organize the cryptos we are interested to call
const block1 = ['bitcoin', 'ethereum', 'tether', 'binancecoin', 'usd-coin'];
const block2 = [
  'ripple',
  'cardano',
  'staked-ether',
  'dogecoin',
  'matic-network',
];
const block3 = ['solana', 'binance-usd', 'polkadot', 'litecoin', 'shiba-inu'];

// This instructs the order in which I should fetch crypto chart data, as well as how many days long the chart data is
const callOrder = {
  1: {
    1: [1, ...block1],
    2: [1, ...block2],
    3: [1, ...block3],
  },
  2: {
    1: [1, ...block1],
    2: [30, ...block1],
    3: [30, ...block2],
  },
  3: {
    1: [1, ...block1],
    2: [1, ...block2],
    3: [30, ...block3],
  },
  4: {
    1: [1, ...block1],
    2: [1, ...block3],
    3: [30, ...block1],
  },
  5: {
    1: [365, ...block1],
    2: [365, ...block2],
    3: [365, ...block3],
  },
};

let orderCount = 1;
let blockCount = 1;

setInterval(async () => {
  console.log(`index = Ordercount: ${orderCount}, Blockcount: ${blockCount}`);
  // Get the correct object based on orderCount
  const call = callOrder[orderCount];
  // Get the array from callOrder, based on the blockcount
  const block = call[blockCount];
  let days = block[0];
  const coinArray = block.slice(1);

  try {
    const complete = await cryptoDataFetch(days, coinArray);

    // If there is an error, don't increase blockCount++
    if (!complete.error) {
      blockCount++;
    }
  } catch (error) {
    console.log('Error fetching data:', error.message);
  }

  // This helps to iterate over the object
  if (blockCount > 3) {
    orderCount++;
    blockCount = 1;
  }
  if (orderCount > 5) {
    orderCount = 1;
  }
}, 60 * 1000);
