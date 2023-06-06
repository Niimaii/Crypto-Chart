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
const { fetchChartData } = require('./hooks/fetchChartData');

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

const blockSet1 = 1;
const blockSet2 = 2;
const blockSet3 = 3;
const blockSet4 = 4;
const blockSet5 = 5;

const days1 = 1;
const days30 = 30;
const days365 = 365;

// This instructs the order in which I should fetch crypto chart data, as well as how many days long the chart data is
const callOrder = {
  [blockSet1]: {
    1: [days1, ...block1],
    2: [days1, ...block2],
    3: [days1, ...block3],
  },
  [blockSet2]: {
    1: [days1, ...block1],
    2: [days30, ...block1],
    3: [days30, ...block2],
  },
  [blockSet3]: {
    1: [days1, ...block1],
    2: [days1, ...block2],
    3: [days30, ...block3],
  },
  [blockSet4]: {
    1: [days1, ...block1],
    2: [days1, ...block3],
    3: [days30, ...block1],
  },
  [blockSet5]: {
    1: [days365, ...block1],
    2: [days365, ...block2],
    3: [days365, ...block3],
  },
};

let orderCount = 1;
let blockCount = 1;

let test = 0;

fetchChartData(7);

// setInterval(() => {
//   test += 1;
//   fetchTest(test);
//   console.log(`Test ${test} ran`);
// }, 2 * 1000);
// fetchTest(1);

// setInterval(async () => {
//   console.log(`index = Ordercount: ${orderCount}, Blockcount: ${blockCount}`);
//   // Get the correct object based on orderCount
//   const call = callOrder[orderCount];
//   // Get the array from callOrder, based on the blockcount
//   const block = call[blockCount];
//   let days = block[0];
//   const coinArray = block.slice(1);

//   try {
//     const complete = await cryptoDataFetch(days, coinArray);
//     if (complete) {
//       await fetchMarket(complete.chartInfo);
//     }

//     // If there is an error, don't increase blockCount++
//     if (!complete.error) {
//       blockCount++;
//     }
//   } catch (error) {
//     console.log('Error fetching data:', error.message);
//   }

//   // This is what resets/controls the iteration loop
//   if (blockCount > 3) {
//     orderCount++;
//     blockCount = 1;
//   }
//   if (orderCount > 5) {
//     orderCount = 1;
//   }
// }, 60 * 1000);
