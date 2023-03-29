const db = require('../db/indexDB');

exports.getCrypto = async (req, res) => {
  try {
    const { coin, days } = req.body;
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

    const chartData = result.rows.map((row) => [row.timestamp, row.price]);

    res.status(200).json({
      success: true,
      chart: chartData,
    });
  } catch (error) {
    console.log('Error with getCrypto controller');
    console.error(error);
  }
};
