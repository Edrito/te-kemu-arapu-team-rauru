import React from "react";
import { Text, Pressable, useWindowDimensions } from "react-native";
import '../global.css';

interface LetterBoxesProps {
  letter: string;
  isCovered?: boolean;
  isSelected?: boolean;
  onPress?: () => void;
  allowSelection: boolean;
}

const LetterBoxes: React.FC<LetterBoxesProps> = ({ letter, isCovered, isSelected, onPress,allowSelection }) => {
  const windowDimensions = useWindowDimensions();

  let backgroundColor = 'bg-game_buttons_green';
  if (isCovered) {
    backgroundColor = 'bg-gray-400';
  } else if (isSelected) {
    backgroundColor = 'bg-[#34b134]';
  }

  return (
    <Pressable
      onPress={isCovered || !allowSelection ? undefined : onPress} 
      className={`border-dashed border-2 flex-1 items-center justify-center ${backgroundColor}`} // Conditional background color
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