import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

function YourPortfolioCard() {
  const queryClient = useQueryClient();
  const { data } = queryClient.getQueryData(['portfolio']);
  const portfolio = data.investments;

  return (
    <div className='flex flex-col justify-center'>
      <h1>Your Portfolio</h1>
      <div></div>
    </div>
  );
}

export default YourPortfolioCard;
