import React, { useState, createContext } from 'react';

export const CryptoContext = createContext();

export const CryptoContextProvider = (props) => {
  const localAuth = localStorage.getItem('localAuth');
  const [auth, setAuth] = useState(false);
  const [days, setDays] = useState(1);
  const [buyCard, setBuyCard] = useState(false);

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
      }}
    >
      {props.children}
    </CryptoContext.Provider>
  );
};
