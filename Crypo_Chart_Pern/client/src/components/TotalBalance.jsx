import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

function TotalBalance() {
  const queryClient = useQueryClient();
  const portfolio = queryClient.getQueryData(['portfolio']);

  console.log('Portfolio', portfolio);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const total_balance = portfolio.data.total_balance.total.toFixed(2);
  const difference = (
    total_balance - portfolio.data.total_balance.initial_investment.toFixed(2)
  ).toFixed(2);
  return (
    <div className='flex justify-center'>
      <div className='balance_display'>
        <p>Total Balance</p>
        <p>
          {`${formatter.format(total_balance)} `} &ensp;
          <span
            className={`${difference >= 0 ? 'textPurple' : 'percentRed'}`}
            // Math.abs is there to make the number output as positive, while keeping the actual value true
          >{`${difference >= 0 ? '+' : '-'}(${Math.abs(difference)})`}</span>
        </p>
        <div className='flex'>
          <div>
            <p>7D</p>
            <p>+41%</p>
          </div>
          <div>
            <p>30D</p>
            <p>-8.5%</p>
          </div>
          <div>
            <p>1Y</p>
            <p>-20%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TotalBalance;
