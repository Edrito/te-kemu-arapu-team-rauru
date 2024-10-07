import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";
import React from "react";
import GameLettersGrid from "te-kemu-arapu-compx374-team-rauru/components/GameLettersGrid";
import "../../global.css";
import GameBar from "te-kemu-arapu-compx374-team-rauru/components/GameBar";
import { GameScreenParams } from "../types";
import { getTimeRemaining } from "../helpers";
import { useGame } from "te-kemu-arapu-compx374-team-rauru/context/GameContext";

const SelectLetter: React.FC<GameScreenParams> = ({ gameId, lobbyCode, mainState }) => {
  // Path to test player icon

  const selectedCategory = mainState.state.gameState.currentCategory;
  const timeRemaining = getTimeRemaining(mainState, true);
  const gameContext = useGame();
  const [hasPassed, setHasPassed] = React.useState(false);
  const [isRandom, setIsRandom] = React.useState(false);

  return (
    <SafeAreaView className="flex-1 bg-primary_red">
      {/* This view holds the header bar */}


      <View className="w-full items-center justify-center mt-3">
        <Text className="text-[40px] text-white font-pangolin">
          Category: {selectedCategory}
        </Text>
      </View>

      <ScrollView className="w-full mt-5 items-center">
        {/* This view holds the letters */}
        <View className="flex-wrap flex-row justify-center">
          <GameLettersGrid
            selectedLetters={mainState.state.gameState.lettersCovered ?? []}
            
            selectLetter= {() => {
           
              setHasPassed(false);
              setIsRandom(false);
            }}
            
          />
        </View>

        <View className="w-full items-center justify-center m-5">
          <Pressable className="border-2 border-dashed bg-green-700 items-center justify-center p-3 w-[40%]"
            onPress={() =>{
              gameContext.selectLetter("random");
              setHasPassed(false);
              setIsRandom(true);
            }
            }
          >
            <Text className="text-[40px] text-white">{isRandom? "✅": "RANDOM" }</Text>
          </Pressable>
        </View>
      </ScrollView>

      <View className="w-full items-center justify-center">
        <Text className="text-[40px] text-center text-white font-pangolin">
          It's your turn to select a letter!
        </Text>
      </View>

      {/* This view holds the timer and the pass button */}
      <View className="flex-row items-center justify-between p-2">
        <Text className="text-[40px] m-2 p-6 border-2 border-dashed bg-green-900">
          {timeRemaining}
        </Text>

        <Pressable className="m-2 p-6 border-2 border-dashed bg-orange-500 items-center"
          onPress={() => {
            gameContext.passTurn();
            setHasPassed(true);
            setIsRandom(false);
          }}

        >
          <Text className="text-[40px] text-white">
            
            
            {hasPassed? "✅": "PASS" }</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SelectLetter;
