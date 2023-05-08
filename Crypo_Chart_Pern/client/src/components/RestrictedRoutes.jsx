import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { CryptoContext } from '../context/CryptoContext';

function RestrictedRoutes() {
  const { isAuth } = useContext(CryptoContext);

  return <>{!isAuth() ? <Outlet /> : <Navigate to='/userhome' />}</>;
}

export default RestrictedRoutes;
