import React, { useEffect, useState } from "react";
import { Text, Pressable, Dimensions } from "react-native";
import '../global.css';

interface CategoryBoxesProps {
  category: string;
  isCovered?: boolean;
  isSelected?: boolean;
  onPress?: () => void;
}

const CategoryBoxes: React.FC<CategoryBoxesProps> = ({ category, isCovered, isSelected , handlePress}) => {
  const [windowDimensions, setWindowDimensions] = useState(Dimensions.get('window'));
  // This is so that buttons change size in real time when screen size changes
  useEffect(() => {
    // Function to handle resizing of the window
    const resizeScreen = () => {
      // Update the state with the current window dimensions
      setWindowDimensions(Dimensions.get('window'));
    };

    // Listen to changes in screen size
    const subscription = Dimensions.addEventListener('change', resizeScreen);

    // End listener
    return () => subscription?.remove();
  }, []);



  return (
    <Pressable
      onPress={handlePress}
      style={{
        backgroundColor: "green",
        borderColor: "black",
        borderStyle: "dashed",
        borderWidth: 2,
        margin: 5,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 150,
        minWidth: (windowDimensions.width < 1036) ? 200 : 500,
        maxWidth: (windowDimensions.width < 1036) ? 200 : 500,
      }}

    >

      <Text className="text-white text-[30px]">
        {
          isSelected ? "✅" :

          (  isCovered ? "🔴" : category)}
      </Text>
    </Pressable>
  );
};

export default CategoryBoxes;
