/**
 * Context API is a way to share data between components without having to pass props down manually at every level. so if its wrapped
 * in the AuthProvider, all the children components will have access to the user object.
 * 
 * This file is responsible for creating the AuthContext and AuthProvider.
 * it passes the user object to the AuthContext.Provider. that is used to pass the user object to the children components.
 * Listens to the onAuthStateChanged event to update the user object when the user logs in or logs out and 
 * it will automatically update the user object in the context.
*/

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '../firebaseConfig'; 
import { onAuthStateChanged, User } from 'firebase/auth';

export const AuthContext = createContext<User | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
};