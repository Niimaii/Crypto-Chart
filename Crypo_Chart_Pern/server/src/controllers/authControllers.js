const db = require('../db/indexDB');
const { hash } = require('bcryptjs');

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

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Encrypt the password
    const hashedPassword = await hash(password, 10);

    await db.query('INSERT INTO users (email, password) values ($1, $2)', [
      email,
      hashedPassword,
    ]);

    res.status(201).json({
      success: true,
      message: 'Registration complete',
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};
