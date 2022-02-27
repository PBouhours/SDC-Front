import React, { createContext, useState } from 'react';

export const LoginContext = createContext(null);

// eslint-disable-next-line react/prop-types
function LoginUserContext({ children }) {
  const [loginStatus, updateLoginStatus] = useState('');

  return (
    <LoginContext.Provider
      value={{
        loginStatus,
        updateLoginStatus
      }}>
      {children}
    </LoginContext.Provider>
  );
}
export default LoginUserContext;
