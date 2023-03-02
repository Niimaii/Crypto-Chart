const { Router } = require('express');
const { getUsers, register, login } = require('../controllers/authControllers');
const { validationMiddleware } = require('../middleware/validation_middle');
const {
  registerValidation,
  loginValidation,
} = require('../validators/authValidation');

const router = Router();

router.get('/users', getUsers);
router.post('/register', registerValidation, validationMiddleware, register);
router.post('/login', loginValidation, validationMiddleware, login);

module.exports = router;
