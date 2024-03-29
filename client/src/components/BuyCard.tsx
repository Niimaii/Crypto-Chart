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

  const { buyCard, closeBuyCard, portfolio, buyCardCoin, changeBuyCoin } =
    useContext(CryptoContext);

  const [amount, setAmount] = useState('');
  const [buy, setBuy] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // Get the users coin data for the current coin of interest
  const coinMarket = coinResponse.find(
    (coin) => coin.crypto_id === buyCardCoin
  );
  const userInvestments = portfolio.data.data.investments;
  const usersCoinAmount = userInvestments.reduce((sum, transaction) => {
    if (transaction.coin === buyCardCoin) {
      sum = sum + transaction.crypto_total * coinMarket.current_price;
    }

    return sum;
  }, 0);

  const cryptoTable = {};
  const coinNames = [];

  // Reset text input text formatting
  const inputReset = () => {
    const buyInput = document.getElementById('buy_input');
    const inputComparison = document.getElementById('buy_card_comparison');
    buyInput.style.fontSize = '5rem';
    inputComparison.style.fontSize = '5rem';

    setAmount('');
  };

  // Buy coins with API
  const purchaseCoin = async (crypto) => {
    inputReset();
    const coinPurchase = {
      crypto: crypto,
      amount: buy ? amount : -amount,
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
    (coin) => coin.crypto_id === buyCardCoin
  );

  const handleOptions = () => {
    const purchase = document.getElementById('purchase');

    if (!isOpen) {
      purchase.classList.remove('animate_up');
      purchase.classList.add('animate_down');
    } else {
      purchase.classList.remove('animate_down');
      purchase.classList.add('animate_up');
    }

    setIsOpen(!isOpen);
  };

  const handleCoinSelect = (coin) => {
    changeBuyCoin(coin);
    const purchase = document.getElementById('purchase');
    purchase.classList.remove('animate_down');
    purchase.classList.add('animate_up');

    // Reset text value and format
    setIsOpen(false);
    inputReset();
  };

  const handleInput = (e) => {
    if (e.target.value <= 9999999) {
      setAmount(e.target.value);
    }
  };

  const handleClose = () => {
    closeBuyCard();
    inputReset();
    setBuy(true);
  };

  // Update the position of '$' so that it adjusts to the input text
  useEffect(() => {
    const inputComparison = document.getElementById('buy_card_comparison');
    const dollarInput = document.getElementById('buy_card_dollar');
    // Horizontal
    const halfOfContainer = 150;
    const offSet = -15;
    // Vertical
    const verticalContainer = 14;
    const baseInputHeight = 68;
    const verticalOffSet = 3;

    // console.log('height', inputHeight);

    const buyInput = document.getElementById('buy_input');
    const baseFontSize = 5;

    if (
      inputComparison.offsetWidth === 0 ||
      inputComparison.offsetWidth === 50
    ) {
      dollarInput.style.left = '111px';
    } else if (inputComparison.offsetHeight === 0) {
      dollarInput.style.top = '14px';
    } else {
      // Adjust font size based on text length
      const textLength = inputComparison.textContent.length;
      const fontSize = Math.max(baseFontSize - textLength * 0.22, 1) + 'rem';
      buyInput.style.fontSize = fontSize;
      inputComparison.style.fontSize = fontSize;

      // Adjust the horizontal position of $ based on text size
      const differenceInLength =
        halfOfContainer - inputComparison.offsetWidth / 2 + offSet;
      dollarInput.style.left = `${differenceInLength}px`;

      // Adjust the vertical position of $ based on text size
      // In all honesty, I just kinda kept moving numbers around until the formatting looked good lol
      const differenceInHeight = baseInputHeight - inputComparison.offsetHeight;
      dollarInput.style.top = `${
        verticalContainer + differenceInHeight / 4 + verticalOffSet
      }px`;
    }
  }, [amount]);

  useEffect(() => {
    buyCard
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'visible');
  }, [buyCard]);

  return (
    <main
      className={`buy_card_container absolute ${buyCard ? 'block' : 'hidden'}`}
    >
      <div className='buy_card_container_2'>
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
            <button className='buy_card_close' onClick={handleClose}>
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
                <div className='relative'>
                  <div className='relative'>
                    <input
                      id='buy_input'
                      onChange={handleInput}
                      onClick={() => (amount == 0 ? setAmount('') : {})}
                      type='number'
                      min={0}
                      max={1000000}
                      value={amount}
                      placeholder='0'
                    />
                    <span id='buy_card_dollar'>$</span>
                  </div>

                  <p>
                    {smartFormatter(
                      buy ? currentCrypto.current_price : usersCoinAmount,
                      3,
                      2,
                      true
                    )}
                  </p>

                  <p id='buy_card_comparison'>{amount}</p>
                </div>
              </div>
            </div>
            <button
              className='buy_card_button'
              onClick={() => {
                purchaseCoin(buyCardCoin);
              }}
            >
              {buy ? 'Buy' : 'Sell'}
            </button>
          </section>
        </article>
      </div>
    </main>
  );
}

export default BuyCard;
