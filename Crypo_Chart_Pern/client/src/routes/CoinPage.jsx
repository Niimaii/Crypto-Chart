import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useRef, useState } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import { getChart } from '../api/cryptoAPI';
import BigChart from '../components/BigChart';
import { useParams } from 'react-router-dom';

function CoinPage() {
  const [crypto, setCrypto] = useState(0);
  const [money, setMoney] = useState('0');
  const [cursorPos, setCursorPos] = useState({ cursor: null });
  const inputRef = useRef(null);
  const { coin } = useParams();

  const { portfolio, market } = useContext(CryptoContext);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['coin'],
    queryFn: () => getChart(coin, 30),
    staleTime: 1000 * 60 * 3,
    refetchInterval: 1000 * 60 * 3,
  });

  // Update the graph data when user visits another coin page
  useEffect(() => {
    refetch();
  }, [coin, refetch]);

  // Update the cursor position when converting
  useEffect(() => {
    if (inputRef.current) {
      console.log('this tan');
      const position = cursorPos.cursor;
      inputRef.current.setSelectionRange(position, position);
    }
  }, [cursorPos]);

  if (portfolio.isLoading || isLoading || market.isLoading) {
    return <h1>Loading...</h1>;
  }

  //   Locate the correct crypto market data based on the coin of interest
  const coinMarket = market.data.find((crypto) => crypto.crypto_id === coin);
  const chartData = data.data.chart;

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

  return (
    <div>
      <BigChart chartData={chartData} coin={coin} />
      <div className=''>
        <div className='converter'>
          <input
            onChange={converter}
            id='Money'
            value={money}
            className='w-96 h-14 border-2'
            type='text'
            ref={inputRef}
          />
          <input
            onChange={converter}
            id='Crypto'
            value={crypto}
            className='w-96 h-14 border-2'
            type='number'
          />
        </div>
      </div>

      <div>
        <div id='CoinInfoRow1' className='flex gap-5'>
          <div>
            <p>Price</p>
            <h2>{formatter.format(coinMarket.current_price)}</h2>
          </div>
          <div>
            <p>Market Cap</p>
            <h2>{shortFormatter(coinMarket.market_cap)}</h2>
          </div>
          <div>
            <p>Market Cap Rank</p>
            <h2>{`#${coinMarket.market_cap_rank}`}</h2>
          </div>
        </div>

        <div id='CoinInfoRow2' className='flex gap-5'>
          <div>
            <p>24h High</p>
            <h2>{formatter.format(coinMarket.high_24h)}</h2>
          </div>
          <div>
            <p>Volume</p>
            <h2>{shortFormatter(coinMarket.total_volume)}</h2>
          </div>
          <div>
            <p>All Time High</p>
            <h2>{formatter.format(coinMarket.ath)}</h2>
          </div>
        </div>

        <div id='CoinInfoRow3' className='flex gap-5'>
          <div>
            <p>24h Low</p>
            <h2>{formatter.format(coinMarket.low_24h)}</h2>
          </div>
          <div>
            <p>Circulating Supply</p>
            <h2>{shortFormatter(coinMarket.circulating_supply)}</h2>
          </div>
          <div>
            <p>All Time Low</p>
            <h2>{formatter.format(coinMarket.atl)}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoinPage;
