import axios from 'axios';

export async function getChart(coin, days) {
  return await axios.get(
    `http://localhost:8005/api/crypto/chart/${coin}/${days}`
  );
}

export async function getMarket() {
  console.log('getMarket ran');
  const response = await axios.get(`http://localhost:8005/api/crypto/market`);
  return response.data.market;
}

export async function getPortfolio() {
  return await axios.get(`http://localhost:8005/api/crypto/portfolio`, {
    withCredentials: true,
  });
}

export async function buyCoin(cryptoPurchase) {
  return await axios.post(
    'http://localhost:8005/api/crypto/buy',
    cryptoPurchase,
    {
      withCredentials: true,
    }
  );
}

export async function getFavorites() {
  return await axios.get('http://localhost:8005/api/crypto/favorites', {
    withCredentials: true,
  });
}

export async function patchFavorites(userFavorite) {
  console.log('patchFavorites ran');
  return await axios.patch(
    'http://localhost:8005/api/crypto/patch-favorites',
    userFavorite,
    {
      withCredentials: true,
    }
  );
}
