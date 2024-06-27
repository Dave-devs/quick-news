import { auth } from '@/config/firebaseConfig';
import { User, onAuthStateChanged } from 'firebase/auth';
import React, { useState, useEffect, createContext, PropsWithChildren, useContext } from 'react';

interface AuthProps {
  user?: any;
  initialized?: boolean;
}

export const AuthContext = createContext<AuthProps>({});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>();
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('AUTHENTICATED: ', user && user.email);
      setUser(user);
      setInitialized(true);
    });
  }, []);

  const value = {
    user,
    initialized,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};