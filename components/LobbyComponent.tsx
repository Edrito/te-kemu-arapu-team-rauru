import { View, Text, Image } from "react-native";
import React from "react";
import { ProfileData } from "../app/types";

// This is a temporary component to display players within lobbies


const LobbyComponent: React.FC<ProfileData> = ({
  username,
  difficulty,
  icon,
  color,
  userId
}) => {
  return (
    <View style={{ backgroundColor: color }} className="w-full border border-dashed flex-row justify-between items-center px-4 mr-10 m-1">
            <Text className="text-black font-pangolin text-[30px]">{username ?? '???'}</Text>

      <Text className="text-black font-pangolin text-[30px]">{icon}</Text>
    </View>
  );
};

export default LobbyComponent;
