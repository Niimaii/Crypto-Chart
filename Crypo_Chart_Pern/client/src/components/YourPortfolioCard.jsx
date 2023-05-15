import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

function YourPortfolioCard() {
  const queryClient = useQueryClient();
  const { data } = queryClient.getQueryData(['portfolio']);
  const portfolio = data.investments;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  /*   
  High Level: Consolidate the portfolio investments and add the investments up

  Low Level: Take 'portfolio' (an array of objects) and consolidate all the elements
  in 'portfolio' if they share the same crypto coin name. Do this with reduce, which will
  return an Object with keys named after the consolidated coin names. Those keys values
  are equal to an Object with all the relevant coin data. Then take the Object we returned
  with the reduce method and use Object.values() to turn that returned Object into an 
  array of values (based on the returned Object keys).

  Reasoning: This is done so we can easily map over the data when displaying the information
  */
  const investmentsOrganized = Object.values(
    portfolio.reduce((acc, investment) => {
      const invested = investment.crypto_total * investment.coin_value;
      acc[investment.coin] = acc[investment.coin] || {
        coin: investment.coin,
        name: investment.name,
        invested: 0,
        symbol: investment.symbol,
        crypto_total: investment.crypto_total,
        coin_value: investment.coin_value,
        image: investment.image,
      };

      acc[investment.coin].invested += invested;

      return acc;
    }, {})
  );

  return (
    <div className='flex flex-col justify-center'>
      <h1>Your Portfolio</h1>
      <div>
        {investmentsOrganized.map((investment) => {
          return (
            <div key={investment.coin} className='flex gap-4 items-center'>
              <div className='flex gap-3'>
                <img className='h-10 w-10' src={investment.image} alt='' />
                <div>
                  <p>{investment.symbol}</p>
                  <p>{investment.name}</p>
                </div>
              </div>
              <p>{formatter.format(investment.crypto_total)}</p>
              <p>{formatter.format(investment.invested)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default YourPortfolioCard;
