import React from "react";
import { Text, Pressable, useWindowDimensions } from "react-native";
import '../global.css';

interface LetterBoxesProps {
  letter: string;
  isCovered?: boolean;
  isSelected?: boolean;
  onPress?: () => void;
}

const LetterBoxes: React.FC<LetterBoxesProps> = ({ letter, isCovered, isSelected, onPress }) => {
  const windowDimensions = useWindowDimensions();

  return (
    <Pressable
      onPress={isCovered ? undefined : onPress} 
      className={`border-dashed border-2 flex-1 items-center justify-center ${
        isCovered ? 'bg-gray-400' : isSelected ? 'bg-[#34b134]' : 'bg-game_buttons_green'
      }`} // Conditional background color
      style={{
        margin: windowDimensions.width < 1036 ? 5 : 15,
        height: windowDimensions.width < 1036 ? 80 : 170,
        minWidth: windowDimensions.width < 1036 ? 80 : 170,
        maxWidth: windowDimensions.width < 1036 ? 80 : 170,
      }}
    >
      <Text className={`text-[30px] ${isCovered ? 'text-red-500' : 'text-white'}`}>
        {letter}
      </Text>
    </Pressable>
  );
};

export default LetterBoxes;