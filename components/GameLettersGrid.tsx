import React from "react";
import { View } from "react-native";
import GameLetterBoxes from "te-kemu-arapu-compx374-team-rauru/components/GameLetterBoxes";

interface LettersGridProps {
  selectedLetters: string[]; // List of letters that have been selected/covered
  allLetters: string[]; // All available letters
  selectedLetter: string; // Currently selected letter
  selectLetter: (letter: string) => void; // Function to handle letter selection
}

const LettersGrid: React.FC<LettersGridProps> = ({
  selectedLetters,
  allLetters,
  selectedLetter,
  selectLetter,
}) => {
  return (
    <View className="w-full h-full justify-center items-center flex-1 flex-row flex-wrap">
      {allLetters.map((letter) => (
        <GameLetterBoxes
          key={letter}
          letter={letter}
          isSelected={selectedLetter === letter}
          isCovered={selectedLetters.includes(letter)}
          onPress={() => selectLetter(letter)}
        />
      ))}
    </View>
  );
};

export default LettersGrid;