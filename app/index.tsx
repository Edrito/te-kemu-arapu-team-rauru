import React, { useEffect } from "react";
import { Text, Pressable, Button, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import "../global.css";
import PlayerBar from "te-kemu-arapu-compx374-team-rauru/components/PlayerBar";

const Start = () => {
  const router = useRouter();

  // Path to current player icon
  const playerIconTest = '../assets/images/react-logo.png';

  return (
    
    <SafeAreaView className="flex-1 justify-center items-center bg-primary_red">

      <View className="w-full absolute top-0">
        <PlayerBar playerIcon={playerIconTest}/>
      </View>
    
      <View>
        <Text className="font-pangolin text-[130px] p-[100px]">
          Te kēmu Arapū
        </Text>
      </View>

      <Pressable
        onPress={() => router.push("/profile")}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#8c4f00" : "#c97d1a",
            padding: 20,
            borderRadius: 8,
            borderWidth: 2,
            borderColor: "black",
            borderStyle: "dashed",
            margin: 10,
          },
        ]}
      >

        <Text className="text-[30px] font-bold text-white font-crayonara">
          BEGIN!
        </Text>
      </Pressable>

      {/* TODO: DELETE THIS */}
      <Button
        title="(TESTING) go to scoreboard screen"
        onPress={() => router.push("/score")}
      />

      <Text className="text-[30px] absolute bottom-5 self-center font-bold">
        DEMO
      </Text>
    </SafeAreaView>
  );
};

export default Start;
