import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState,
} from 'react';
import {User, getAuth} from "firebase/auth";

interface Props {
  children: React.ReactNode;
}

interface TokenContextProps {
  token: User | null,
  setToken: Dispatch<SetStateAction<User | null>>,
}

export const TokenContext = createContext<TokenContextProps | null>(null);

export const TokenProvider = ({ children }: Props) => {

  const auth = getAuth();
  const [token, setToken] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setToken(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

/* Usage
  const { token, setToken } = useToken();
*/
export const useToken = () => {

  const context = useContext(TokenContext);
  if (context === null) {
    throw new Error('useToken must be used within TokenProvider');
  }
  return context;
};

export default useToken;