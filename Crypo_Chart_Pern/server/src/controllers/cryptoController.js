const db = require('../db/indexDB');

exports.getCrypto = async (req, res) => {
  try {
    const coin = req.params.coin;
    const days = req.params.days;
    console.log('coin:', coin, 'days:', days);
    /* I don't even know, I checked to make sure that the
    data being inserted was in order. Everything checks out, 
    but for some reason when I insert the data (which again
      is in order). It's saved out of order, so I need to 
      request it to be in order. Weird shit.  
    */
    const result = await db.query(
      'SELECT timestamp, price FROM crypto_chart WHERE crypto_id = $1 AND chartDays = $2 GROUP BY timestamp, price ORDER BY timestamp ASC;',
      [coin, days]
    );

    const chartData = [];

    result.rows.forEach((row) =>
      chartData.push([parseInt(row.timestamp), parseFloat(row.price)])
    );

    res.status(200).json({
      success: true,
      chart: chartData,
    });
  } catch (error) {
    console.log('Error with getCrypto controller');
    console.error(error);
  }
};

exports.getMarket = async (req, res) => {
  try {
    const market = await db.query(
      'SELECT * FROM crypto_market ORDER BY rank ASC;'
    );

    const marketObj = [];
    // Turning strings into INTs
    market.rows.forEach((coin) => {
      marketObj.push({
        ...coin,
        rank: parseInt(coin.rank),
        current_price: parseFloat(coin.current_price),
        market_cap: parseInt(coin.market_cap),
        fully_diluted_valuation: parseInt(coin.fully_diluted_valuation),
        total_volume: parseInt(coin.total_volume),
        volume_24hr: parseFloat(coin.volume_24hr),
        high_24h: parseFloat(coin.high_24h),
        low_24h: parseFloat(coin.low_24h),
        price_change_24h: parseFloat(coin.price_change_24h),
        price_change_percentage_24h: parseFloat(
          coin.price_change_percentage_24h
        ),
        market_cap_change_24h: parseInt(coin.market_cap_change_24h),
        market_cap_change_percentage_24h: parseFloat(
          coin.market_cap_change_percentage_24h
        ),
        circulating_supply: parseFloat(coin.circulating_supply),
        total_supply: parseFloat(coin.total_supply),
        max_supply: parseInt(coin.max_supply),
        unix: parseInt(coin.unix),
      });
    });

    res.status(200).json({
      success: true,
      market: marketObj,
    });
  } catch (error) {
    console.log('getMarket Error: ', error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.buyCoin = async (req, res) => {
  const { crypto, cryptoValue, amount } = req.body;
  const email = req.email;
  const crypto_total = amount / cryptoValue;
  try {
    const result = await db.query('SELECT id FROM users WHERE email = $1', [
      email,
    ]);

    const userID = result.rows[0].id;
    await db.query(
      'INSERT INTO investments (user_id, coin, coin_value, amount, crypto_total) values ($1, $2, $3, $4, $5)',
      [userID, crypto, cryptoValue, amount, crypto_total]
    );

    res.status(201).json({
      success: true,
      message: 'Purchase Complete',
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.getPortfolio = async (req, res) => {
  try {
    const investments = await db.query('SELECT * FROM investments;');
    const market = await db.query(
      'SELECT * FROM crypto_market ORDER BY rank ASC;'
    );
    const coinPrice = {};

    const portfolio = {
      total_balance: 0,
      initial_investment: 0,
    };

    // add keys to 'coinPrice' that are equal to the crypto name and it's current price
    market.rows.forEach((coin) => {
      coinPrice[coin.crypto_id] = parseFloat(coin.current_price);
    });

    // Give the users total balance, based on the investment made and current crypto prices
    investments.rows.forEach((purchase) => {
      const currentPrice = coinPrice[purchase.coin];
      portfolio.total_balance += purchase.crypto_total * currentPrice;
      // portfolio.initial_investment += purchase.amount;
    });
    res.status(201).json({
      status: true,
      portfolio: portfolio,
      // investments: investments,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};
