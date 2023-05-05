import axios from 'axios';

export async function getChart(coin, days) {
  return await axios.get(
    `http://localhost:8005/api/crypto/chart/${coin}/${days}`
  );
}

export async function getMarket() {
  console.log('getMarket');
  return await axios.get(`http://localhost:8005/api/crypto/market`);
}

export async function getPortfolio() {
  return await axios.get(`http://localhost:8005/api/crypto/portfolio`);
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
