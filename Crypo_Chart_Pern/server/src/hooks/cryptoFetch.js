const axios = require('axios');

// axios.defaults.baseURL = 'https://api.coingecko.com/api/v3';

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
            market_caps: result.data.market_caps,
            total_volumes: result.data.total_volumes,
          };
        }
      })
    );
  }
  return chartInfo;
};

module.exports = cryptoDataFetch;
