import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useQueryClient } from '@tanstack/react-query';
ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutCard() {
  const queryClient = useQueryClient();
  const portfolioData = queryClient.getQueryData(['portfolio']);
  const portfolio = portfolioData.data.investments;
  const marketData = queryClient.getQueryData(['market']);
  const market = marketData;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  //   ↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Organizing Transactions ↓↓↓↓↓↓↓↓↓↓↓↓↓↓

  //   Sum all the transactions based on the coin name into an Object
  const reducedTransactions = portfolio.reduce((acc, investment) => {
    const coinMarket = market.find((coin) => coin.name === investment.name);
    const currentInvestment =
      investment.crypto_total * coinMarket.current_price;
    acc[investment.name] = acc[investment.name] || 0;
    acc[investment.name] += currentInvestment;

    return acc;
  }, {});

  //   Organize the 'reducedTransactions' data from greatest to least
  const sortedTransactions = Object.entries(reducedTransactions).sort(
    (a, b) => b[1] - a[1]
  );

  //   Get an array with the organized coin list
  const transactionCoins = sortedTransactions.map(([key]) => key);
  //   Get an array with the organized transaction list
  const transactionsSummed = sortedTransactions.map(([key, value]) => value);

  //   ↑↑↑↑↑↑↑↑↑↑↑↑↑↑ Organizing Transactions ↑↑↑↑↑↑↑↑↑↑↑↑↑↑

  //   ↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Chart Setup ↓↓↓↓↓↓↓↓↓↓↓↓↓↓

  const colors = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 235, 86)',
    'rgb(75, 192, 192)',
    'rgb(120, 249, 135)',
    'rgb(255, 159, 64)',
    'rgb(43, 162, 138)',
    'rgb(153, 102, 255)',
    'rgb(91, 178, 91)',
    'rgb(236, 149, 210)',
  ];

  const backupColors = ['rgb(161, 172, 174)', 'rgb(60, 66, 66)'];

  const fillColors = [];
  const borderColors = [];

  //   For each coin the user transacted with, create a color to represent each one
  transactionCoins.forEach((element, index) => {
    if (fillColors.length >= colors.length) {
      fillColors.push(backupColors[0]);
      borderColors.push(backupColors[1]);
    } else {
      fillColors.push(colors[index]);
      borderColors.push(colors[index]);
    }
  });

  const data = {
    labels: transactionCoins,
    datasets: [
      {
        data: transactionsSummed,
        backgroundColor: fillColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      // Remove that damn pesky title!
      legend: {
        display: false,
      },
    },
  };

  //   ↑↑↑↑↑↑↑↑↑↑↑↑↑↑ Chart Setup ↑↑↑↑↑↑↑↑↑↑↑↑↑↑

  const transactionsTotal = transactionsSummed.reduce(
    (sum, number) => sum + number,
    0
  );

  return (
    <div className='doughnut'>
      <div className='doughnut_container'>
        <div className='flex justify-center h-56 w-56 mt-8'>
          <Doughnut options={options} data={data} />
        </div>

        <div className='doughnut_options mt-8'>
          {transactionCoins.map((transaction, index) => {
            // Get the percentage of individual transactions compared to their total sum
            const progressPercentage = `${
              (transactionsSummed[index] / transactionsTotal) * 100
            }%`;

            const shortPercentage = `${(
              (transactionsSummed[index] / transactionsTotal) *
              100
            ).toFixed(2)}%`;

            return (
              <div key={transaction}>
                <hr className='doughnut_line' />
                <div className='doughnut_row'>
                  <div className='d_row'>
                    <div className='flex justify-between'>
                      <p>{transaction}</p>
                      <div className='flex gap-7'>
                        <p>{formatter.format(transactionsSummed[index])}</p>
                        <p>{shortPercentage}</p>
                      </div>
                    </div>
                    <div className='progressbar-outer'>
                      <div
                        style={{
                          backgroundColor: colors[index],
                          width: progressPercentage,
                        }}
                        className='progressbar-inner'
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DoughnutCard;
