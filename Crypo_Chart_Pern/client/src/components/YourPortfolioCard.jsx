import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

function YourPortfolioCard() {
  const queryClient = useQueryClient();
  const { data } = queryClient.getQueryData(['portfolio']);
  const marketData = queryClient.getQueryData(['market']);

  const market = marketData;
  const portfolio = data.investments;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  console.log(market);

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
      const coinMarket = market.find(
        (coin) => coin.crypto_id === investment.coin
      );
      const currentInvestment =
        investment.crypto_total * coinMarket.current_price;

      // const current = investment.coin_value *
      acc[investment.coin] = acc[investment.coin] || {
        coin: investment.coin,
        name: investment.name,
        current: 0,
        invested: 0,
        symbol: investment.symbol,
        crypto_total: 0,
        coin_value: investment.coin_value,
        image: investment.image,
      };

      acc[investment.coin].invested += invested;
      acc[investment.coin].crypto_total += investment.crypto_total;
      acc[investment.coin].current += currentInvestment;

      return acc;
    }, {})
  ).sort((a, b) => b.invested - a.invested);

  const formatCryptoValue = (number) => {
    if (Math.abs(number) >= 1) {
      const suffixes = ['', 'K', 'M', 'B', 'T'];
      const suffixIndex = Math.floor(Math.log10(Math.abs(number)) / 3);
      const shortNumber = (number / Math.pow(1000, suffixIndex)).toFixed(2);
      return shortNumber + suffixes[suffixIndex];
    }

    return number.toFixed(3);
  };

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
              <p>{formatCryptoValue(investment.current)}</p>
              <p>{formatter.format(investment.invested)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default YourPortfolioCard;
