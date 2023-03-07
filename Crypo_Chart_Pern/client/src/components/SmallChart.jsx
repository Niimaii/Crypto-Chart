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

function SmallChart() {
  const { response } = useAxios(
    'coins/bitcoin/market_chart?vs_currency=usd&days=365'
  );

  // Need this for everything else to work
  if (!response) {
    return <div>Loading...</div>;
  }

  console.log(response);

  const cryptoData = response.prices.map((value) => {
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

  return (
    <div className='bg-white w-80 h-80 rounded-xl p-4'>
      <div className='flex items-center m-0'>
        <TempIcon />
        <div>
          <h1 className='text-xl m-0 h-5 font-medium'>Bitcoin</h1>
          <h1 className='text-xl m-0 font-extralight'>BTC</h1>
        </div>
      </div>
      <Line options={options} data={data} />
      <div className='flex justify-between mt-10 items-center'>
        <p className='chartPercent'>+5.72%</p>
        <p className='text-lg font-medium'>$1,602.95</p>
      </div>
    </div>
  );
}

export default SmallChart;
