const db = require('../db/index');

exports.getUsers = async (req, res) => {
  try {
    const { rows } = await db.query('select id, email from users');
    res.status(200).json({
      success: true,
      users: rows,
    });
  } catch (error) {
    console.log(error.message);
  }
};
