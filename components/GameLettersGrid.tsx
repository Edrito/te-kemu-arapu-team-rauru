import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";
import React from "react";
import GameLetterBoxes from "te-kemu-arapu-compx374-team-rauru/components/GameLetterBoxes";
import "../global.css";
import { useState } from "react";
import { useGame } from "te-kemu-arapu-compx374-team-rauru/context/GameContext";
interface LettersGridProps {
  selectedLetters: string[];
  allLetters: string[];
  selectLetter: () => void;
}

const LettersGrid: React.FC<LettersGridProps> = ({
  selectedLetters, 
  allLetters,
  selectLetter

}) => {

  const [selectedLetter, setSelectedLetter] = useState<string>("");
  const gameContext = useGame();

  const letterSelected = (letter: string) => {
    setSelectedLetter(letter);
    selectLetter();
    gameContext.selectLetter(letter);
  }
;
  return (
    <View className="w-full h-full justify-center items-center flex-1 flex-row flex-wrap">
      {allLetters.map((letter) => (
        <GameLetterBoxes
          letter={letter}
          isSelected={selectedLetter === letter}
          isCovered= {selectedLetters.includes(letter)}
          onPress={() => letterSelected(letter)}
        />
      ))}
    </View>
  )
}

export default LettersGrid