const db = require('../db/indexDB');
const { hash } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { SECRET, CLIENT_URL } = require('../constants/index');
const cryptoDataFetch = require('../hooks/cryptoFetch');

exports.getUsers = async (req, res) => {
  try {
    const cryptoResponse = await cryptoDataFetch(1);

    // console.dir(cryptoResponse);

    const { rows } = await db.query('select id, email from users');
    res.status(200).json({
      success: true,
      users: rows,
      crypto: cryptoResponse,
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

exports.login = async (req, res) => {
  // This gets the data passed from authValidation with the loginCheck function
  let user = req.user;
  payload = {
    id: user.id,
    email: user.email,
  };
  try {
    const token = await sign(payload, SECRET);

    // In cookies store the jwt token
    return res.status(200).cookie('token', token, { httpOnly: true }).json({
      success: true,
      message: 'Logged in successfully',
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  } finally {
    console.log(res);
  }
};

exports.protected = async (req, res) => {
  try {
    return res.status(200).json({
      info: 'protected info',
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.logout = async (req, res) => {
  try {
    return res.status(200).clearCookie('token', { httpOnly: true }).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};
