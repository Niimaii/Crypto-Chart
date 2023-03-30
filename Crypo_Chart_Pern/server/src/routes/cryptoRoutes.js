const { Router } = require('express');
const { default: cryptoDataFetch } = require('../hooks/cryptoFetch');
const { getCrypto, getMarket } = require('../controllers/cryptoController');

const router = Router();

router.get('/chart/:coin/:days', getCrypto);
router.get('/market', getMarket);

module.exports = router;
