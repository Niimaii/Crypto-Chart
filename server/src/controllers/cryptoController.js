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
    const name = market.rows[0].name;
    const userInfo = await db.query('SELECT id FROM users WHERE email = $1;', [
      email,
    ]);

    const userID = userInfo.rows[0].id;
    await db.query(
      'INSERT INTO investments (user_id, coin, coin_value, amount, crypto_total, image, symbol, name) values ($1, $2, $3, $4, $5, $6, $7, $8);',
      [userID, crypto, cryptoValue, amount, crypto_total, image, symbol, name]
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

exports.getCurrency = async (req, res) => {
  try {
    // This was passed by the userInfo middleware
    const email = req.email;
    const userInfo = await db.query(
      'SELECT currency FROM users WHERE email = $1;',
      [email]
    );
    const userCurrency =
      userInfo.rows[0].currency === null ? 'USD' : userInfo.rows[0].currency;

    res.status(201).json({
      success: true,
      currency: userCurrency,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.patchCurrency = async (req, res) => {
  try {
    const { currency } = req.body;
    // This was passed by the userInfo middleware
    const email = req.email;
    await db.query('UPDATE users SET currency = $1 WHERE email = $2;', [
      currency,
      email,
    ]);

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

exports.calculateDifference = async (req, res) => {
  // Comes from the userAuth middleware
  const { id, email } = req.user;
  // Current market price data passed from the frontend
  // const { market } = req.body;

  try {
    const marketData = await db.query('SELECT * FROM crypto_market');
    const market = marketData.rows;
    // Get user investment data. Organize the data from recent to oldest
    const investmentFetch = await db.query(
      'SELECT * FROM investments WHERE user_id = $1 ORDER BY created_at DESC',
      [id]
    );

    // Get past prices
    const pastPriceData = await db.query('SELECT * FROM past_prices');
    const pastPrices = pastPriceData.rows;

    const investments = investmentFetch.rows;

    // Check if they have investments from 1, 7, 30 and 90 days ago
    const days = [1, 7];
    // Get the current time
    const currentDate = new Date();

    const totalBasedOnDay = days.reduce(
      (acc, day) => {
        let totalAtDay = 0;
        let currentTotal = 0;
        let betweenTransactions = 0;

        investments.forEach((transaction) => {
          // Isolate the price of the current coin based on the day of interest
          const oldPrice = pastPrices.find(
            (price) => price.coin == transaction.coin && price.time_ago == day
          );

          const coinMarket = market.find(
            (coin) => coin.crypto_id == transaction.coin
          );

          // Get the day difference between now and transaction
          const transactionDate = new Date(transaction.created_at);
          const differenceInMilliseconds = currentDate - transactionDate;
          const differenceInDays =
            differenceInMilliseconds / (24 * 60 * 60 * 1000);
          // If the transaction is older than day, then add it to 'totalAtDay'
          if (differenceInDays > day) {
            totalAtDay += transaction.crypto_total * oldPrice.coin_value;
          } else {
            // Get the transactions between the day and current
            betweenTransactions += -transaction.amount;
          }

          currentTotal += transaction.crypto_total * coinMarket.current_price;
        });

        // Get the percent difference between the profits between their current and old total (excluding transactions)
        const calculatePercent = (value1, value2) => {
          const difference = value2 - value1;
          const percentDifference = (difference / value1) * 100;
          return percentDifference;
        };

        acc.result.push({
          percentDifference: calculatePercent(
            totalAtDay,
            currentTotal + betweenTransactions
          ),
          totalAtDay,
          betweenTransactions,
          currentTotal,
          day,
        });
        acc.previousDay = day;

        return acc;
      },
      {
        result: [],
        previousDay: 0,
      }
    );

    res.status(201).json({
      totalBasedOnDay,
      pastPrices,
      investments,
    });
  } catch (error) {
    console.log(error.message);
  }
};
