import React, { useState, createContext } from 'react';

export const CryptoContext = createContext();

export const CryptoContextProvider = (props) => {
  const [test, setTest] = useState('test');

  return (
    <CryptoContext.Provider
      value={{
        test,
        setTest,
      }}
    >
      {props.children}
    </CryptoContext.Provider>
  );
};
