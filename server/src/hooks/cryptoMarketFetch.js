const axios = require('axios');
const db = require('../db/indexDB');

let count = 0;

const fetchMarket = async () => {
  // How many cryptos do you want to gather
  let cryptoAmount = 100;
  const { data } = await axios(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${cryptoAmount}&page=1&sparkline=false`
  );

  let values = '';

  if (data) {
    try {
      const now = new Date();
      const current = now.getTime();
      data.forEach((coin, index) => {
        let rank = index + 1;
        let volume24hr = 0;
        values += `(${rank},'${coin.id}','${coin.symbol}', '${coin.name}', '${coin.image}', ${coin.current_price}, ${coin.market_cap}, ${coin.market_cap_rank}, ${coin.fully_diluted_valuation}, ${coin.total_volume}, ${volume24hr}, ${coin.high_24h}, ${coin.low_24h}, ${coin.price_change_24h}, ${coin.price_change_percentage_24h}, ${coin.market_cap_change_24h}, ${coin.market_cap_change_percentage_24h}, ${coin.circulating_supply}, ${coin.total_supply}, ${coin.max_supply}, ${current}, ${coin.ath}, ${coin.atl}),`;
      });

      //   Remove last coma
      values = values.slice(0, -1);
      await db.query(
        `INSERT INTO crypto_market (rank ,crypto_id, symbol, name, image, current_price, market_cap, market_cap_rank, fully_diluted_valuation, total_volume, volume_24hr, high_24h, low_24h, price_change_24h, price_change_percentage_24h, market_cap_change_24h, market_cap_change_percentage_24h, circulating_supply, total_supply, max_supply, unix, ath, atl) VALUES ${values} ON CONFLICT (crypto_id) DO UPDATE SET rank = EXCLUDED.rank, symbol = EXCLUDED.symbol, name = EXCLUDED.name, image = EXCLUDED.image, current_price = EXCLUDED.current_price, market_cap = EXCLUDED.market_cap, market_cap_rank = EXCLUDED.market_cap_rank, fully_diluted_valuation = EXCLUDED.fully_diluted_valuation, total_volume = EXCLUDED.total_volume, volume_24hr = EXCLUDED.volume_24hr, high_24h = EXCLUDED.high_24h, low_24h = EXCLUDED.low_24h, price_change_24h = EXCLUDED.price_change_24h, price_change_percentage_24h = EXCLUDED.price_change_percentage_24h, market_cap_change_24h = EXCLUDED.market_cap_change_24h, market_cap_change_percentage_24h = EXCLUDED.market_cap_change_percentage_24h, circulating_supply = EXCLUDED.circulating_supply, total_supply = EXCLUDED.total_supply, max_supply = EXCLUDED.max_supply, unix = EXCLUDED.unix, ath = EXCLUDED.ath, atl = EXCLUDED.atl;`
      );
    } catch (err) {
      console.log('Error with coinMarketFetch');
      console.error(err.message);
    }
  }
  count++;
  console.log('cryptoMarketFetch has completed', count);
};

module.exports = fetchMarket;
