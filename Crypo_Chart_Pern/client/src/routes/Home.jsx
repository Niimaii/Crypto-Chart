import React, { useContext, useEffect, useState } from 'react';
import { CryptoContext } from '../context/CryptoContext';

function Home() {
  const { test, setTest } = useContext(CryptoContext);
  return <div>Home</div>;
}

export default Home;
