const axios = require('axios');
const db = require('../db/indexDB');

// axios.defaults.baseURL = 'https://api.coingecko.com/api/v3';

const insertData = async (chartData, marketData) => {
  //   Hashed data is here because the db tables are named after the crypto.id, however some names have special characters. So the tables are named different
  const cryptoHash = {
    bitcoin: 'bitcoin',
    ethereum: 'ethereum',
    tether: 'tether',
    binancecoin: 'binancecoin',
    'usd-coin': 'usdc',
  };

  marketData.map(async (coin) => {
    let values = '';
    const now = new Date();
    const current = now.getTime();
    const btcM = marketData[0];
    let coinID = `${btcM.id}${current}`;
    const hashedCrypto = cryptoHash[coin.id];

    // Selecting the correct crypto before looping
    chartData[coin.id].prices.forEach(([timeStamp, price]) => {
      values += `('${coinID}' , ${timeStamp}, ${price}),`;
    });

    //   Remove last coma
    values = values.slice(0, -1);

    //   console.log(btcM);
    await db.query(
      `INSERT INTO ${hashedCrypto} (id, symbol, name, image, current_price, market_cap, market_cap_rank, fully_diluted_valuation, total_volume, volume_24hr, high_24h, low_24h, price_change_24h, price_change_percentage_24h, market_cap_change_24h, market_cap_change_percentage_24h, circulating_supply, total_supply, max_supply) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)`,
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
      `INSERT INTO ${hashedCrypto}_history (coin_id, timestamp, price) VALUES ${values};`
    );
  });
};

const cryptoDataFetch = async (days) => {
  const chartInfo = {};
  const { data } = await axios(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false`
  );

  if (data) {
    await Promise.all(
      data.map(async (coin) => {
        const result = await axios(
          `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=${days}`
        );

        if (result) {
          chartInfo[coin.id] = {
            prices: result.data.prices,
            volume_24hr: result.data.total_volumes.at(-1)[1],
          };
        }
      })
    ).then(() => {
      insertData(chartInfo, data);
    });
  }
  return chartInfo;
};

module.exports = cryptoDataFetch;

// Map solution

// const insertData = async (chartData, marketData) => {
//   //   Hashed data is here because the db tables are named after the crypto.id, however some names have special characters. So the tables are named different
//   const cryptoHash = {
//     bitcoin: 'bitcoin',
//     ethereum: 'ethereum',
//     tether: 'tether',
//     binancecoin: 'binancecoin',
//     'usd-coin': 'usdc',
//   };

//   marketData.map(async (coin) => {
//     let values = '';

//     // Selects the price data for the crypto of interest before looping
//     chartData[coin.id].prices.forEach(([timeStamp, price]) => {
//       values += `(${coin.id} , ${timeStamp}, ${price}),`;
//     });

//     //  Remove last coma
//     values = values.slice(0, -1);

//     let hashedCoin = cryptoHash[coin.id];
//     console.log('Hashed Coin and value', hashedCoin, values);

//     const btcM = marketData[0];

//     await db.query(
//       `INSERT INTO ${hashedCoin} (id, symbol, name, image, current_price, market_cap, market_cap_rank, fully_diluted_valuation, total_volume, volume_24hr, high_24h, low_24h, price_change_24h, price_change_percentage_24h, market_cap_change_24h, market_cap_change_percentage_24h, circulating_supply, total_supply, max_supply) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)`,
//       [
//         btcM.id,
//         btcM.symbol,
//         btcM.name,
//         btcM.image,
//         btcM.current_price,
//         btcM.market_cap,
//         btcM.market_cap_rank,
//         btcM.fully_diluted_valuation,
//         btcM.total_volume,
//         chartData[coin.id].volume_24hr,
//         btcM.high_24h,
//         btcM.low_24h,
//         btcM.price_change_24h,
//         btcM.price_change_percentage_24h,
//         btcM.market_cap_change_24h,
//         btcM.market_cap_change_percentage_24h,
//         btcM.circulating_supply,
//         btcM.total_supply,
//         btcM.max_supply,
//       ]
//     );

//     await db.query(
//       `INSERT INTO ${hashedCoin}_history (coin_id, timestamp, price) VALUES ${values};`
//     );
//   });
// };
