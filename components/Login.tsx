/**This component is responsible for handling the login process. 
first checks the context from the AuthContext to see if a user is logged in.
If the user is not logged in, it will display a button to sign in as a guest.
If the user is logged in, it will display a welcome message with the user ID.

useContext is used to access the AuthContext, and the signInAnonymously function is used to sign in as a guest.

*/
import React, { useContext } from 'react';
import { View, Text, ActivityIndicator, Pressable } from 'react-native';
import { AuthContext } from '../context/AuthContext'; // Import the context
import { signInAnonymously } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import "../global.css"

const Login: React.FC = () => {
  const user = useContext(AuthContext);

  const signInAnonymouslyHandler = async () => {
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error('Error during anonymous sign-in:', error);
    }
  };

  if (user === undefined) {
    return (
      <View className="flex-1 justify-center items-center bg-primary_red">
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center bg-primary_red">
        <Text className="text-xl mb-5 text-white">No user logged in</Text>
        <Pressable onPress={signInAnonymouslyHandler}>
          <Text className="text-xl text-blue-300">Sign in as guest</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-4xl text-primary_yellow">
        Welcome, User ID: {user.uid}
      </Text>
    </View>
  );
};

export default Login;