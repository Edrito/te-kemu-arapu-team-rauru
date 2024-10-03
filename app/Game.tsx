import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { subscribeToGameState } from '../context/gameStateListener';
import { sendPlayerAction } from '../utils/apiServices';
import './helpers';
import { isLobbyHost } from './helpers';
import { MainState } from './types';
import GameLobby from './GameLobby';
import Loading from './loading';

export const Game = () => {
  const { user } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { lobbyCode } = params as { lobbyCode: string };
  const [mainState, setGameState] = useState<MainState | null>();
  console.log('GameLobby:', mainState);
  console.log('User:', user);

  useEffect(() => {
    if (!user || !lobbyCode) {
      router.push('/');
      return;
    }

    const unsubscribe = subscribeToGameState(
      lobbyCode,
      (gameState) => setGameState(gameState),
      (error) => {
        console.error('Error subscribing to game state:', error);
        Alert.alert('Error', 'Unable to load game lobby.');
      }
    );

    return () => unsubscribe();
  }, [user, lobbyCode]);



  if (!mainState || !user) {
    return <Loading />;
  }

  var lobbyOpen = mainState?.isLobbyOpen;


  if (lobbyOpen) {
    return <GameLobby gameId={mainState.gameId} lobbyCode={lobbyCode} mainState={mainState}
    />
  }


  return (
    <View>
      <Text>Game Management</Text>

    </View>
  );
}