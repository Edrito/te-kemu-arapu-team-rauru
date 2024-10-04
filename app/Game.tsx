import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { subscribeToGameState } from '../context/gameStateListener';
import { sendPlayerAction } from '../utils/apiServices';
import './helpers';
import { getCurrentGameType, isLobbyHost } from './helpers';
import { MainState } from './types';
import GameLobby from './GameLobby';
import Loading from './loading';
import Scoreboard from '../components/Scoreboard';
import CategorySelect from './(category)/choosingCategory';
import SelectLetter from './(category)/selectLetter';
import { SafeAreaView } from 'react-native-safe-area-context';
import GameBar from '../components/GameBar';


export default function Game() {

  const { user } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { lobbyCode } = params as { lobbyCode: string };
  const [mainState, setGameState] = useState<MainState | null>(null); // Initialize with null

  console.log('GameLobby:', mainState);
  console.log('User:', user);

  useEffect(() => {
    if (!user || !lobbyCode) {
      router.push('/');
      return;
    }

    const unsubscribe = subscribeToGameState(
      lobbyCode,
      (gameState) => {
        console.log('New gameState:', gameState); // Debugging statement
        setGameState(gameState);
      },
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


  const buildPageContent = () => {


    var lobbyOpen = mainState?.isLobbyOpen;

    if (lobbyOpen) {
      return <GameLobby gameId={mainState.gameId} lobbyCode={lobbyCode} mainState={mainState}
      />
    }


    var phase = mainState.state.phase;
    var gamePhase = mainState.state.gameState.phase;
    var gameType = getCurrentGameType(mainState);
    console.log('Game Type:', gameType);
    console.log('Game Phase:', gamePhase);
    console.log('Phase:', phase);

    const manageCategory = async () => {
      switch (gamePhase) {
        case 'choosingCategory':
          return <CategorySelect gameId={mainState.gameId} lobbyCode={lobbyCode} mainState={mainState} />;
        case 'choosingPlayer':
          return <Loading />;
        case 'letterSelection':
          return <SelectLetter gameId={mainState.gameId} lobbyCode={lobbyCode} mainState={mainState} />;

      }
    }


    const manageGame = async () => {
      switch (gameType) {
        case "category":
          manageCategory();
        case "random":

      }
    }

    switch (phase) {
      case 'loading':
        console.log('Loading');
        return <Loading />;
      case 'end':
        return <Scoreboard players={mainState.state.scores} />;
      case 'endLobby':
        return <Scoreboard players={mainState.state.scores} />;

      case 'playing':
        manageGame();

      default:
        return (
          <View>
            
          </View>
        );
    }


  }



  return (
    <SafeAreaView className="flex-1 bg-primary_red">
      <View className="w-full">
        <GameBar gameId={mainState?.gameId ?? ''} lobbyCode={lobbyCode} mainState={mainState} />
      </View>
      {buildPageContent()};
    </SafeAreaView>
  )

}

