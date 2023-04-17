import useAxios from '../hooks/useAxios';
import moment from 'moment';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TempIcon } from '../icons/icons';
import { useContext, useEffect, useMemo } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import useDB from '../hooks/useDB';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function SmallChart({ coin }) {
  const { days } = useContext(CryptoContext);

  const { response, loading } = useDB(coin.crypto_id, days);

  // Need this for everything else to work
  if (!response) {
    return <div>Loading...</div>;
  }

  // console.log(coin.id, response.total_volumes.at(-1)[1]);

  // Bracket notation
  const cryptoData = response.chart.map((value) => {
    return {
      x: value[0],
      y: value[1],
    };
  });

  const options = {
    // Makes the chart adjust to the div size
    responsive: true,
    // Change aspect Ratio
    aspectRatio: 2 / 1,
    scales: {
      x: {
        grid: {
          // Removes grid lines
          display: false,
        },
        border: {
          // This removes the outside border
          display: false,
        },
        // Removes Visual Data
        ticks: {
          display: false,
        },
      },
      y: {
        grid: {
          // Removes grid lines
          display: false,
        },
        border: {
          // This removes the outside border

          display: false,
        },
        // Removes Visual Data
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        // Removes title
        display: false,
      },
    },
  };

  const data = {
    labels: cryptoData.map((value) => moment(value.x).format('MMMDD')),
    datasets: [
      {
        // Line Width
        borderWidth: 1.5,
        fill: true,
        data: cryptoData.map((value) => value.y),
        borderColor: 'rgb(127, 195, 121)',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        // Smoothens line
        tension: 0.4,
        // Removes dots
        pointRadius: 0,
      },
    ],
  };

  // Currency formatter

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  // Chart Percent

  const chartPercent = (num) => {
    if (num > 0) {
      return '+' + num;
    } else {
      return num;
    }
  };

  return (
    <div className='mt-8 flex justify-center'>
      <div className=' bg-white w-56 h-56 rounded-xl p-4 flex flex-col justify-between'>
        <div className='flex items-center m-0'>
          <img className='h-10 mr-3' src={coin.image} alt={coin.name} />

          <div>
            <h1 className='text-base m-0 h-5 font-medium'>{coin.name}</h1>
            <h1 className='text-base m-0 font-extralight'>
              {coin.symbol.toUpperCase()}
            </h1>
          </div>
        </div>
        <div className='mt-1'>
          <Line options={options} data={data} />
        </div>
        <div className='flex justify-between items-center'>
          <p
            className={`text-sm ${
              coin.price_change_percentage_24h > 0
                ? 'percentGreen'
                : 'percentRed'
            }`}
          >
            {chartPercent(coin.price_change_percentage_24h)}%
          </p>
          <p className='text-sm font-medium'>
            {formatter.format(coin.current_price)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SmallChart;
