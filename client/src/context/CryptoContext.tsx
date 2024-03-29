import { useQuery } from '@tanstack/react-query';
import React, { useState, createContext } from 'react';
import {
  calculateDifference,
  getCurrency,
  getMarket,
  getPortfolio,
} from '../api/cryptoAPI';

export const CryptoContext = createContext();

export const CryptoContextProvider = (props) => {
  const localAuth = localStorage.getItem('localAuth');
  const [auth, setAuth] = useState(false);
  const [days, setDays] = useState(1);
  const [buyCard, setBuyCard] = useState(false);
  const [buyCardCoin, setBuyCardCoin] = useState('bitcoin');

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

  // Need isAuth() so that it doesn't error when user isn't logged in
  const portfolio = useQuery({
    queryKey: ['portfolio'],
    queryFn: getPortfolio,
    staleTime: 1000 * 60 * 3,
    refetchInterval: 1000 * 60 * 30,
    enabled: isAuth(),
  });
  const currency = useQuery({
    queryKey: ['currency'],
    queryFn: getCurrency,
    staleTime: 1000 * 60 * 3,
    refetchInterval: 1000 * 60 * 3,
    enabled: isAuth(),
  });
  const difference = useQuery({
    queryKey: ['difference'],
    queryFn: () => calculateDifference(market.data),
    staleTime: 1000 * 60 * 3,
    refetchInterval: 1000 * 60 * 3,
    enabled: isAuth() && market.isSuccess,
  });

  const authenticateUser = () => {
    setAuth(true);
  };
  const unAuthenticateUser = () => {
    setAuth(false);
  };

  const openBuyCard = (coin) => {
    setBuyCard(true);
    setBuyCardCoin(coin);
  };

  const closeBuyCard = () => {
    setBuyCard(false);
    setBuyCardCoin('bitcoin');
  };

  const changeBuyCoin = (coin) => {
    setBuyCardCoin(coin);
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
        buyCardCoin,
        changeBuyCoin,
        openBuyCard,
        closeBuyCard,
        market,
        portfolio,
        currency,
        difference,
      }}
    >
      {props.children}
    </CryptoContext.Provider>
  );
};
