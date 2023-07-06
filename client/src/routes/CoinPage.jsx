import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useRef, useState } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import { getChart } from '../api/cryptoAPI';
import BigChart from '../components/BigChart';
import { useParams } from 'react-router-dom';
import { Exchange, RightArrow } from '../icons/icons';

function CoinPage() {
  const [crypto, setCrypto] = useState(0);
  const [money, setMoney] = useState('0');
  const [cursorPos, setCursorPos] = useState({ cursor: null });
  const inputRef = useRef(null);
  const { coin } = useParams();

  const [cryptoCurrency, setCryptoCUrrency] = useState('BTC');

  const { portfolio, market, isAuth } = useContext(CryptoContext);

  // Update the cursor position when converting
  useEffect(() => {
    if (inputRef.current) {
      const position = cursorPos.cursor;
      inputRef.current.setSelectionRange(position, position);
    }
  }, [cursorPos]);

  // If the user is logged in, then check for portfolio; else don't.
  if (isAuth() ? portfolio.isLoading : false || market.isLoading) {
    return <h1>Loading...</h1>;
  }

  //   Locate the correct crypto market data based on the coin of interest
  const coinMarket = market.data.find((crypto) => crypto.crypto_id === coin);

  // Currency formatter
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  // Short formatter
  const shortFormatter = (amount) => {
    if (amount >= 1e9) {
      return `$${(amount / 1e9).toFixed(1)}B`;
    } else if (amount >= 1e6) {
      return `$${(amount / 1e6).toFixed(1)}M`;
    } else if (amount >= 1e3) {
      return `$${(amount / 1e3).toFixed(1)}K`;
    } else {
      return `$${amount.toFixed(2)}`;
    }
  };

  //   ↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Crypto Converter ↓↓↓↓↓↓↓↓↓↓↓↓↓↓

  // TODO: Need to add decimal functionality to the Money Input

  // Convert money -> crypto and crypto -> money
  const converter = (e) => {
    // ====== Format the money value into a number ======
    // Remove special characters from 'e.target.value'
    const deFormatValue = e.target.value.replace(/[$,]/g, '');
    // Parse the 'deFormatValue' value as a number or '' if NaN
    const numberValue = isNaN(parseFloat(deFormatValue))
      ? ''
      : parseFloat(deFormatValue);

    // ====== Locate the correct cursor position ======
    // Get the cursor position
    let cursorPosition = e.target.selectionStart;
    // Slice all the characters after the cursor position from 'e.target.value'.
    const slicedInput = e.target.value.slice(0, cursorPosition);
    // Slice all the characters after the cursor position from 'formatting'.
    const slicedFormatter = formatter
      .format(numberValue)
      .slice(0, cursorPosition);
    // Count how many non-numbers are in the 'slicedInput'.
    const nonNumericValuesInput = (slicedInput.match(/[^0-9]/g) || []).length;
    // Count how many non-numbers are in the 'slicedFormatter'.
    const nonNumericValuesFormatter = (slicedFormatter.match(/[^0-9]/g) || [])
      .length;

    /* 
    Add to 'cursorPosition' based on the difference between
    'nonNumericValuesInput' and 'nonNumericValuesFormatter'.
   */
    cursorPosition += nonNumericValuesFormatter - nonNumericValuesInput;

    // I made 'cursorPos' = to an object in order to force a rerender
    setCursorPos((prev) => ({
      ...prev,
      cursor: cursorPosition,
    }));

    const reFormattedMoney =
      numberValue === '' ? '' : formatter.format(numberValue);
    if (e.target.id === 'Money') {
      const convertedToCrypto = numberValue / coinMarket.current_price;
      setMoney(reFormattedMoney);
      setCrypto(convertedToCrypto);
    } else {
      const convertedToMoney = numberValue * coinMarket.current_price;
      const reFormattedCrypto =
        numberValue === '' ? '' : formatter.format(convertedToMoney);
      setCrypto(numberValue);
      setMoney(reFormattedCrypto);
    }
  };

  //   ↑↑↑↑↑↑↑↑↑↑↑↑↑↑ Crypto Converter ↑↑↑↑↑↑↑↑↑↑↑↑↑↑

  const currency = 'USD';
  return (
    <div className='coin_page'>
      <BigChart coin={coin} />
      <div className='coin_detail'>
        <section className='converter'>
          <div className='converter_body'>
            <div className='w-full relative'>
              <input
                onChange={converter}
                id='Money'
                value={money}
                className='converter_input'
                type='text'
                ref={inputRef}
              />
              <p className='converter_input_text'>You Pay</p>
              <p className='converter_input_text2'>{currency}</p>
            </div>
            <Exchange />

            <div className='w-full relative'>
              <input
                onChange={converter}
                id='Crypto'
                value={crypto}
                className='converter_input'
                type='number'
              />
              <p className='converter_input_text'>You Get</p>
              <p className='converter_input_text2'>{cryptoCurrency}</p>
            </div>
          </div>
        </section>

        <section className='coin_data'>
          <div className='coin_data_rows'>
            <div>
              <h4>Price</h4>
              <h2>{formatter.format(coinMarket.current_price)}</h2>
            </div>
            <div>
              <h4>24h High</h4>
              <h2>{formatter.format(coinMarket.high_24h)}</h2>
            </div>
            <div>
              <h4>24h Low</h4>
              <h2>{formatter.format(coinMarket.low_24h)}</h2>
            </div>
          </div>

          <div className='coin_data_rows'>
            <div>
              <h4>Market Cap</h4>
              <h2>{shortFormatter(coinMarket.market_cap)}</h2>
            </div>
            <div>
              <h4>Volume</h4>
              <h2>{shortFormatter(coinMarket.total_volume)}</h2>
            </div>
            <div>
              <h4>Supply</h4>
              <h2>{shortFormatter(coinMarket.circulating_supply)}</h2>
            </div>
          </div>

          <div className='coin_data_rows'>
            <div>
              <h4>Market Rank</h4>
              <h2>{`#${coinMarket.market_cap_rank}`}</h2>
            </div>

            <div>
              <h4>All Time High</h4>
              <h2>{formatter.format(coinMarket.ath)}</h2>
            </div>

            <div>
              <h4>All Time Low</h4>
              <h2>{formatter.format(coinMarket.atl)}</h2>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CoinPage;
