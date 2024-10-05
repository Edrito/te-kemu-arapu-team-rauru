import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export const useLobbyNavigation = (lobbyCode: string) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    } else if (!lobbyCode.trim()) {
      console.error('Invalid lobby code');
    }
  }, [user, lobbyCode]);
};