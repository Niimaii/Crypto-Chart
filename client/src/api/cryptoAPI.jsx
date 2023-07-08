import axios from 'axios';

// Change baseURL depending if we are in production or development mode
const baseURL =
  process.env.NODE_ENV === 'production'
    ? '/api/crypto'
    : 'http://localhost:8005/api/crypto';

export async function getChart(coin, days) {
  return await axios.get(`${baseURL}/chart/${coin}/${days}`);
}

export async function getMarket() {
  const response = await axios.get(`${baseURL}/market`);
  return response.data.market;
}

export async function getPortfolio() {
  return await axios.get(`${baseURL}/portfolio`, {
    withCredentials: true,
  });
}

export async function buyCoin(cryptoPurchase) {
  return await axios.post(`${baseURL}/buy`, cryptoPurchase, {
    withCredentials: true,
  });
}

export async function getFavorites() {
  return await axios.get(`${baseURL}/favorites`, {
    withCredentials: true,
  });
}

export async function patchFavorites(userFavorite) {
  return await axios.patch(`${baseURL}/patch-favorites`, userFavorite, {
    withCredentials: true,
  });
}

export async function getCurrency() {
  return await axios.get(`${baseURL}/currency`, {
    withCredentials: true,
  });
}

export async function patchCurrency(currency) {
  return await axios.patch(`${baseURL}/patch-currency`, currency, {
    withCredentials: true,
  });
}

export async function calculateDifference(market) {
  return await axios.patch(
    `${baseURL}/difference`,
    { market },
    {
      withCredentials: true,
    }
  );
}
