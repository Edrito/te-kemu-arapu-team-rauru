import React from "react";
import GameBar from "te-kemu-arapu-compx374-team-rauru/components/GameBar";
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  ScrollView,
} from "react-native";

const vote = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary_red">
   

      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        className="p-5"
      >
        <View className="border-2 border-dashed bg-game_buttons_green p-5 items-center justify-center rounded-xl w-[80%] min-h-[300px]">
          <Text className="text-[40px] text-white text-center font-pangolin">
            "Player" is currently guessing a "CATEGORY" starting with the letter
            "LETTER"
          </Text>
        </View>

        {/* Timer */}
        <View className="border-2 border-dashed bg-green-950 p-4 items-center justify-center rounded-xl m-3 w-[80%] mb-5">
          <Text className="text-[40px] text-white">TIMER</Text>
        </View>

          {/* Question section */}
          <View className="border-2 border-dashed bg-game_buttons_green p-5 items-center justify-center rounded-xl w-[80%] min-h-[150px] m-3">
            <Text className="text-[40px] text-white text-center font-pangolin">
              Did they guess correctly?
            </Text>
          </View>
          
          <View className="flex-row justify-between w-[80%]">
            {/* X button */}
            <TouchableOpacity className="border-2 border-dashed bg-red-600 p-5 rounded-xl w-[30%] items-center justify-center">
              <Text className="text-white text-[40px]">X</Text>
            </TouchableOpacity>

            {/* ? button */}
            <TouchableOpacity className="border-2 border-dashed bg-orange-600 p-5 rounded-xl w-[30%] items-center justify-center">
              {/* Maybe need to add a modal tooltip here */}
              <Text className="text-white text-[40px]">?</Text>
            </TouchableOpacity>

            {/* ✓ button */}
            <TouchableOpacity className="border-2 border-dashed bg-green-600 p-5 rounded-xl w-[30%] items-center justify-center">
              <Text className="text-white text-[40px]">✓</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default vote;
