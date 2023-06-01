const { check } = require('express-validator');
const db = require('../db/indexDB');
const { compare } = require('bcryptjs');

// Pass

// This is getting the password passed from the post request without doing req
const password = check('password')
  .isLength({ min: 6, max: 25 })
  .withMessage('Password has to be between 6-25 characters');

// Makes sure you typed the correct password
const confirmPassword = check('confirmPassword').custom(
  async (value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password does not match');
    }
  }
);

// Make sure the password matches in the database
const passwordCheck = check('passwordCheck').custom(async (value, { req }) => {
  // Get the id from passport middleware
  const { id } = req.user;
  const { passwordCheck, password } = req.body;
  // Get access to the password based on th id
  const user = await db.query('SELECT password FROM users WHERE id = $1', [id]);

  // Compare the passwords
  const validPassword = await compare(
    req.body.passwordCheck,
    user.rows[0].password
  );

  // Make sure the passwords don't match
  if (passwordCheck === password) {
    throw new Error('Password matches, use new password');
  }

  if (!validPassword) {
    throw new Error('Wrong password');
  }
});

// Make sure the password matches in the database
const emailPasswordCheck = check('passwordCheck').custom(
  async (value, { req }) => {
    // Get the id from passport middleware
    const { id } = req.user;
    const { passwordCheck } = req.body;
    // Get access to the password based on th id
    const user = await db.query('SELECT password FROM users WHERE id = $1', [
      id,
    ]);

    // Compare the password inputted and the one in the DB
    const validPassword = await compare(passwordCheck, user.rows[0].password);

    if (!validPassword) {
      throw new Error('Wrong password');
    }
  }
);

// Email
const email = check('email')
  .isEmail()
  .withMessage('Please use a valid email format');

// Does email exist?
const emailExists = check('email').custom(async (value) => {
  const { rows } = await db.query('SELECT * from users WHERE email = $1', [
    value,
  ]);
  console.log(rows.length);
  if (rows.length) {
    throw new Error('Email already exists');
  }
});

// Login validation check

const loginCheck = check('email').custom(async (value, { req }) => {
  const user = await db.query('SELECT * from users WHERE email = $1', [value]);

  // If there is no user in rows, then the user does not exist
  if (!user.rows.length) {
    throw new Error('Email does not exist');
  }

  const validPassword = await compare(req.body.password, user.rows[0].password);

  if (!validPassword) {
    throw new Error('Wrong password');
  }

  // This is meant for the login function in authControllers, but this generally adds all the valid users info, such as id, email, password & when created
  req.user = user.rows[0];
});

module.exports = {
  registerValidation: [email, password, emailExists, confirmPassword],
  loginValidation: [loginCheck],
  emailValidation: [email, emailExists, emailPasswordCheck],
  passwordValidation: [passwordCheck, password, confirmPassword],
};
