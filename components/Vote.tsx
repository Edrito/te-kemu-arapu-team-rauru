import React, { useEffect, useState } from "react";
import { Text, Pressable, Dimensions } from "react-native";
import '../global.css';

interface VoteBoxesProps {
  voteType: string;
  isSelected?: boolean;
  onPress?: () => void;
}

const VoteBox: React.FC<VoteBoxesProps> = ({ voteType, isSelected , onPress}) => {
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
      onPress={onPress}
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

          ( voteType)}
      </Text>
    </Pressable>
  );
};

export default VoteBox;
