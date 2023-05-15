const db = require('../db/indexDB');

exports.getCrypto = async (req, res) => {
  try {
    const coin = req.params.coin;
    const days = req.params.days;
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
  console.log('getMarket Ran');
  try {
    const market = await db.query(
      'SELECT * FROM crypto_market ORDER BY rank ASC;'
    );

    const marketObj = [];
    // Turning strings into INTs
    market.rows.forEach((coin) => {
      marketObj.push({
        ...coin,
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
  // const { crypto, cryptoValue, amount } = req.body;
  try {
    const { crypto, amount } = req.body;
    const market = await db.query(
      'SELECT * FROM crypto_market WHERE crypto_id = $1',
      [crypto]
    );

    const cryptoValue = market.rows[0].current_price;

    // This was passed by the userInfo middleware
    const email = req.email;
    const crypto_total = amount / cryptoValue;
    const image = market.rows[0].image;
    const symbol = market.rows[0].symbol;
    const userInfo = await db.query('SELECT id FROM users WHERE email = $1;', [
      email,
    ]);

    const userID = userInfo.rows[0].id;
    await db.query(
      'INSERT INTO investments (user_id, coin, coin_value, amount, crypto_total, image, symbol) values ($1, $2, $3, $4, $5, $6, $7);',
      [userID, crypto, cryptoValue, amount, crypto_total, image, symbol]
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
    // This was passed by the userInfo middleware
    const email = req.email;

    // Get the users id with their current email
    const userInfo = await db.query('SELECT id FROM users WHERE email = $1;', [
      email,
    ]);

    const userID = userInfo.rows[0].id;

    // Get users investments
    const investments = await db.query(
      'SELECT * FROM investments WHERE user_id = $1;',
      [userID]
    );
    // Get the current coin prices to compare
    const market = await db.query(
      'SELECT * FROM crypto_market ORDER BY rank ASC;'
    );
    const coinPrice = {};

    const totalBalance = {
      total: 0,
      initial_investment: 0,
    };

    // add keys to 'coinPrice' that are equal to the crypto name and it's current price
    market.rows.forEach((coin) => {
      coinPrice[coin.crypto_id] = coin.current_price;
    });

    // Give the users total balance, based on the investment made and current crypto prices
    investments.rows.forEach((purchase) => {
      const currentPrice = coinPrice[purchase.coin];
      totalBalance.total += purchase.crypto_total * currentPrice;
      totalBalance.initial_investment += purchase.amount;
    });
    res.status(201).json({
      status: true,
      total_balance: totalBalance,
      investments: investments.rows,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.patchFavorites = async (req, res) => {
  try {
    const { coin, is_favorite } = req.body;

    // This was passed by the userInfo middleware
    const email = req.email;
    const userInfo = await db.query('SELECT id FROM users WHERE email = $1;', [
      email,
    ]);
    const userID = userInfo.rows[0].id;

    // Add new row tracking user favorite status on coin, if coin already exists then update the favorite status
    await db.query(
      'INSERT INTO favorites (user_id, coin, is_favorite) VALUES ($1, $2, $3) ON CONFLICT (user_id, coin) DO UPDATE SET is_favorite = EXCLUDED.is_favorite;',
      [userID, coin, is_favorite]
    );

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    // This was passed by the userInfo middleware
    const email = req.email;
    const userInfo = await db.query('SELECT id FROM users WHERE email = $1;', [
      email,
    ]);
    const userId = userInfo.rows[0].id;

    const userFavorites = await db.query(
      'SELECT coin, is_favorite FROM favorites WHERE user_id = $1',
      [userId]
    );

    res.status(201).json({
      success: true,
      favorites: userFavorites.rows,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};
