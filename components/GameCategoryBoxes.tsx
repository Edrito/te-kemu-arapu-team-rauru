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

  return (
    <Pressable
      onPress={isCovered ? undefined : onPress}
      className={`border-dashed border-2 flex-1 items-center justify-center ${
        isCovered ? 'bg-gray-400' : isSelected ? 'bg-[#34b134]' : 'bg-game_buttons_green'
      }`}
      style={{
        margin: 5,
        height: 150,
        minWidth: windowDimensions.width < 1036 ? 200 : 500,
        maxWidth: windowDimensions.width < 1036 ? 200 : 500,
      }}
    >
      <Text className={`text-[30px] ${isCovered ? 'text-red-500' : 'text-white'}`}>
        {category} {/* Show red dot if covered */}
      </Text>
    </Pressable>
  );
};

export default CategoryBoxes;