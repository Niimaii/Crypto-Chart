import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { smartFormatter } from '../utils/Formatter';

function TotalBalanceCard() {
  const queryClient = useQueryClient();
  const { data } = queryClient.getQueryData(['portfolio']);
  const differenceData = queryClient.getQueryData(['difference']);
  const userDif = differenceData.data;
  const totalDayGains = userDif[1].netDayGain.toFixed(0);
  const portfolio = data.total_balance;
  const total_balance = portfolio.total.toFixed(2);

  /* Check to see if 'userDif[x]' is valid and contains that days  
  percent changes. If so then make it look like a typical percent 
  symbol (i.e -20%). Else return 'N/A'.
  */
  const getDayPercentage = () => {
    const dayPercentage = {
      7: userDif[7]?.percentDifference?.toFixed(2) ?? 'N/A',
      30: userDif[30]?.percentDifference?.toFixed(2) ?? 'N/A',
      90: userDif[90]?.percentDifference?.toFixed(2) ?? 'N/A',
    };

    if (dayPercentage[7] != 'N/A') {
      dayPercentage[7] =
        dayPercentage[7] > 0
          ? '+' + dayPercentage[7] + '%'
          : dayPercentage[7] + '%';
    }
    if (dayPercentage[30] != 'N/A') {
      dayPercentage[30] =
        dayPercentage[30] > 0
          ? '+' + dayPercentage[30] + '%'
          : dayPercentage[30] + '%';
    }
    if (dayPercentage[90] != 'N/A') {
      dayPercentage[90] =
        dayPercentage[90] > 0
          ? '+' + dayPercentage[90] + '%'
          : dayPercentage[90] + '%';
    }
    return dayPercentage;
  };
  return (
    <div className='total_balance'>
      <div className='total_balance_content'>
        <h4>Total Balance</h4>
        <div className='total_balance_body'>
          <div className='total_balance_amount'>
            <h2>{`${smartFormatter(total_balance, 3, 0)}`}</h2>
            <p
              className={`${totalDayGains >= 0 ? 'textPurple' : 'percentRed'}`}
              // Math.abs is there to make the number output as positive, while keeping the actual value true
              // smartFormatter is a custom function that formats based on my needs
            >{`${totalDayGains >= 0 ? '+ ' : '- '}(${smartFormatter(
              Math.abs(totalDayGains),
              5,
              0,
              false
            )})`}</p>
          </div>
          <div className='total_balance_days'>
            <div className='total_balance_days_columns'>
              <p>7D</p>
              <h3>{getDayPercentage()[7]}</h3>
            </div>
            <div className='total_balance_days_columns'>
              <p>1M</p>
              <h3>{getDayPercentage()[30]}</h3>
            </div>
            <div className='total_balance_days_columns'>
              <p>3M</p>
              <h3>{getDayPercentage()[90]}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TotalBalanceCard;
