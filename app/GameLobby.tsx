import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { subscribeToGameState } from '../context/gameStateListener';
import { sendPlayerAction } from '../utils/apiServices';
import { MainState ,GameScreenParams} from './types';
import './helpers';
import { isLobbyHost } from './helpers';


const GameLobby: React.FC<GameScreenParams> = ({gameId, lobbyCode, mainState }) => {
  const { user } = useAuth();
  const router = useRouter();
  console.log('GameLobby:', mainState);
  console.log('User:', user);
  
  const startGame = async () => {
    if (!mainState || !user) {
      return;
    }
    const isUserLobbyHost = isLobbyHost(mainState, user?.uid);

    if (!isUserLobbyHost) {
      Alert.alert('Error', 'Only the lobby creator can start the game.');
      return;
    }
    try {
      const actionPayload = {
        playerId: user.uid,
        gameId: mainState.gameId,
        action: { type: 'lobbyStart', details: {} },
      };
      await sendPlayerAction(actionPayload);
    } catch (error) {
      console.error('Error starting game:', error);
      Alert.alert('Error', 'Unable to start the game.');
    }
  };


  if (!mainState || !user) {
    return <Text>Loading lobby...</Text>;
  }


  return (
    <View>
      <Text>Game Lobby</Text>
      <Text>Lobby Code: {mainState.lobbyCode}</Text>
      <Text>Game ID: {mainState.gameId}</Text>
      <Text>Creator: {mainState.gameId}</Text>
      <Text>Players:</Text>
      <FlatList
        data={mainState.participants || []}
        renderItem={({ item }) => (
          <Text>
            {item} - {item ? 'Ready' : 'Not Ready'}
          </Text>
        )}
      />
      {/* <TouchableOpacity onPress={toggleReadyStatus}>
        <Text>
          {gameState.participants?.find((p: any) => p.playerId === user?.uid)?.ready
            ? 'Unready'
            : 'Ready'}
        </Text>
      </TouchableOpacity> */}
      {mainState.gameId === user?.uid && (
        <TouchableOpacity onPress={startGame}>
          <Text>Start Game</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default GameLobby;