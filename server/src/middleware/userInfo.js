const { SECRET, SERVER_URL } = require('../constants');
const jwt = require('jsonwebtoken');

const extractEmail = async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET);
      // Pass the email for the controller
      req.email = decoded.email;
    } catch (error) {
      console.log(error.message);
    }
  }

  next();
};

module.exports = extractEmail;
