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
import { useContext, useEffect, useState } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import useDB from '../hooks/useDB';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getChart } from '../api/cryptoAPI';

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

function ChartCard() {
  const queryClient = useQueryClient();
  const market = queryClient.getQueryData(['market']);
  const portfolioData = queryClient.getQueryData(['portfolio']);
  const [coinDay, setCoinDay] = useState(30);
  const portfolio = portfolioData.data.investments;
  const coin = 'bitcoin';
  const coinChart = useQuery({
    queryKey: ['coin'],
    queryFn: () => getChart(coin, coinDay),
    staleTime: 1000 * 60 * 3,
    refetchInterval: 1000 * 60 * 3,
  });

  useEffect(() => {
    coinChart.refetch();
  }, [coinDay]);

  if (coinChart.isLoading) {
    return <div>Loading...</div>;
  }

  const chartData = coinChart.data.data.chart;

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
    aspectRatio: 5 / 2,
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
        backgroundColor: 'rgb(127, 195, 121, 0)',
        // Smoothens line
        tension: 0.4,
        // Removes dots
        pointRadius: 0,
      },
    ],
  };

  //   ↑↑↑↑↑↑↑↑↑↑↑↑↑↑ Chart Setup ↑↑↑↑↑↑↑↑↑↑↑↑↑↑

  return (
    <div className='chart_card'>
      <div className='chart_card_body'>
        <div className='chart_card_body_left'>
          <div className='flex justify-between'>
            <div className='flex items-center m-0'>
              <img
                className='h-12 mr-3'
                src={coinMarket.image}
                alt={coinMarket.name}
              />

              <div>
                <h1 className='text-base m-0 h-5 font-medium'>
                  {coinMarket.name}
                </h1>
                <h1 className='text-base m-0 font-extralight'>
                  {coinMarket.symbol.toUpperCase()}
                </h1>
              </div>
            </div>
          </div>
          <h3>{formatter.format(coinMarket.current_price)}</h3>
        </div>
        <div className='chart_card_body_right'>
          <div className='days_options'>
            <button onClick={() => setCoinDay(1)}>1D</button>
            <button onClick={() => setCoinDay(7)}>7D</button>
            <button onClick={() => setCoinDay(30)}>1M</button>
            <button onClick={() => setCoinDay(365)}>1Y</button>
          </div>

          <select className='chart_card_coins'>
            {portfolio.map((investment, index) => {
              return (
                <option key={investment.name + index} value=''>
                  {investment.symbol.toUpperCase()}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <Line options={options} data={data} />
    </div>
  );
}

export default ChartCard;
