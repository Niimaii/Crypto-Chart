const axios = require('axios');
const db = require('../db/indexDB');

// ================= ↓↓↓↓↓↓↓↓ Fetch Data From API ↓↓↓↓↓↓↓↓ =================
exports.fetchChartData = (days) => {
  try {
    return new Promise(async (parentResolve, reject) => {
      // This will contain price chart data and coin 24hr volume
      const chartInfo = {};
      let market;

      try {
        // Get the current top 100 coin market data
        market = await axios(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        );
      } catch (error) {
        console.log(error.message);
        reject('Fetch market Error');
      }

      //   Reduce the top 100 coin market data into an array of coin names
      const coinList = market.data.reduce((acc, coin) => {
        acc.push(coin.id);
        return acc;
      }, []);

      // const coinList = [
      //   'bitcoin',
      //   'ethereum',
      //   'tether',
      //   'binancecoin',
      //   'usd-coin',
      // ];

      //   Since coinList will be modified, this is meant to be a copy of the initial array.
      const ogCoinList = [...coinList];

      //   ↓↓↓↓↓↓↓↓ periodicallyFetch() ↓↓↓↓↓↓↓↓
      const periodicallyFetch = () => {
        // Remove the first 5 coins from coinList and create a new list from that
        const fetchCoinList = coinList.splice(0, 6);

        // Map through the new list and fetch chart data for each coin in the list
        fetchCoinList.map(async (coin) => {
          try {
            const chart = await axios(
              `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}`
            );

            if (chart) {
              console.log(`${coin}: ${chart.data.prices[0][1]}`);
              // If we got a result, add the price chart/24hr volume data to our chartInfo object
              chartInfo[coin] = {
                prices: chart.data.prices,
                volume_24hr: chart.data.total_volumes.at(-1)[1],
              };
            }
          } catch (error) {
            console.log(`Error with ${coin}. Error: ${error.message}`);
            // Since there was an error, add back the coins we removed from "coinList"
            coinList.unshift(coin);
          }
        });
      };

      //   ↑↑↑↑↑↑↑↑ periodicallyFetch() ↑↑↑↑↑↑↑↑

      await new Promise(async (resolve, reject) => {
        if (market) {
          // Fetch before waiting for setInterval to kick in
          periodicallyFetch();
          const interval = setInterval(() => {
            // Check to see if coinList has contents
            if (coinList.length > 0) {
              periodicallyFetch();
            } else if (coinList.length === 0) {
              resolve('All Chart Fetched');
              parentResolve('All Chart Fetched');
              clearInterval(interval);
            }
          }, 30 * 1000);
        }
      });

      //   console.log('chartInfo:', chartInfo);

      // If chartInfo has content, then call the function
      if (Object.keys(chartInfo).length) {
        try {
          await insertData(chartInfo, days, ogCoinList);
          // End the promise if we went through all "coinList" items
          console.log(`fetchCoinDays(${days}) is complete!`);
          return chartInfo;
        } catch (error) {
          console.log(error.message);
        }
      }
    });
  } catch (error) {
    console.log('Error with cryptoFetch');
    console.error(error.message);
  }
};

//  ================= ↑↑↑↑↑↑↑↑ Fetch Data From API ↑↑↑↑↑↑↑↑ =================
// ================= ↓↓↓↓↓↓↓↓ Insert Into Database ↓↓↓↓↓↓↓↓ =================

// This function inserts crypto market/chart data into database
const insertData = async (chartData, days, coinArray) => {
  const now = new Date();
  const current = now.getTime();

  // Map through all the crypto market data and isolate individual coin market data
  coinArray.map(async (coin) => {
    let values = '';

    // This is creating a unique ID that is based on the current time/date
    let coinID = coin;

    // Selecting the correct crypto before looping
    chartData[coin].prices.forEach(([timeStamp, price]) => {
      values += `('${coinID}',${days}, ${timeStamp}, ${price}, ${current}),`;
    });

    //   Remove last coma
    values = values.slice(0, -1);

    try {
      // Deleting old chart data
      await db.query(
        `DELETE FROM crypto_chart WHERE crypto_id = $1 AND chartDays = $2;`,
        [coinID, days]
      );
      // Adding data to our crypto chart Table
      await db.query(
        `INSERT INTO crypto_chart (crypto_id, chartDays, timestamp, price, unix) VALUES ${values};`
      );

      const priceArray = chartData[coin].prices;
      const priceAtDay = priceArray[0][1];
      // console.log(priceArray[priceArray.length - 1][1]);
      await db.query(
        `INSERT INTO past_prices (coin, time_ago, coin_value) VALUES ($1, $2, $3) ON CONFLICT (coin, time_ago) DO UPDATE SET coin_value = EXCLUDED.coin_value`,
        [coin, days, priceAtDay]
      );
    } catch (error) {
      console.log(error.message);
    }
  });
};

//  ================= ↑↑↑↑↑↑↑↑ Insert Into Database ↑↑↑↑↑↑↑↑ =================
