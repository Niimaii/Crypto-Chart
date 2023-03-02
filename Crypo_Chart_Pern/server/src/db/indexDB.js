const { Pool } = require('pg');
const { config } = require('dotenv');
config();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'crypto_chart',
  password: process.env.PASSWORD,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
