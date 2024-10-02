import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GameBar from "te-kemu-arapu-compx374-team-rauru/components/GameBar";

const PlayerInput = () => {
  return (
    <SafeAreaView className="flex-1 w-full items-center bg-primary_red">
      {/* Gamebar */}
      <View className="w-full">
        <GameBar />
      </View>

      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        className="flex-1 w-full items-center p-5"
      >
        <View className="border-2 border-dashed bg-game_buttons_green p-5 items-center justify-center rounded-xl min-h-[300px]">
          <Text className="text-[40px] text-white text-center">
            "Think of a "CATEGORY" starting with the letter "LETTER"
          </Text>
        </View>

        <View className="flex-row justify-between items-center w-full m-4">
          <Text className="text-[40px] text-center text-white border-2 border-dashed rounded-xl bg-green-950 p-4 w-[30%] min-w-[150px] items-center justify-center">
            Timer
          </Text>

          <TouchableOpacity className="border-2 border-dashed bg-orange-600 p-4 w-[30%] rounded-xl items-center justify-center">
            <Text className="text-[40px] text-white">Pass</Text>
          </TouchableOpacity>
        </View>

        {/* Hints Section */}
        <View className="p-1 w-[60%] mt-16">
          <Text className="text-[30px] border-2 border-dashed bg-green-700 w-full text-center rounded-xl text-white mb-5">
            Hints
          </Text>

          {/* First hint */}
          <View className="flex-row justify-between m-1">
            <Text className="text-[30px] text-white m-2">Partial Word</Text>
            <TouchableOpacity className="border-2 border-dashed bg-green-700 p-2">
              <Text className="text-[30px] text-white">Use</Text>
            </TouchableOpacity>
          </View>

          {/* Second hint */}
          <View className="flex-row justify-between m-1">
            <Text className="text-[30px] text-white m-2">Full Word</Text>
            <TouchableOpacity className="border-2 border-dashed bg-green-700 p-2">
              <Text className="text-[30px] text-white">Use</Text>
            </TouchableOpacity>
          </View>

          {/* Third hint */}
          <View className="flex-row justify-between m-1">
            <Text className="text-[30px] text-white m-2">🔊</Text>
            <TouchableOpacity className="border-2 border-dashed bg-green-700 p-2">
              <Text className="text-[30px] text-white">Use</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlayerInput;
