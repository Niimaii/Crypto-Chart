import React, { useContext, useEffect, useState } from 'react';
import { CloseIcon } from '../icons/icons';
import { buyCoin, getMarket, getPortfolio } from '../api/cryptoAPI';
import { useQueryClient } from '@tanstack/react-query';
import { CryptoContext } from '../context/CryptoContext';

function BuyCard() {
  const queryClient = useQueryClient();
  const cachedResponse = queryClient.getQueryData(['market']);
  const coinResponse = cachedResponse.data.market;

  const { buyCard, closeBuyCard } = useContext(CryptoContext);
  const [amount, setAmount] = useState(0);
  const [coinValue, setCoinValue] = useState(0);
  const [cryptoName, setCryptoName] = useState('bitcoin');
  const cryptoTable = {};
  const coinNames = [];

  // Buy coins with API
  const purchaseCoin = async (crypto, coinValue) => {
    const coinPurchase = {
      crypto: crypto,
      cryptoValue: coinValue,
      amount: amount,
    };
    await buyCoin(coinPurchase);
  };

  // Make a hashmap that uses the name and id.
  coinResponse.forEach((coin) => {
    cryptoTable[coin.name] = coin.crypto_id;
    coinNames.push(coin.name);
  });

  return (
    <div className={`buy_card absolute ${buyCard ? 'block' : 'hidden'}`}>
      <div className='flex justify-center mt-32'>
        <div className='card'>
          <div className='flex'>
            <div className=''>
              <button>Buy</button>
              <button>Sell</button>
            </div>
            <button onClick={closeBuyCard}>
              <CloseIcon />
            </button>
          </div>
          <div>
            <input
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              type='number'
              min={0}
              max={1000000}
              value={amount}
            />
            <select
              onChange={(e) => {
                setCryptoName(cryptoTable[e.target.value]);
              }}
              name=''
              id=''
            >
              {coinNames.map((coin) => {
                return (
                  <option key={coin} value={coin}>
                    {coin}
                  </option>
                );
              })}
            </select>
            <button
              onClick={() => {
                const targetCoin = coinResponse.find(
                  (coin) => coin.crypto_id == cryptoName
                );

                const cryptoValue = targetCoin.current_price;
                console.log('Target Coin', cryptoValue);
                purchaseCoin(cryptoName, cryptoValue);
              }}
            >
              Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyCard;
