import React, { useEffect, useState } from 'react';
import { CloseIcon } from '../icons/icons';
import { buyCoin, getMarket, getPortfolio } from '../api/cryptoAPI';

function BuyCard() {
  const [display, setDisplay] = useState(false);
  const [amount, setAmount] = useState(0);
  const [coinValue, setCoinValue] = useState(0);
  const [cryptoName, setCryptoName] = useState('bitcoin');
  const cryptoTable = {};
  const coinNames = [];

  const [coinResponse, setCoinResponse] = useState();
  const [portfolio, setPortfolio] = useState();

  useEffect(() => {
    console.log('useEffect buyCard');
    const market = async () => {
      const coinResult = await getMarket();

      if (coinResult) {
        setCoinResponse(coinResult.data.market);
      }
    };

    market();
  }, []);

  if (!coinResponse) {
    return <h1>Loading...</h1>;
  }

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
    <div className={`buy_card absolute ${display ? 'block' : 'hidden'}`}>
      <div className='flex justify-center mt-32'>
        <div className='card'>
          <div className='flex'>
            <div className=''>
              <button>Buy</button>
              <button>Sell</button>
            </div>
            <CloseIcon />
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
