import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, signInAnonymously, signOut, User } from 'firebase/auth';
import { auth, firestore } from '../firebaseConfig';
import { getDocs, query, collection, where } from 'firebase/firestore';
import { router } from "expo-router";

interface Profile {
  userId: string;
  username: string;
  icon: string;
  difficulty: string;
}

const AuthContext = createContext<{
  user: User | null;
  userProfile: Profile | null;
  setUserProfile: (profile: Profile | null) => void;
  signOutUser: () => void;
}>({
  user: null,
  userProfile: null,
  setUserProfile: () => {},
  signOutUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setProfile] = useState<Profile | null>(null);

  const setUserProfile = (profile: Profile | null) => {
    setProfile(profile);
  };

  const checkUserProfile = async (userId: string) => {
    try {
      const queryWithUid = query(collection(firestore, "profile"), where("userId", "==", userId));
      const userSnapshot = await getDocs(queryWithUid);
      
      if (!userSnapshot.empty) {
        setProfile(userSnapshot.docs[0].data() as Profile);
      } else {
        console.error("User profile not found");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (isMounted) {
        if (firebaseUser) {
          setUser(firebaseUser);
          await checkUserProfile(firebaseUser.uid);
        } else {
          try {
            const userCredential = await signInAnonymously(auth);
            if (isMounted) {
              setUser(userCredential.user);
            }
          } catch (error) {
            console.error("Error during anonymous sign-in:", error);
          }
        }
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out successfully');
        setUser(null);
        setProfile(null);
        router.push('/');
      })
      .catch(console.error);
  };

  const contextValue = useMemo(() => ({
    user,
    signOutUser,
    userProfile,
    setUserProfile,
  }), [user, userProfile]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};