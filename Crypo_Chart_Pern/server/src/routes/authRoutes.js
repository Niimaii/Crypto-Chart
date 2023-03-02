const { Router } = require('express');
const {
  getUsers,
  register,
  login,
  protected,
  logout,
} = require('../controllers/authControllers');
const { validationMiddleware } = require('../middleware/validation_middle');
const {
  registerValidation,
  loginValidation,
} = require('../validators/authValidation');
const { userAuth } = require('../middleware/auth_middle');

const router = Router();

router.get('/users', getUsers);
router.get('/protected', userAuth, protected);

router.post('/register', registerValidation, validationMiddleware, register);
router.post('/login', loginValidation, validationMiddleware, login);
router.get('/logout', logout);

module.exports = router;
