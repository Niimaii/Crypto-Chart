import React, { useState } from 'react';
import { CloseIcon } from '../icons/icons';

function BuyCard() {
  const [display, setDisplay] = useState(true);
  const [amount, setAmount] = useState(0);

  const buyCoin = () => {};

  return (
    <div className={`buy_card absolute ${display ? 'block' : 'hidden'}`}>
      <div className='flex justify-center mt-32'>
        <div className='card'>
          <div className='flex'>
            <div className=''>
              <button>Buy</button>
              <button>Sell</button>
            </div>
            <CloseIcon />
          </div>
          <div>
            <input
              onChange={(e) => {
                setAmount(e.target.value);
              }}
              type='number'
              min={0}
              max={1000000}
              value={amount}
            />
            <button onClick={buyCoin}>Purchase</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyCard;
