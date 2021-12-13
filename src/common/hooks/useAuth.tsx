import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState,
} from 'react';
import {User, getAuth, signOut} from "firebase/auth";

interface Props {
  children: React.ReactNode;
}

interface TokenContextProps {
  token: User | null,
  setToken: Dispatch<SetStateAction<User | null>>,
  logout: () => void,
}

export const TokenContext = createContext<TokenContextProps | null>(null);

export const TokenProvider = ({ children }: Props) => {

  const auth = getAuth();

  const [token, setToken] = useState<User | null>(null);

  const logout = async () => {
    return await signOut(auth); // removes token object
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setToken(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken, logout }}>
      {children}
    </TokenContext.Provider>
  );
};

/* Usage
  const { token, setToken, logout } = useToken();
*/
export const useToken = () => {

  const context = useContext(TokenContext);
  if (context === null) {
    throw new Error('Error: useToken must be used within TokenProvider');
  }
  return context;
};

export default useToken;