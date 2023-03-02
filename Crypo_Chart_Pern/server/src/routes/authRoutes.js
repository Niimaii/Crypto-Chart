const { Router } = require('express');
const { getUsers } = require('../controllers/authControllers');
const router = Router();

router.get('/users', getUsers);

module.exports = router;
