// How many cryptos do you want to gather
let cryptoAmount = 100;

// Gets market data for multiple cryptos
const { data } = await axios(
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${cryptoAmount}&page=1&sparkline=false`
);

// DB MARKET REQUEST
await db.query(
  `INSERT INTO crypto_market (crypto_id, symbol, name, image, current_price, market_cap, market_cap_rank, fully_diluted_valuation, total_volume, volume_24hr, high_24h, low_24h, price_change_24h, price_change_percentage_24h, market_cap_change_24h, market_cap_change_percentage_24h, circulating_supply, total_supply, max_supply) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
  ON CONFLICT (crypto_id) DO UPDATE SET
  symbol = EXCLUDED.symbol,
  name = EXCLUDED.name,
  image = EXCLUDED.image,
  current_price = EXCLUDED.current_price,
  market_cap = EXCLUDED.market_cap,
  market_cap_rank = EXCLUDED.market_cap_rank,
  fully_diluted_valuation = EXCLUDED.fully_diluted_valuation,
  total_volume = EXCLUDED.total_volume,
  volume_24hr = EXCLUDED.volume_24hr,
  high_24h = EXCLUDED.high_24h,
  low_24h = EXCLUDED.low_24h,
  price_change_24h = EXCLUDED.price_change_24h,
  price_change_percentage_24h = EXCLUDED.price_change_percentage_24h,
  market_cap_change_24h = EXCLUDED.market_cap_change_24h,
  market_cap_change_percentage_24h = EXCLUDED.market_cap_change_percentage_24h,
  circulating_supply = EXCLUDED.circulating_supply,
  total_supply = EXCLUDED.total_supply,
  max_supply = EXCLUDED.max_supply;`,
  [
    coinID,
    coinMarket.symbol,
    coinMarket.name,
    coinMarket.image,
    coinMarket.current_price,
    coinMarket.market_cap,
    coinMarket.market_cap_rank,
    coinMarket.fully_diluted_valuation,
    coinMarket.total_volume,
    chartData[coin].volume_24hr,
    coinMarket.high_24h,
    coinMarket.low_24h,
    coinMarket.price_change_24h,
    coinMarket.price_change_percentage_24h,
    coinMarket.market_cap_change_24h,
    coinMarket.market_cap_change_percentage_24h,
    coinMarket.circulating_supply,
    coinMarket.total_supply,
    coinMarket.max_supply,
  ]
);
