import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

function TotalBalanceCard() {
  const queryClient = useQueryClient();
  const { data } = queryClient.getQueryData(['portfolio']);
  const portfolio = data.total_balance;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const total_balance = portfolio.total.toFixed(2);
  const difference = (
    total_balance - portfolio.initial_investment.toFixed(2)
  ).toFixed(2);
  return (
    <div className='total_balance'>
      <div className='total_balance_content'>
        <h4>Total Balance</h4>
        <div className='total_balance_body'>
          <div className='total_balance_amount'>
            <h2>{`${formatter.format(total_balance)}`} &ensp;</h2>
            <p
              className={`${difference >= 0 ? 'textPurple' : 'percentRed'}`}
              // Math.abs is there to make the number output as positive, while keeping the actual value true
            >{`${difference >= 0 ? '+ ' : '- '}(${Math.abs(difference)})`}</p>
          </div>
          <div className='total_balance_days'>
            <div className='total_balance_days_columns'>
              <p>7D</p>
              <h3>+41%</h3>
            </div>
            <div className='total_balance_days_columns'>
              <p>30D</p>
              <h3>-8.5%</h3>
            </div>
            <div className='total_balance_days_columns'>
              <p>1Y</p>
              <h3>N/A</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TotalBalanceCard;
