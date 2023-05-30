const { Router } = require('express');
const { default: cryptoDataFetch } = require('../hooks/cryptoFetch');
const {
  getCrypto,
  getMarket,
  buyCoin,
  getPortfolio,
  patchFavorites,
  getFavorites,
  getCurrency,
  patchCurrency,
} = require('../controllers/cryptoController');
const { userAuth } = require('../middleware/auth_middle');
const extractEmail = require('../middleware/userInfo');

const router = Router();

router.get('/chart/:coin/:days', getCrypto);
router.get('/market', getMarket);
router.get('/portfolio', userAuth, extractEmail, getPortfolio);
router.get('/favorites', userAuth, extractEmail, getFavorites);
router.get('/currency', userAuth, extractEmail, getCurrency);

router.post('/buy', userAuth, extractEmail, buyCoin);

router.patch('/patch-favorites', userAuth, extractEmail, patchFavorites);
router.patch('/patch-currency', userAuth, extractEmail, patchCurrency);

module.exports = router;
