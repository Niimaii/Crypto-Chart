const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
