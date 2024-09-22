/**This component is responsible for handling the login process. 
first checks the context from the AuthContext to see if a user is logged in.
If the user is not logged in, it will display a button to sign in as a guest.
If the user is logged in, it will display a welcome message with the user ID.

useContext is used to access the AuthContext, and the signInAnonymously function is used to sign in as a guest.

*/

import React, { useContext } from 'react';
import { View, Text, Button, ActivityIndicator, Pressable } from 'react-native';
import { AuthContext } from '../context/AuthContext'; // Import the context
import { signInAnonymously } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Firebase config for authentication

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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

 if (!user) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>No user logged in</Text>
      <Pressable
        onPress={() => {
          console.log('pressed');
          signInAnonymouslyHandler(); // Call the sign-in handler here
        }}
      >
        <Text style={{ fontSize: 18, color: 'blue' }}>Sign in as guest</Text>
      </Pressable>
    </View>
  );
}

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18 }}>Welcome, User ID: {user.uid}</Text>
    </View>
  );
};

export default Login;