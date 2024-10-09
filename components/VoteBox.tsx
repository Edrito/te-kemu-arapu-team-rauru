// VoteBox.tsx
import React, { useEffect, useState } from "react";
import { Text, Pressable, Dimensions } from "react-native";
import '../global.css';

interface VoteBoxesProps {
  voteType: string;
  isSelected?: boolean;
  onPress?: () => void;
}

const VoteBox = ({ voteType, isSelected, onPress }: { voteType: string, isSelected: boolean, onPress: () => void }) => {
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
      className={`border-dashed border-2 m-2 flex-1 items-center justify-center ${
        isSelected ? 'bg-emerald_green' : 'bg-maori_red'
      } border-black`}
      style={{
        height: 150,
        minWidth: windowDimensions.width < 1036 ? 200 : 500,
        maxWidth: windowDimensions.width < 1036 ? 200 : 500,
      }}
      accessibilityLabel={`Vote ${voteType}`}
    >
      <Text className="text-white text-[30px]">
        {voteType}
      </Text>
    </Pressable>
  );
};

export default VoteBox; 
