import React, { useState, createContext } from 'react';

export const CryptoContext = createContext();

export const CryptoContextProvider = (props) => {
  const localAuth = localStorage.getItem('localAuth');
  const [auth, setAuth] = useState(false);

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

  return (
    <CryptoContext.Provider
      value={{
        isAuth,
        authenticateUser,
        unAuthenticateUser,
      }}
    >
      {props.children}
    </CryptoContext.Provider>
  );
};
