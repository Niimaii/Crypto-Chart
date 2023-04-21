const { Router } = require('express');
const { default: cryptoDataFetch } = require('../hooks/cryptoFetch');
const {
  getCrypto,
  getMarket,
  buyCoin,
} = require('../controllers/cryptoController');
const { userAuth } = require('../middleware/auth_middle');

const router = Router();

router.get('/chart/:coin/:days', getCrypto);
router.get('/market', getMarket);
router.post('/buy', userAuth, buyCoin);

module.exports = router;
