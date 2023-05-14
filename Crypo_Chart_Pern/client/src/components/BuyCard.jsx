import React, { useContext, useEffect, useState } from 'react';
import { CloseIcon } from '../icons/icons';
import { buyCoin, getMarket, getPortfolio } from '../api/cryptoAPI';
import { useQueryClient } from '@tanstack/react-query';
import { CryptoContext } from '../context/CryptoContext';

function BuyCard() {
  console.log('Buy card ran');
  const queryClient = useQueryClient();
  const coinResponse = queryClient.getQueryData(['market']);

  const { buyCard, closeBuyCard } = useContext(CryptoContext);
  const [amount, setAmount] = useState(0);
  const [cryptoName, setCryptoName] = useState('bitcoin');
  const [displayCard, setDisplayCard] = useState(false);

  const cryptoTable = {};
  const coinNames = [];

  // Buy coins with API
  const purchaseCoin = async (crypto) => {
    const coinPurchase = {
      crypto: crypto,
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
                purchaseCoin(cryptoName);
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
