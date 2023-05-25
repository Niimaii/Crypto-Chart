import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useRef, useState } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import { getChart } from '../api/cryptoAPI';
import BigChart from '../components/BigChart';
import { useParams } from 'react-router-dom';

function CoinPage() {
  const [crypto, setCrypto] = useState(0);
  const [money, setMoney] = useState('0');
  const [cursorPos, setCursorPos] = useState(null);
  const [iterate, setIterate] = useState(0);
  const inputRef = useRef(null);

  const { portfolio, market } = useContext(CryptoContext);
  const { data, isLoading } = useQuery({
    queryKey: ['coin'],
    queryFn: () => getChart('bitcoin', 30),
    staleTime: 1000 * 60 * 3,
    refetchInterval: 1000 * 60 * 3,
  });

  const { coin } = useParams();

  // Only update the position after a re-render (to avoid stupid issues)
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setSelectionRange(cursorPos, cursorPos);
    }
  }, [cursorPos, iterate]);

  if (portfolio.isLoading || isLoading || market.isLoading) {
    return <h1>Loading...</h1>;
  }

  //   Locate the correct crypto market data based on the coin of interest
  const coinMarket = market.data.find((crypto) => crypto.crypto_id === coin);
  const chartData = data.data.chart;
  //   ↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Crypto Converter ↓↓↓↓↓↓↓↓↓↓↓↓↓↓
  // Currency formatter
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  const converter = (e) => {
    // Remove the currency symbol and grouping separators
    const deFormatValue = e.target.value.replace(/[$,]/g, '');
    // Parse the deFormatValue value as a number or '' if NaN
    const numberValue = isNaN(parseFloat(deFormatValue))
      ? ''
      : parseFloat(deFormatValue);
    // Get the cursor position
    let cursorPosition = e.target.selectionStart;
    // Slice all the characters after the cursor position from e.target.value.
    const slicedInput = e.target.value.slice(0, cursorPosition);
    // Slice all the characters after the cursor position after formatting.
    const slicedFormatter = formatter
      .format(numberValue)
      .slice(0, cursorPosition);
    // Count how many non-numbers are in the slicedInput.
    const nonNumericValuesInput = (slicedInput.match(/[^0-9]/g) || []).length;
    // Count how many non-numbers are in the slicedFormatter.
    const nonNumericValuesFormatter = (slicedFormatter.match(/[^0-9]/g) || [])
      .length;

    console.log(
      'Input + Formatter',
      nonNumericValuesInput,
      nonNumericValuesFormatter
    );
    console.log(slicedFormatter);
    // Add to 'cursorPosition' based on that amount
    cursorPosition += nonNumericValuesFormatter - nonNumericValuesInput;
    console.log('Cursor Position:', cursorPosition, cursorPos);

    /* 
    This is some dumb shit, I have to force a re-render 
    when the cursor position is the same as last time.
    This way the cursor position always update, otherwise
    the cursor position will be fucking stupid.
    */
    if (cursorPosition === cursorPos) {
      setIterate((prev) => prev + 1);
    }
    setCursorPos(cursorPosition);

    // console.log('Cursor Position:', cursorPosition);
    // console.log('Sliced:', e.target.value.slice(0, cursorPosition));
    // console.log('Input:', e.target.value);

    const reFormatted = numberValue === '' ? '' : formatter.format(numberValue);
    if (e.target.id === 'Money') {
      const convertedToCrypto = numberValue / coinMarket.current_price;
      setMoney(reFormatted);
      setCrypto(convertedToCrypto);
    } else {
      const convertedToMoney = numberValue * coinMarket.current_price;
      setCrypto(numberValue);
      setMoney(convertedToMoney);
    }
  };

  //   ↑↑↑↑↑↑↑↑↑↑↑↑↑↑ Crypto Converter ↑↑↑↑↑↑↑↑↑↑↑↑↑↑

  return (
    <div>
      <BigChart chartData={chartData} coin={coin} />
      <div className='ml-20'>
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
    </div>
  );
}

export default CoinPage;
