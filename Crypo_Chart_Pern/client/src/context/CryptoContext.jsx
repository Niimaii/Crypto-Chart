import React, { useState, createContext } from 'react';

export const CryptoContext = createContext();

export const CryptoContextProvider = (props) => {
  const [isAuth, setIsAuth] = useState(true);

  const authenticateUser = () => {
    setIsAuth(true);
  };
  const unAuthenticateUser = () => {
    setIsAuth(false);
  };

  return (
    <CryptoContext.Provider
      value={{
        isAuth,
        setIsAuth,
        authenticateUser,
        unAuthenticateUser,
      }}
    >
      {props.children}
    </CryptoContext.Provider>
  );
};
