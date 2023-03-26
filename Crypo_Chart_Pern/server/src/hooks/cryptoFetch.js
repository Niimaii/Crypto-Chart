const axios = require('axios');
const db = require('../db/indexDB');

// This function inserts crypto market/chart data into database
const insertData = async (chartData, marketData) => {
  //   Hashed data is here because the db tables are named after the crypto.id, however some names have special characters. So the tables are named different
  const cryptoHash = {
    bitcoin: 'bitcoin',
    ethereum: 'ethereum',
    tether: 'tether',
    binancecoin: 'binancecoin',
    'usd-coin': 'usdc',
  };

  // Map through all the crypto market data and isolate individual coin market data
  marketData.map(async (coin) => {
    let values = '';
    const now = new Date();
    const current = now.getTime();
    const btcM = marketData[0];
    let coinID = `${btcM.id}${current}`;
    // Get the correct postgres Table name with hash table
    const tableName = cryptoHash[coin.id];

    // Selecting the correct crypto before looping
    chartData[coin.id].prices.forEach(([timeStamp, price]) => {
      values += `('${coinID}' , ${timeStamp}, ${price}),`;
    });

    //   Remove last coma
    values = values.slice(0, -1);

    await db.query(
      `INSERT INTO ${tableName} (id, symbol, name, image, current_price, market_cap, market_cap_rank, fully_diluted_valuation, total_volume, volume_24hr, high_24h, low_24h, price_change_24h, price_change_percentage_24h, market_cap_change_24h, market_cap_change_percentage_24h, circulating_supply, total_supply, max_supply) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)`,
      [
        coinID,
        btcM.symbol,
        btcM.name,
        btcM.image,
        btcM.current_price,
        btcM.market_cap,
        btcM.market_cap_rank,
        btcM.fully_diluted_valuation,
        btcM.total_volume,
        chartData[coin.id].volume_24hr,
        btcM.high_24h,
        btcM.low_24h,
        btcM.price_change_24h,
        btcM.price_change_percentage_24h,
        btcM.market_cap_change_24h,
        btcM.market_cap_change_percentage_24h,
        btcM.circulating_supply,
        btcM.total_supply,
        btcM.max_supply,
      ]
    );

    await db.query(
      `INSERT INTO ${tableName}_history (coin_id, timestamp, price) VALUES ${values};`
    );
  });
};

// This fetches crypto market/chart data from coingecko API
const cryptoDataFetch = async (days) => {
  // This will contain price chart data and coin 24hr volume
  const chartInfo = {};
  // How many cryptos do you want to gather
  let cryptoAmount = 5;
  // Gets market data for multiple cryptos
  const { data } = await axios(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${cryptoAmount}&page=1&sparkline=false`
  );

  if (data) {
    await Promise.all(
      // Map through all the crypto market data and isolate individual coin market data
      data.map(async (coin) => {
        // Get chart/volume data from the specific coin we are mapping through
        const result = await axios(
          `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=${days}`
        );

        if (result) {
          // If we got a result, add the price chart/24hr volume data to our chartInfo object
          chartInfo[coin.id] = {
            prices: result.data.prices,
            volume_24hr: result.data.total_volumes.at(-1)[1],
          };
        }
      })
    ).then(() => {
      // Once everything is complete, run this function to add data to our database
      insertData(chartInfo, data);
    });
  }
  return chartInfo;
};

module.exports = cryptoDataFetch;
