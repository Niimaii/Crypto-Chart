import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { DownArrow, UpArrow } from '../icons/icons';

function ActivityCard() {
  const queryClient = useQueryClient();
  const { data } = queryClient.getQueryData(['portfolio']);
  const portfolio = data.investments;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return (
    <div>
      <h1>Recent Activity</h1>
      <div>
        {portfolio.map((coin) => {
          return (
            <div key={coin.name} className='flex gap-5'>
              <p>Transaction</p>
              <p>{coin.crypto_total}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ActivityCard;
