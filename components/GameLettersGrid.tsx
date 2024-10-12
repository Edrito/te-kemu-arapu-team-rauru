import React from "react";
import { View } from "react-native";
import GameLetterBoxes from "te-kemu-arapu-compx374-team-rauru/components/GameLetterBoxes";

interface LettersGridProps {
  selectedLetters: string[]; // List of letters that have been selected/covered
  allLetters: string[]; // All available letters
  selectedLetter: string; // Currently selected letter
  selectLetter: (letter: string) => void; // Function to handle letter selection
  allowSelection: boolean; // Allow selection of letters
}

const LettersGrid: React.FC<LettersGridProps> = ({
  selectedLetters,
  allLetters,
  selectedLetter,
  selectLetter,
  allowSelection,
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
          allowSelection= {allowSelection}
        />
      ))}
    </View>
  );
};

export default LettersGrid;