import React, { useEffect, useState } from "react";
import { Text, Pressable, Dimensions } from "react-native";
import '../global.css';

// Letter to display as a prop
interface LetterBoxesProps {
  initialText: string;
}

const LetterBoxes: React.FC<LetterBoxesProps> = ({ initialText }) => {
  const [isPressed, setIsPressed] = useState(false);

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
  
  

  const handlePress = () => {
    setIsPressed(true);
  };

  return (
    <Pressable
      onPress={handlePress}
      style = {{
        backgroundColor: "#15803d",
        borderColor: "black",
        borderStyle: "dashed",
        borderWidth: 2,
        margin: (windowDimensions.width < 1036) ? 5 : 15,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: (windowDimensions.width < 1036) ? 80 : 170,
        minWidth: (windowDimensions.width < 1036) ? 80 : 170,
        maxWidth: (windowDimensions.width < 1036) ? 80 : 170,
      }}

    >
      <Text className="text-white text-[30px]">
        {isPressed ? "✔️" : initialText}
      </Text>
    </Pressable>
  );
};

export default LetterBoxes;
