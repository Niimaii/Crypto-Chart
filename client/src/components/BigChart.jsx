/*
TODO: ADD BUTTON LOGIC
*/

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
import { useContext } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import useDB from '../hooks/useDB';
import { useQueryClient } from '@tanstack/react-query';

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

function BigChart({ chartData, coin }) {
  const queryClient = useQueryClient();
  const market = queryClient.getQueryData(['market']);

  //   Locate the correct crypto market data based on the coin of interest
  const coinMarket = market.find((crypto) => crypto.crypto_id === coin);

  // Currency formatter
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  //   ↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Chart Setup ↓↓↓↓↓↓↓↓↓↓↓↓↓↓

  // Bracket notation
  const cryptoData = chartData.map((value) => {
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
        backgroundColor: 'rgb(127, 195, 121, 0.05)',
        // Smoothens line
        tension: 0.4,
        // Removes dots
        pointRadius: 0,
      },
    ],
  };

  //   ↑↑↑↑↑↑↑↑↑↑↑↑↑↑ Chart Setup ↑↑↑↑↑↑↑↑↑↑↑↑↑↑

  return (
    <div>
      <div className='flex justify-between'>
        <div className='flex items-center m-0'>
          <img
            className='h-12 mr-3'
            src={coinMarket.image}
            alt={coinMarket.name}
          />

          <div>
            <h1 className='text-base m-0 h-5 font-medium'>{coinMarket.name}</h1>
            <h1 className='text-base m-0 font-extralight'>
              {coinMarket.symbol.toUpperCase()}
            </h1>
          </div>
        </div>
        <div className='flex gap-3'>
          <p>1D</p>
          <p>1M</p>
          <p>1Y</p>
        </div>
      </div>
      <h1>{formatter.format(coinMarket.current_price)}</h1>
      <div className='h-80'>
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default BigChart;
