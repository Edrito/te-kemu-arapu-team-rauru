import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";
import React from "react";
import GameLettersGrid from "te-kemu-arapu-compx374-team-rauru/components/GameLettersGrid";
import "../../global.css";
import GameBar from "te-kemu-arapu-compx374-team-rauru/components/GameBar";

const selectLetterPlayer = () => {

  return (
    <SafeAreaView className="flex-1 bg-primary_red">
      {/* This view holds the header bar */}
      <View className="w-full">
        <GameBar />
      </View>

      <View className="w-full items-center justify-center mt-3">
        <Text className="text-[40px] text-white font-pangolin">
          Category: ???
        </Text>
      </View>

      <ScrollView className="w-full mt-5 items-center">
        {/* This view holds the letters */}
        <View className="flex-wrap flex-row justify-center">
          <GameLettersGrid />
        </View>

        <View className="w-full items-center justify-center m-5">
          {/* TODO: Onpress event to choose a random letter from array of letters still in play */}
          <Pressable className="border-2 border-dashed bg-green-700 items-center justify-center p-3 w-[40%]">
            <Text className="text-[40px] text-white">Select Random</Text>
          </Pressable>
        </View>
      </ScrollView>

      <View className="w-full items-center justify-center">
        <Text className="text-[40px] text-white font-pangolin">
          It's your turn to select a letter!
        </Text>
      </View>

      {/* This view holds the timer and the pass button */}
      <View className="flex-row items-center justify-between p-2">
        <Text className="text-[40px] m-2 p-6 border-2 border-dashed bg-green-900">
          TIMER
        </Text>

        <Pressable className="m-2 p-6 border-2 border-dashed bg-orange-500 items-center">
          <Text className="text-[40px] text-white">PASS</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default selectLetterPlayer;
