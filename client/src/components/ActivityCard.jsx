import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { DownArrow, UpArrow } from '../icons/icons';

function ActivityCard() {
  const queryClient = useQueryClient();
  const { data } = queryClient.getQueryData(['portfolio']);
  const portfolio = data.investments;

  //   Format numbers to look like: 23.M, 1.1K
  const formatNumber = (number) => {
    if (Math.abs(number) >= 1) {
      const suffixes = ['', 'K', 'M', 'B', 'T'];
      const suffixIndex = Math.floor(Math.log10(Math.abs(number)) / 3);
      const shortNumber = (number / Math.pow(1000, suffixIndex)).toFixed(2);
      return shortNumber + suffixes[suffixIndex];
    }

    return number.toFixed(3);
  };

  //   Format numbers to look like: $1,555, -$921
  const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });

  //   Based on the size of the number, use a different formatter
  const moneyManager = (number) => {
    if (number > 999999) {
      return '$' + formatNumber(number);
    }

    return money.format(number);
  };

  return (
    <div className='activity'>
      <h4>Recent Activity</h4>
      <div>
        {portfolio.map((coin, index) => {
          // get the date
          const date = new Date(coin.created_at);
          const formattedDate = date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
          });
          return (
            <div key={coin.name + index} className='flex gap-5'>
              <div>{coin.amount >= 0 ? <UpArrow /> : <DownArrow />}</div>
              <p>{formatNumber(coin.crypto_total)}</p>
              <p>{moneyManager(coin.amount)}</p>
              <p>{formattedDate}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ActivityCard;
