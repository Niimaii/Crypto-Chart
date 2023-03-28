const { Router } = require('express');
const { default: cryptoDataFetch } = require('../hooks/cryptoFetch');

const router = Router();

router.get('/cryptoData');

module.exports = router;
