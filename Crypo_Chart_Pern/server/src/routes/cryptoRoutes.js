const { Router } = require('express');
const { default: cryptoDataFetch } = require('../hooks/cryptoFetch');
const { getCrypto } = require('../controllers/cryptoController');

const router = Router();

router.get('/chart/:coin/:days', getCrypto);

module.exports = router;
