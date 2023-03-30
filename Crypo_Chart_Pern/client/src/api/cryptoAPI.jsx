import axios from 'axios';

export async function getChart(coin, days) {
  console.log(coin, days);
  return await axios.get(
    `http://localhost:8005/api/crypto/chart/${coin}/${days}`
  );
}

export async function getMarket() {
  return await axios.get(`http://localhost:8005/api/crypto/market`);
}
