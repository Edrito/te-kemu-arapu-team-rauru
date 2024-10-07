import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import '../global.css';
import { GameScreenParams } from "./types";
import { getTimeRemaining } from "./helpers";
const ChoosingPlayer: React.FC<GameScreenParams> = ({ gameId, lobbyCode, mainState }) => {

  const remainingTime = getTimeRemaining(mainState, true);
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-primary_red">
      <View className="m-12">
        <Text className="font-pangolin text-6xl p-5 text-white">
          Choosing Next Player...
        </Text>
      </View>
      <View>
        <Text className="font-pangolin text-6xl p-5 border-2 border-white bg-green-600 mb-8">
          {remainingTime}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ChoosingPlayer;