import React, { useContext, useEffect, useState } from 'react';
import { CloseIcon, DownToggleArrow } from '../icons/icons';
import { buyCoin, getMarket, getPortfolio } from '../api/cryptoAPI';
import { useQueryClient } from '@tanstack/react-query';
import { CryptoContext } from '../context/CryptoContext';
import { DownArrow } from '../icons/icons';
import { smartFormatter } from '../utils/Formatter';

function BuyCard() {
  const queryClient = useQueryClient();
  const coinResponse = queryClient.getQueryData(['market']);

  const { buyCard, closeBuyCard } = useContext(CryptoContext);
  const [amount, setAmount] = useState(0);
  const [cryptoName, setCryptoName] = useState('bitcoin');
  const [buy, setBuy] = useState(true);

  const cryptoTable = {};
  const coinNames = [];

  // Buy coins with API
  const purchaseCoin = async (crypto) => {
    const coinPurchase = {
      crypto: crypto,
      amount: amount,
    };
    await buyCoin(coinPurchase);
    // Refetch new purchase data so it displays current info
    await queryClient.invalidateQueries('market');
  };

  // Make a hashmap that uses the name and id.
  coinResponse.forEach((coin) => {
    cryptoTable[coin.name] = coin.crypto_id;
    coinNames.push(coin.name);
  });

  // Change the buy/sell underline display and interaction
  const handleBuySell = (e) => {
    if (e.target.id === 'buy') {
      setBuy(true);
    } else {
      setBuy(false);
    }
  };

  // Find the object with that matches the current selected coin
  const currentCrypto = coinResponse.find(
    (coin) => coin.crypto_id === cryptoName
  );

  const handleOptions = (e) => {
    const purchase = document.getElementById('purchase');
    purchase.classList.remove('animate_up');
    purchase.classList.add('animate_down');
  };

  const handleCoinSelect = (coin) => {
    setCryptoName(coin);
    const purchase = document.getElementById('purchase');
    purchase.classList.remove('animate_down');
    purchase.classList.add('animate_up');
  };

  const handleInput = (e) => {
    setAmount(e.target.value);
    const inputField = document.getElementById('buy_input');
    const dollarSign = document.getElementById('buy_symbol');

    inputField.addEventListener('input', () => {
      const inputWidth = inputField.offsetWidth;
      const dollarSignWidth = dollarSign.offsetWidth;
      const dollarLeft = parseInt(
        getComputedStyle(dollarSign).left.slice(0, -2)
      );

      console.log('input:', inputWidth);

      // dollarSign.style.left = `${23}px`;
    });
  };

  return (
    <main
      className={`buy_card_container absolute ${buyCard ? 'block' : 'hidden'}`}
    >
      <div className='flex justify-center mt-32'>
        <article className='buy_card'>
          <header className='buy_card_top'>
            <title className='buy_sell'>
              <div className='buy_sell_options'>
                <button id='buy' onClick={handleBuySell}>
                  Buy
                </button>
                <hr
                  className={`buy_sell_underline ${
                    buy ? '' : 'background_clear'
                  }`}
                />
              </div>
              <div className='buy_sell_options'>
                <button id='sell' onClick={handleBuySell}>
                  Sell
                </button>
                <hr
                  className={`buy_sell_underline ${
                    buy ? 'background_clear' : ''
                  }`}
                />
              </div>
            </title>
            <button className='buy_card_close' onClick={closeBuyCard}>
              <CloseIcon />
            </button>
          </header>
          <section className='buy_card_body'>
            <div className='buy_card_amount'>
              <button onClick={handleOptions} className='buy_card_crypto'>
                <div className='buy_card_crypto_options'>
                  <img
                    className='h-9 w-9'
                    src={currentCrypto.image}
                    alt={currentCrypto.name}
                  />
                  <div>
                    <p>{currentCrypto.name}</p>
                    <p>{currentCrypto.symbol.toUpperCase()}</p>
                  </div>
                </div>
                <DownToggleArrow />
              </button>
              <hr />
              <section className='buy_card_list'>
                {coinResponse.map((coin) => {
                  return (
                    <button
                      key={coin.crypto_id}
                      onClick={() => handleCoinSelect(coin.crypto_id)}
                      className='buy_card_list_options'
                    >
                      <div className='flex items-center gap-3'>
                        <img className='h-8 w-8' src={coin.image} alt='' />
                        <p>{coin.name}</p>
                      </div>
                      <p>{smartFormatter(coin.current_price, 3, 2, true)}</p>
                    </button>
                  );
                })}
              </section>
              <div id='purchase' className='buy_card_purchase'>
                <div>
                  <div className='relative'>
                    <div
                      id='buy_input'
                      contentEditable='true'
                      onChange={handleInput}
                      type='number'
                      min={0}
                      max={1000000}
                    >
                      {amount}
                    </div>
                    <span id='buy_symbol' className='buy_card_dollar'>
                      $
                    </span>
                  </div>

                  <p>
                    {smartFormatter(currentCrypto.current_price, 3, 2, true)}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                purchaseCoin(cryptoName);
              }}
            >
              Purchase
            </button>
          </section>
        </article>
      </div>
    </main>
  );
}

export default BuyCard;
