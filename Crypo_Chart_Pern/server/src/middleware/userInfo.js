const { SECRET, SERVER_URL } = require('../constants');
const jwt = require('jsonwebtoken');

const extractEmail = async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET);
      req.email = decoded.email;
    } catch (error) {
      console.log(error.message);
    }
  }

  next();
};

module.exports = extractEmail;
