const { Router } = require('express');
const {
  getUsers,
  register,
  login,
  protected,
  logout,
  passwordCheck,
  changeEmail,
  changePassword,
} = require('../controllers/authControllers');
const { validationMiddleware } = require('../middleware/validation_middle');
const {
  registerValidation,
  loginValidation,
  emailValidation,
  passwordValidation,
} = require('../validators/authValidation');
const { userAuth } = require('../middleware/auth_middle');

const router = Router();

router.get('/users', getUsers);
router.get('/protected', userAuth, protected);
router.get('/logout', logout);

router.patch(
  '/change-email',
  emailValidation,
  validationMiddleware,
  userAuth,
  changeEmail
);
router.patch(
  '/change-password',
  userAuth,
  passwordValidation,
  validationMiddleware,
  changePassword
);

router.post('/check-pass', userAuth, passwordCheck);
router.post('/register', registerValidation, validationMiddleware, register);
router.post('/login', loginValidation, validationMiddleware, login);

module.exports = router;
