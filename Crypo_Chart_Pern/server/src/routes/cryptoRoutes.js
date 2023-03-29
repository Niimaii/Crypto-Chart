const { Router } = require('express');
const { default: cryptoDataFetch } = require('../hooks/cryptoFetch');
const { getCrypto } = require('../controllers/cryptoController');

const router = Router();

router.get('/chart', getCrypto);

module.exports = router;
