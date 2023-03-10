import React, { useContext } from 'react';
import { CryptoContext } from '../context/CryptoContext';

function UserHome() {
  const { isAuth } = useContext(CryptoContext);
  console.log(isAuth);
  return <div>UserHome</div>;
}

export default UserHome;
