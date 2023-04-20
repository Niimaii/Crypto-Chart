import React from 'react';

function Portfolio() {
  return (
    <div className='flex justify-center'>
      <div className='balance_display'>
        <p>Total Balance</p>
        <p>
          $42,500 <span>+(500)</span>
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

export default Portfolio;
