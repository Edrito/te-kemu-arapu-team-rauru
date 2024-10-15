import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Pressable, ImageBackground } from "react-native";
import GameLettersGrid from "te-kemu-arapu-compx374-team-rauru/components/GameLettersGrid";
import "../../global.css";
import { GameScreenParams } from "../types"; // Assuming you have these types defined
import { getTimeRemaining } from "../helpers";
import { useGame } from "te-kemu-arapu-compx374-team-rauru/context/GameContext";
import { Timer } from "te-kemu-arapu-compx374-team-rauru/components/Timer";
import { useLanguage } from "te-kemu-arapu-compx374-team-rauru/context/languageToggleButton";
import { useAuth } from "te-kemu-arapu-compx374-team-rauru/context/AuthContext";

const SelectLetter: React.FC<GameScreenParams> = ({
  gameId,
  lobbyCode,
  mainState,
  playerProfiles
}) => {
  const selectedCategory = mainState.state.gameState.currentCategory;
  const gameContext = useGame();
  const [hasPassed, setHasPassed] = useState<boolean>(false);
  const [selectedLetter, setSelectedLetter] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const { getText } = useLanguage();
  const auth = useAuth();

  const isPlayerTurn = mainState.state.gameState.playerTurn === auth.user?.uid;
  const playerTurnProfile = playerProfiles.find(
    (profile) => profile.userId === mainState.state.gameState.playerTurn
  );

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
          {getText('category')}: {selectedCategory}
        </Text>
      </View>

       <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        <ImageBackground
          source={require("te-kemu-arapu-compx374-team-rauru/assets/images/tekemuarapu-bg-80.jpg")}
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            opacity: 0.5,
          }}
          resizeMode="cover"
        />
      </View>

      <ScrollView className="w-full mt-5 items-center" contentContainerStyle={{alignItems: "center"}}>
        {/* Letters grid */}
        <View className="flex-wrap flex-row justify-center">
          <GameLettersGrid
            selectedLetters={mainState.state.gameState.lettersCovered ?? []}
            allLetters={mainState.alphabet ?? []}
            selectedLetter={selectedLetter}
            selectLetter={handleSelectLetter}
            allowSelection={isPlayerTurn}
          />
        </View>

        {/* Random selection button */}
        {isPlayerTurn? <View className="w-full items-center justify-center m-5">
          <Pressable
            className={`border-2 border-dashed items-center justify-center p-3 w-[40%] ${
              selectedOption === "random"
                ? "bg-button_pressed_orange"
                : "bg-orange-500"
            }`}
            onPress={handleRandomSelection}
          >
            <Text className="text-[40px] text-white">{getText('random')}</Text>
          </Pressable>
        </View>:null}
      </ScrollView>

      {/* Prompt to select a letter */}
      <View className="w-full items-center justify-center">
        <Text className="text-[40px] text-center text-white font-pangolin">
          {isPlayerTurn? getText('itsYourTurn') :
          playerTurnProfile?.username  +" " +   getText('isCurrentlySelecting') 
          }
        </Text>
      </View>

      {/* Timer and Pass button */}
      <View className="flex-row items-center justify-between p-2">
        <Timer
          newTime={getTimeRemaining(mainState, true)}
          onTimeUp={() => {}}
        />

       { isPlayerTurn? <Pressable
          className={`m-2 p-6 border-2 border-dashed items-center ${
            selectedOption === "pass"
              ? "bg-button_pressed_orange"
              : "bg-orange-500"
          }`}
          onPress={handlePass}
        >
          <Text className="text-[40px] text-white">{getText('pass')}</Text>
        </Pressable>:null}
      </View>
    </SafeAreaView>
  );
};

export default SelectLetter;