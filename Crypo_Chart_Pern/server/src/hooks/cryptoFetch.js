const axios = require('axios');
const db = require('../db/indexDB');

// axios.defaults.baseURL = 'https://api.coingecko.com/api/v3';

const insertData = async (cartData, marketData) => {
  let values = '';
  cartData.forEach(([timeStamp, price]) => {
    values += `('bitcoin' , ${timeStamp}, ${price}),`;
  });

  //   Remove last coma
  values = values.slice(0, -1);

  const btcM = marketData[0];
  //   console.log(btcM);
  await db.query(
    `INSERT INTO bitcoin (id, symbol, name, image, current_price, market_cap, market_cap_rank, fully_diluted_valuation, total_volume, volume_24hr, high_24h, low_24h, price_change_24h, price_change_percentage_24h, market_cap_change_24h, market_cap_change_percentage_24h, circulating_supply, total_supply, max_supply) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)`,
    [
      btcM.id,
      btcM.symbol,
      btcM.name,
      btcM.image,
      btcM.current_price,
      btcM.market_cap,
      btcM.market_cap_rank,
      btcM.fully_diluted_valuation,
      btcM.total_volume,
      btcM.volume_24hr,
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
    `INSERT INTO bitcoin_history (coin_id, timestamp, price) VALUES ${values};`
  );
};

const cryptoDataFetch = async (days) => {
  const chartInfo = {};
  const { data } = await axios(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=1&page=1&sparkline=false`
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
      insertData(chartInfo.bitcoin.prices, data);
    });
  }
  return chartInfo;
};

module.exports = cryptoDataFetch;
