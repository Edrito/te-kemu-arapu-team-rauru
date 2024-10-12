import React from "react";
import { Text, Pressable, useWindowDimensions } from "react-native";

interface VoteBoxProps {
  voteType: string;
  isSelected: boolean;
  onPress: () => void;
}

const VoteBox: React.FC<VoteBoxProps> = ({ voteType, isSelected, onPress }) => {
  const { width } = useWindowDimensions();

  const buttonSize = width < 600 ? width / 3 - 20 : 120;
  
  return (
    <Pressable
      onPress={onPress}
      className={`border-dashed border-2 items-center justify-center ${
        isSelected ? "bg-[#34b134]" : "bg-game_buttons_green"
      }`}
      style={{
        height: buttonSize,
        width: buttonSize, 
        margin: width < 600 ? 4 : 8,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: buttonSize / 2, color: "white" }}>
        {voteType}
      </Text>
    </Pressable>
  );
};

export default VoteBox;