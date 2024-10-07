import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export const useProfileNavigation = () => {
  const { user, userProfile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    } else if (user && userProfile === null) {
      // Profile is still loading
    } else if (user && !userProfile) {
      // No profile found
      router.push('/profile');
    }
  }, [user, userProfile]);
};