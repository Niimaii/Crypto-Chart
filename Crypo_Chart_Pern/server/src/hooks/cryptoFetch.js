const axios = require('axios');
const db = require('../db/indexDB');

let count = 0;
//   Hashed data is here because the db tables are named after the crypto.id, however some names have special characters. So the tables are named different
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

// This function inserts crypto market/chart data into database
const insertData = async (chartData, marketData, days, coinArray) => {
  // Map through all the crypto market data and isolate individual coin market data
  coinArray.map(async (coin, index) => {
    let values = '';
    const now = new Date();
    const current = now.getTime();
    const coinMarket = marketData.find((crypto) => crypto.id == coin);

    console.log('coinmarket.id = ', coinMarket.id);
    // This is creating a unique ID that is based on the current time/date
    let coinID = `${coinMarket.id}_${current}`;
    // Get the correct postgres Table name with hash table
    const tableName = cryptoHash[coin];

    // Selecting the correct crypto before looping
    chartData[coin].prices.forEach(([timeStamp, price]) => {
      values += `(${days},'${coinID}' , ${timeStamp}, ${price}),`;
    });

    //   Remove last coma
    values = values.slice(0, -1);

    // Adding data to the main crypto Table
    await db.query(
      `INSERT INTO ${tableName} (id, symbol, name, image, current_price, market_cap, market_cap_rank, fully_diluted_valuation, total_volume, volume_24hr, high_24h, low_24h, price_change_24h, price_change_percentage_24h, market_cap_change_24h, market_cap_change_percentage_24h, circulating_supply, total_supply, max_supply) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)`,
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

    // Adding data to our crypto chart Table
    await db.query(
      `INSERT INTO ${tableName}_history (chartDays,coin_id, timestamp, price) VALUES ${values};`
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
  // How many cryptos do you want to gather
  let cryptoAmount = 100;

  try {
    // Gets market data for multiple cryptos
    const { data } = await axios(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${cryptoAmount}&page=1&sparkline=false`
    );

    if (data) {
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

      count++;
      console.log('cryptoFetch has completed', count);

      // If chartInfo has content, then call the function
      if (Object.keys(chartInfo).length)
        insertData(chartInfo, data, days, coinArray);
    }
  } catch (err) {
    error = true;
    console.log('Error with cryptoFetch');
    console.error(err.message);
  }
  return { chartInfo, error };
};

module.exports = cryptoDataFetch;
