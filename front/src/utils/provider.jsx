import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
const AccessContext = createContext();


export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState('');

  const updateAccessToken = (newToken) => {
    setAccessToken(newToken);
  };

  return (
    <AuthContext.Provider value={{ accessToken, updateAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};


export const Access = ( { children }) => {
  const {accessToken} = useAuth();
  const protectRoute = accessToken;
  return (
    <AccessContext.Provider value={{ protectRoute }}>
    {children}
  </AccessContext.Provider>
  )
}