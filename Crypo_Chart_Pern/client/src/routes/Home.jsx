import React, { useContext, useState } from 'react';
import { CryptoContext } from '../context/CryptoContext';

function Home() {
  const { test, setTest } = useContext(CryptoContext);
  console.log(test);
  return <div>Home</div>;
}

export default Home;
