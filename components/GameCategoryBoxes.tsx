import React from "react";
import { Text, Pressable, useWindowDimensions } from "react-native";
import '../global.css';

interface CategoryBoxesProps {
  category: string;
  isCovered?: boolean;
  isSelected?: boolean;
  onPress?: () => void;
}

const CategoryBoxes: React.FC<CategoryBoxesProps> = ({ category, isCovered, isSelected, onPress }) => {
  const windowDimensions = useWindowDimensions();

  let backgroundColorClass = 'bg-game_buttons_green';
  if (isCovered) {
    backgroundColorClass = 'bg-gray-400';
  } else if (isSelected) {
    backgroundColorClass = 'bg-[#34b134]';
  }

  return (
    <Pressable
      onPress={isCovered ? undefined : onPress}
      className={`border-dashed border-2 flex-1 items-center justify-center ${backgroundColorClass}`}
      style={{
        margin: 5,
        height: 150,
        minWidth: windowDimensions.width < 1036 ? 200 : 500,
        maxWidth: windowDimensions.width < 1036 ? 200 : 500,
      }}
    >
      <Text className={`text-[30px] ${isCovered ? 'text-red-500' : 'text-white'}`}>
        {category}
      </Text>
    </Pressable>
  );
};

export default CategoryBoxes;