const { config } = require('dotenv');
config();

module.exports = {
  PORT: process.env.PORT,
  SERVER_URL: process.env.SERVER_URL,
  SECRET: process.env.SECRET,
};
