import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { smartFormatter } from '../utils/Formatter';

function TotalBalanceCard() {
  const queryClient = useQueryClient();
  const { data } = queryClient.getQueryData(['portfolio']);
  const portfolio = data.total_balance;

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
            <h2>{`${smartFormatter(total_balance, 3, 0)}`}</h2>
            <p
              className={`${difference >= 0 ? 'textPurple' : 'percentRed'}`}
              // Math.abs is there to make the number output as positive, while keeping the actual value true
              // smartFormatter is a custom function that formats based on my needs
            >{`${difference >= 0 ? '+ ' : '- '}(${smartFormatter(
              Math.abs(difference),
              5,
              0,
              false
            )})`}</p>
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
