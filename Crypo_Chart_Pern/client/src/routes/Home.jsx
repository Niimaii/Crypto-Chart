import React, { useContext, useEffect, useState } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import SmallChart from '../components/SmallChart';

function Home() {
  const { test, setTest } = useContext(CryptoContext);

  console.log();
  return (
    <div>
      <h1>Home</h1>

      <SmallChart />
    </div>
  );
}

export default Home;
