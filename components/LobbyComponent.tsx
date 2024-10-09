import { View, Text, Image } from "react-native";
import React from "react";

// This is a temporary component to display players within lobbies

interface LobbyProps {
  lobbyIcon: string;
  lobbyName: string;
}

const LobbyComponent: React.FC<LobbyProps> = ({ lobbyIcon, lobbyName }) => {
  return (
    <View className="w-full bg-slate-400 border border-dashed flex-row justify-between items-center px-4 mr-10 m-1 ">
      <Image
        source={{ uri: lobbyIcon }}
        className="w-[40px] h-[40px] rounded-full mr-10"
      />
      <Text className="text-black font-pangolin text-[30px]">{lobbyName}</Text>
    </View>
  );
};

export default LobbyComponent;
