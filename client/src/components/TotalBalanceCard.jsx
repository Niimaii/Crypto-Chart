import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { smartFormatter } from '../utils/Formatter';

function TotalBalanceCard() {
  const queryClient = useQueryClient();
  const { data } = queryClient.getQueryData(['portfolio']);
  const differenceData = queryClient.getQueryData(['difference']);
  const userDif = differenceData.data;
  const totalDayGains = userDif[1]?.netDayGain
    ? userDif[1]?.netDayGain.toFixed(0)
    : 0;
  const portfolio = data.total_balance;
  const total_balance = portfolio.total.toFixed(2);

  console.log(userDif);

  /* Check to see if 'userDif[x]' is valid and contains that days  
  percent changes. If so then make it look like a typical percent 
  symbol (i.e -20%). Else return 'N/A'.
  */
  const getDayPercentage = () => {
    const dayPercentage = {
      7: {
        result: userDif[7]?.percentDifference?.toFixed(2) ?? 'N/A',
        greaterThanZero: userDif[7]?.percentDifference > 0 ? true : false,
      },
      30: {
        result: userDif[30]?.percentDifference?.toFixed(2) ?? 'N/A',
        greaterThanZero: userDif[30]?.percentDifference > 0 ? true : false,
      },
      90: {
        result: userDif[90]?.percentDifference?.toFixed(2) ?? 'N/A',
        greaterThanZero: userDif[90]?.percentDifference > 0 ? true : false,
      },
    };

    if (dayPercentage[7].result != 'N/A') {
      dayPercentage[7].result =
        dayPercentage[7].result > 0
          ? '+' + dayPercentage[7].result + '%'
          : dayPercentage[7].result + '%';
    }
    if (dayPercentage[30].result != 'N/A') {
      dayPercentage[30].result =
        dayPercentage[30].result > 0
          ? '+' + dayPercentage[30].result + '%'
          : dayPercentage[30].result + '%';
    }
    if (dayPercentage[90].result != 'N/A') {
      dayPercentage[90].result =
        dayPercentage[90].result > 0
          ? '+' + dayPercentage[90].result + '%'
          : dayPercentage[90].result + '%';
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
              <h3
                className={`${
                  getDayPercentage()[7].greaterThanZero
                    ? 'money_green'
                    : 'percentRed'
                }`}
              >
                {getDayPercentage()[7].result}
              </h3>
            </div>
            <div className='total_balance_days_columns'>
              <p>1M</p>
              <h3
                className={`${
                  getDayPercentage()[30].greaterThanZero
                    ? 'money_green'
                    : 'percentRed'
                }`}
              >
                {getDayPercentage()[30].result}
              </h3>
            </div>
            <div className='total_balance_days_columns'>
              <p>3M</p>
              <h3
                className={`${
                  getDayPercentage()[90].greaterThanZero
                    ? 'money_green'
                    : 'percentRed'
                }`}
              >
                {getDayPercentage()[90].result}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TotalBalanceCard;
