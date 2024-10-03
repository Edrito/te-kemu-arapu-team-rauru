import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { subscribeToGameState } from '../context/gameStateListener';
import { sendPlayerAction } from '../utils/apiServices';

export default function GameLobby() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { lobbyCode } = params as { lobbyCode: string };
  const [gameState, setGameState] = useState<any>(null);

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

  const toggleReadyStatus = async () => {
    if (!gameState || !user) {
      return;
    }
    try {
      const actionPayload = {
        playerId: user.uid,
        gameId: gameState.gameId, // Get gameId from gameState
        action: { type: 'lobbyToggleReady', details: {} },
      };
      await sendPlayerAction(actionPayload);
    } catch (error) {
      console.error('Error toggling ready status:', error);
      Alert.alert('Error', 'Unable to change ready status.');
    }
  };

  const startGame = async () => {
    if (!gameState || !user) {
      return;
    }
    if (gameState.creatorId !== user.uid) {
      Alert.alert('Error', 'Only the lobby creator can start the game.');
      return;
    }
    try {
      const actionPayload = {
        playerId: user.uid,
        gameId: gameState.gameId,
        action: { type: 'lobbyStart', details: {} },
      };
      await sendPlayerAction(actionPayload);
    } catch (error) {
      console.error('Error starting game:', error);
      Alert.alert('Error', 'Unable to start the game.');
    }
  };

  if (!gameState) {
    return <Text>Loading lobby...</Text>;
  }

  return (
    <View>
      <Text>Game Lobby</Text>
      <Text>Lobby Code: {gameState.lobbyCode}</Text>
      <Text>Game ID: {gameState.gameId}</Text>
      <Text>Creator: {gameState.creatorId}</Text>
      <Text>Players:</Text>
      <FlatList
        data={gameState.participants || []}
        keyExtractor={(item) => item.playerId}
        renderItem={({ item }) => (
          <Text>
            {item.username} - {item.ready ? 'Ready' : 'Not Ready'}
          </Text>
        )}
      />
      <TouchableOpacity onPress={toggleReadyStatus}>
        <Text>
          {gameState.participants?.find((p: any) => p.playerId === user?.uid)?.ready
            ? 'Unready'
            : 'Ready'}
        </Text>
      </TouchableOpacity>
      {gameState.creatorId === user?.uid && (
        <TouchableOpacity onPress={startGame}>
          <Text>Start Game</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}