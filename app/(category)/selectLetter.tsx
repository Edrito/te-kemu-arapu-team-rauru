import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";
import GameLettersGrid from "te-kemu-arapu-compx374-team-rauru/components/GameLettersGrid";
import "../../global.css";
import { GameScreenParams } from "../types"; // Assuming you have these types defined
import { getTimeRemaining } from "../helpers";
import { useGame } from "te-kemu-arapu-compx374-team-rauru/context/GameContext";
import { Timer } from "te-kemu-arapu-compx374-team-rauru/components/Timer";

const SelectLetter: React.FC<GameScreenParams> = ({
  gameId,
  lobbyCode,
  mainState,
}) => {
  const selectedCategory = mainState.state.gameState.currentCategory;
  const gameContext = useGame();
  const [hasPassed, setHasPassed] = useState<boolean>(false);
  const [selectedLetter, setSelectedLetter] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSelectLetter = (letter: string) => {
    gameContext.selectLetter(letter);
    setHasPassed(false);
    setSelectedLetter(letter);
    setSelectedOption("letter");
  };

  // Handle random letter selection
  const handleRandomSelection = () => {
    gameContext.selectLetter("random");
    setHasPassed(false);
    setSelectedLetter("");
    setSelectedOption("random");
  };

  // Handle passing the turn
  const handlePass = () => {
    gameContext.passTurn();
    setHasPassed(true);
    setSelectedLetter("");
    setSelectedOption("pass");
  };

  return (
    <SafeAreaView className="flex-1 bg-primary_red">
      {/* Header bar */}
      <View className="w-full items-center justify-center mt-3">
        <Text className="text-[40px] text-white font-pangolin">
          Category: {selectedCategory}
        </Text>
      </View>

      <ScrollView className="w-full mt-5 items-center">
        {/* Letters grid */}
        <View className="flex-wrap flex-row justify-center">
          <GameLettersGrid
            selectedLetters={mainState.state.gameState.lettersCovered ?? []}
            allLetters={mainState.alphabet ?? []}
            selectedLetter={selectedLetter}
            selectLetter={handleSelectLetter}
          />
        </View>

        {/* Random selection button */}
        <View className="w-full items-center justify-center m-5">
          <Pressable
            className={`border-2 border-dashed items-center justify-center p-3 w-[40%] ${
              selectedOption === "random"
                ? "bg-button_pressed_orange"
                : "bg-orange-500"
            }`}
            onPress={handleRandomSelection}
          >
            <Text className="text-[40px] text-white">RANDOM</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Prompt to select a letter */}
      <View className="w-full items-center justify-center">
        <Text className="text-[40px] text-center text-white font-pangolin">
          It's your turn to select a letter!
        </Text>
      </View>

      {/* Timer and Pass button */}
      <View className="flex-row items-center justify-between p-2">
        {Timer({
          timeRemaining: getTimeRemaining(mainState, true),
          onTimeUp: () => {},
        })}

        <Pressable
          className={`m-2 p-6 border-2 border-dashed items-center ${
            selectedOption === "pass"
              ? "bg-button_pressed_orange"
              : "bg-orange-500"
          }`}
          onPress={handlePass}
        >
          <Text className="text-[40px] text-white">PASS</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SelectLetter;