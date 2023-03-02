const { check } = require('express-validator');
const db = require('../db/indexDB');

// Pass
const password = check('password')
  .isLength({ min: 6, max: 25 })
  .withMessage('Password has to be between 6-25 characters');

// Email
const email = check('email')
  .isEmail()
  .withMessage('Please use a valid email format');

// Does email exist?
const emailExists = check('email').custom(async (value) => {
  const { rows } = await db.query('SELECT * from users WHERE email = $1', [
    value,
  ]);

  if (rows.length) {
    throw new Error('Email already exists');
  }
});

module.exports = {
  registerValidation: [email, password, emailExists],
};
