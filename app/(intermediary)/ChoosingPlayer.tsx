import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import { GameScreenParams } from "../types";
import { getTimeRemaining } from "../helpers";
import { Timer } from "te-kemu-arapu-compx374-team-rauru/components/Timer";

const ChoosingPlayer: React.FC<GameScreenParams> = ({
  gameId,
  lobbyCode,
  mainState,
}) => {
  const remainingTime = getTimeRemaining(mainState, true);
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-primary_red">
      <View
        className="border-2 border-dashed bg-game_buttons_green m-[50px] rounded-lg"
        style={{ margin: 50 }}
      >
        <Text className="font-pangolin text-white text-[70px] p-5">
          Selecting a player!
        </Text>
      </View>
      <View>
        {Timer({
          timeRemaining: getTimeRemaining(mainState, true),
          onTimeUp: () => {},
        })}
      </View>
    </SafeAreaView>
  );
};

export default ChoosingPlayer;
