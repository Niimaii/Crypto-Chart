import { useQuery } from '@tanstack/react-query';
import React, { useState, createContext } from 'react';
import { getMarket, getPortfolio } from '../api/cryptoAPI';

export const CryptoContext = createContext();

export const CryptoContextProvider = (props) => {
  const localAuth = localStorage.getItem('localAuth');
  const [auth, setAuth] = useState(false);
  const [days, setDays] = useState(1);
  const [buyCard, setBuyCard] = useState(false);

  const portfolio = useQuery({
    queryKey: ['portfolio'],
    queryFn: getPortfolio,
    staleTime: 1000 * 60 * 3,
    refetchInterval: 1000 * 60 * 30,
  });

  const market = useQuery({
    queryKey: ['market'],
    queryFn: getMarket,
    staleTime: 1000 * 60 * 3,
    refetchInterval: 1000 * 60 * 3,
  });

  const isAuth = () => {
    if (localAuth || auth) {
      return true;
    }
    return false;
  };

  const authenticateUser = () => {
    setAuth(true);
  };
  const unAuthenticateUser = () => {
    setAuth(false);
  };

  const openBuyCard = () => {
    console.log('context ran');

    setBuyCard(true);
  };

  const closeBuyCard = () => {
    setBuyCard(false);
  };

  return (
    <CryptoContext.Provider
      value={{
        isAuth,
        authenticateUser,
        unAuthenticateUser,
        days,
        setDays,
        buyCard,
        openBuyCard,
        closeBuyCard,
        market,
        portfolio,
      }}
    >
      {props.children}
    </CryptoContext.Provider>
  );
};
