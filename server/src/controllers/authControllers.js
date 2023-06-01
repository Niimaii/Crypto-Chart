const db = require('../db/indexDB');
const { hash, compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { SECRET, CLIENT_URL } = require('../constants/index');
const cryptoDataFetch = require('../hooks/cryptoFetch');
const fetchMarket = require('../hooks/cryptoMarketFetch');

exports.getUsers = async (req, res) => {
  try {
    const block3 = ['bitcoin', 'ethereum', 'tether', 'binancecoin', 'usd-coin'];

    const cryptoResponse = await cryptoDataFetch(30, block3);
    const chartInfo = cryptoResponse.chartInfo;
    console.log(chartInfo.bitcoin.prices);
    if (cryptoResponse) {
      await fetchMarket(chartInfo);
    }

    const bitcoinChart = cryptoResponse.chartInfo.bitcoin.prices;

    const { rows } = await db.query('select id, email from users');
    res.status(200).json({
      success: true,
      users: rows,
      bitcoin_chart: bitcoinChart,
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

exports.passwordCheck = async (req, res) => {
  try {
    // Get the id from passport middleware
    const { id } = req.user;
    // Get access to the password based on th id
    const user = await db.query('SELECT password FROM users WHERE id = $1', [
      id,
    ]);

    // Compare the passwords
    const validPassword = await compare(
      req.body.password,
      user.rows[0].password
    );

    if (!validPassword) {
      throw new Error('Wrong password');
    } else {
      return res.status(200).json({
        success: true,
        message: 'Correct Password',
      });
    }
  } catch (error) {
    return res.status(403).json({
      error: 'Wrong Password',
    });
  }
};

exports.changeEmail = async (req, res) => {
  try {
    const { email, id } = req.user;
    const newEmail = req.body.email;

    await db.query('UPDATE users SET email = $1 WHERE email = $2', [
      newEmail,
      email,
    ]);
    const payload = {
      id: id,
      email: newEmail,
    };

    const newToken = await sign(payload, SECRET);

    // Clear Cookie
    res.clearCookie('token', { httpOnly: true });
    // Replace Cookie
    res.cookie('token', newToken, { httpOnly: true });

    return res.status(200).json({
      success: true,
      message: 'Email Changed',
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    // Comes from the userAuth middleware
    const { id, email } = req.user;
    const newPassword = req.body.password;
    // Encrypt the password
    const hashedPassword = await hash(newPassword, 10);

    // Change Password
    await db.query('UPDATE users SET password = $1 WHERE id = $2', [
      hashedPassword,
      id,
    ]);

    // ↓↓↓↓↓↓↓ Create a new token ↓↓↓↓↓↓↓
    const payload = {
      id: id,
      email: email,
    };

    const newToken = await sign(payload, SECRET);

    // Clear Cookie
    res.clearCookie('token', { httpOnly: true });
    // Replace Cookie
    res.cookie('token', newToken, { httpOnly: true });

    // ↑↑↑↑↑↑↑↑ Create a new token ↑↑↑↑↑↑↑↑

    return res.status(200).json({
      success: true,
      message: 'Password Changed',
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
};
