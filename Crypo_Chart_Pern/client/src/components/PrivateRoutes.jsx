import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { CryptoContext } from '../context/CryptoContext';

function PrivateRoutes() {
  const { isAuth } = useContext(CryptoContext);
  return <>{isAuth ? <Outlet /> : <Navigate to='/' />}</>;
}

export default PrivateRoutes;
