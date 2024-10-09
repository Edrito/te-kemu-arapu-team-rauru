import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getCurrentGameType } from '../helpers';
import GameBar from '../../components/GameBar';
import GameLobby from '../(intermediary)/GameLobby';
import Loading from '../(intermediary)/Loading';
import Scoreboard from '../../components/Scoreboard';
import CategorySelect from '../(category)/choosingCategory';
import SelectLetter from '../(category)/selectLetter';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLobbyNavigation } from '../../hooks/useLobbynav';
import { useGame } from '../../context/GameContext';
import ChoosingPlayer from '../(intermediary)/ChoosingPlayer';
import VotingPage from '../(category)/voting';
import { ProfileData } from '../types';

export default function Game() {
  const { user } = useAuth();
  const { gameState, subscribeToGame , unsubscribeFromGame, fetchPlayerProfiles} = useGame();
  const { lobbyCode } = useLocalSearchParams() as { lobbyCode: string };
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
  const router = useRouter();
  const [playerProfiles, setPlayerProfiles] = useState<ProfileData[]>([]);
  const [previousParticipants, setParticipants] = useState<string[]>([]);

  useLobbyNavigation(lobbyCode);

  useEffect(() => {
    console.log("here1");
    if (!gameState)
    {
      setParticipants([]);
    }
    console.log("here2");

    if (gameState && previousParticipants!==gameState.participants)
    {
    console.log("here3");
    var removedParticipants = previousParticipants.filter(x => !gameState.participants.includes(x));
      var addedParticipants = gameState.participants.filter(x => !previousParticipants.includes(x));
      
      setParticipants(gameState.participants);

      fetchPlayerProfiles(addedParticipants).then((profiles) => {
        
        setPlayerProfiles([
          //Remove the removed participants from the list
          ...playerProfiles.filter(x => !removedParticipants.includes(x.userId)),
          //Add the new participants to the list
          ...profiles
        ]);
      });
    }
    
  }, [user, lobbyCode]);

  console.log(playerProfiles);
  
  useEffect(() => {
    if (!user || !lobbyCode) {
      router.push('/');
      return;
    }
    
    subscribeToGame(lobbyCode);
  }, [user, lobbyCode]);

  useEffect(() => {
    if (gameState && user && !isInitialLoadComplete) {
      setIsInitialLoadComplete(true);
    }
  }, [gameState, user]);

  //If the lobby is closed after once having existed, redirect to the main page
  useEffect(() => {
    if (isInitialLoadComplete && !gameState) {
    router.push('/MainPage');
    }
  }, [gameState, isInitialLoadComplete]);


  if (!gameState || !user) {
    return <Loading />;
  }



  const buildPageContent = () => {
    if (gameState.isLobbyOpen) {
      return <GameLobby 
      gameId={gameState.gameId}
      lobbyCode={lobbyCode}
    playerProfiles={playerProfiles}

      mainState={gameState}
      />;
    }

    if (!isInitialLoadComplete) return <Loading />;

    const phase = gameState.state.phase;
    const gamePhase = gameState.state.gameState?.phase || '';
    const gameType = getCurrentGameType(gameState);

    const manageCategory = () => {
      switch (gamePhase) {
        case 'choosingCategory':
          return (
            <CategorySelect
              gameId={gameState.gameId}
              lobbyCode={lobbyCode}
            playerProfiles={playerProfiles}

              mainState={gameState}
            />
          );
        case 'choosingPlayer':
          setTimeout(() => { }, 3000);
          return <ChoosingPlayer 
          gameId={gameState.gameId}
          lobbyCode={lobbyCode}
          playerProfiles={playerProfiles}

          mainState={gameState}
          />;
        case 'letterSelection':
          return (
            <SelectLetter
              gameId={gameState.gameId}
              lobbyCode={lobbyCode}
            playerProfiles={playerProfiles}

              mainState={gameState}
            />
          );

          case 'voting':
            return (
              <VotingPage
                gameId={gameState.gameId}
                lobbyCode={lobbyCode}
                mainState={gameState}
            playerProfiles={playerProfiles}

              />
            );
            return 
        default:
          return <Text>Unknown game phase</Text>;
      }
    };

    const manageGame = () => {
      switch (gameType) {
        case 'category':
          return manageCategory();
        case 'random':
          return <Text>Random game type not implemented yet</Text>;
        default:
          return <Text>Unknown game type</Text>;
      }
    };

    switch (phase) {
      case 'loading':
        return <Loading />;
      case 'end':
      case 'lobbyEnd':
        return <Scoreboard playerScores={gameState.state.scores}
        playerProfiles={playerProfiles}
        
        />;
      case 'playing':
        return manageGame();
      default:
        if (gameState) {
          return <Text>Unknown phase: {gameState.state.phase}</Text>;
        }
        return <Text>Unknown phase</Text>;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary_red">
      <View className="w-full">
        {gameState && (
          <GameBar
            gameId={gameState.gameId}
            lobbyCode={gameState.lobbyCode}
            mainState={gameState}
            playerProfiles={playerProfiles}
          />
        )}
      </View>
      {buildPageContent()}
    </SafeAreaView>
  );
}