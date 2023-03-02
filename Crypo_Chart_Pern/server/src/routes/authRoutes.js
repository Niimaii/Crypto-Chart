const { Router } = require('express');
const { getUsers, register } = require('../controllers/authControllers');
const { validationMiddleware } = require('../middleware/validation_middle');
const { registerValidation } = require('../validators/authValidation');
const router = Router();

router.get('/users', getUsers);
router.post('/register', registerValidation, validationMiddleware, register);

module.exports = router;
