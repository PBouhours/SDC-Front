import React, { createContext, useState } from 'react';

export const TokenContext = createContext(null);

// eslint-disable-next-line react/prop-types
function TokenContextProvider({ children }) {
  const [tokenStatus, updateTokenStatus] = useState('');

  return (
    <TokenContext.Provider
      value={{
        tokenStatus,
        updateTokenStatus
      }}>
      {children}
    </TokenContext.Provider>
  );
}
export default TokenContextProvider;
