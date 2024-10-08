import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import '../global.css';
import { GameScreenParams } from "./types";
import { getTimeRemaining } from "./helpers";
import { Timer } from "te-kemu-arapu-compx374-team-rauru/components/Timer";

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
                {Timer({
                    timeRemaining: getTimeRemaining(mainState, true),
                    onTimeUp: () => {
                    },
                })}
            </View>
        </SafeAreaView>
    );
};

export default ChoosingPlayer;