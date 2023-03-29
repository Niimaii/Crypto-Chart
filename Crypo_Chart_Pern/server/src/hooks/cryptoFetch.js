const axios = require('axios');
const db = require('../db/indexDB');

let count = 0;

// ================= ↑↑↑↑↑↑ Values ↑↑↑↑↑↑ =================
// ================= ↓↓↓↓↓↓ Functions ↓↓↓↓↓↓ =================

// This function inserts crypto market/chart data into database
const insertData = async (chartData, days, coinArray) => {
  // Map through all the crypto market data and isolate individual coin market data
  coinArray.map(async (coin) => {
    // TODO: MAKE SURE TO MOVE THIS OUT OF THE MAP LOOP AFTER TESTING
    const now = new Date();
    const current = now.getTime();
    let values = '';

    let coinID = coin;
    // Selecting the correct crypto before looping
    chartData[coin].prices.forEach(([timeStamp, price]) => {
      values += `('${coinID}',${days}, ${timeStamp}, ${price}, ${current}),`;
    });

    if (coin == 'bitcoin') {
      console.log('===== CHART DATA =====', values);
    }
    //   Remove last coma
    values = values.slice(0, -1);

    await db.query(
      `DELETE FROM crypto_chart WHERE crypto_id = $1 AND chartDays = $2;`,
      [coinID, days]
    );
    // Adding data to our crypto chart Table
    await db.query(
      `INSERT INTO crypto_chart (crypto_id, chartDays, timestamp, price, unix) VALUES ${values};`
    );
  });
};

// This fetches crypto market/chart data from coingecko API
const cryptoDataFetch = async (days, coinArray) => {
  console.log('Fetch has started');
  let error = false;
  // Which days I want get chart data from
  // const days = 60;
  // This will contain price chart data and coin 24hr volume
  const chartInfo = {};

  try {
    const isArray = true;

    if (isArray) {
      await Promise.all(
        // Map through all the crypto market data and isolate individual coin market data
        coinArray.map(async (coin) => {
          // Get chart/volume data from the specific coin we are mapping through
          const result = await axios(
            `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}`
          );

          if (result) {
            // If we got a result, add the price chart/24hr volume data to our chartInfo object
            chartInfo[coin] = {
              prices: result.data.prices,
              volume_24hr: result.data.total_volumes.at(-1)[1],
            };
          }
        })
      );

      // If chartInfo has content, then call the function
      if (Object.keys(chartInfo).length)
        await insertData(chartInfo, days, coinArray);
    }

    count++;
    console.log('cryptoFetch has completed', count);
  } catch (err) {
    error = true;
    console.log('Error with cryptoFetch');
    console.error(err.message);
  }
  return { chartInfo, error };
};

module.exports = cryptoDataFetch;
