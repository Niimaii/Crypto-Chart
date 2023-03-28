const axios = require('axios');
const db = require('../db/indexDB');

const cryptoHash = {
  bitcoin: 'bitcoin',
  ethereum: 'ethereum',
  tether: 'tether',
  binancecoin: 'binancecoin',
  'usd-coin': 'usd_coin',
  ripple: 'ripple',
  cardano: 'cardano',
  'staked-ether': 'staked_ether',
  dogecoin: 'dogecoin',
  'matic-network': 'matic_network',
  solana: 'solana',
  'binance-usd': 'binance_usd',
  polkadot: 'polkadot',
  litecoin: 'litecoin',
  'shiba-inu': 'shiba_inu',
};

let cryptoAmount = 5;
// Gets market data for multiple cryptos
// const { data } = await axios(
//   `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${cryptoAmount}&page=1&sparkline=false`
// );
//   TODO, put this stuff in a function

const coinMarket = marketData[index];

// Adding data to the main crypto Table
// await db.query(
//     `INSERT INTO ${tableName} (id, symbol, name, image, current_price, market_cap, market_cap_rank, fully_diluted_valuation, total_volume, volume_24hr, high_24h, low_24h, price_change_24h, price_change_percentage_24h, market_cap_change_24h, market_cap_change_percentage_24h, circulating_supply, total_supply, max_supply) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)`,
//     [
//       coinID,
//       coinMarket.symbol,
//       coinMarket.name,
//       coinMarket.image,
//       coinMarket.current_price,
//       coinMarket.market_cap,
//       coinMarket.market_cap_rank,
//       coinMarket.fully_diluted_valuation,
//       coinMarket.total_volume,
//       chartData[coin.id].volume_24hr,
//       coinMarket.high_24h,
//       coinMarket.low_24h,
//       coinMarket.price_change_24h,
//       coinMarket.price_change_percentage_24h,
//       coinMarket.market_cap_change_24h,
//       coinMarket.market_cap_change_percentage_24h,
//       coinMarket.circulating_supply,
//       coinMarket.total_supply,
//       coinMarket.max_supply,
//     ]
//   );
