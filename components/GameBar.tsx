import React, { useState } from "react";
import { View, Text, Pressable, Image, Modal } from "react-native";
import Scoreboard from "te-kemu-arapu-compx374-team-rauru/components/Scoreboard";
import "../global.css";

// This component is the game bar that displays during an active game.

const players = [
    {
      icon: "🐬",
      name: "Koru Aihe",
      score: 53,
    },
    {
      icon: "🍎",
      name: "Āporo",
      score: 53,
    },
    {
      icon: "🍎",
      name: "Āporo",
      score: 34,
    },
    {
      icon: "🍎",
      name: "Āporo",
      score: 22,
    },
    {
      icon: "🍎",
      name: "Āporo",
      score: 4,
    },
    {
      icon: "🍎",
      name: "Āporo",
      score: 54,
    },
    {
      icon: "🍎",
      name: "Āporo",
      score: 52,
    },
    {
      icon: "🍎",
      name: "Āporo",
      score: 32,
    },
    {
      icon: "🍎",
      name: "Āporo",
      score: 100,
    },
  ];

const GameBar: React.FC = () => {
  const [language, setLanguage] = useState("English");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const changeLanguage = () => {
    setLanguage((language) => (language === "English" ? "Maori" : "English"));
  };

  return (
    <View className="w-full h-[60px] bg-red-500 flex-row justify-between items-center px-4">
      {/* Score Button */}
      <Pressable onPress={() => setIsModalVisible(true)}>
        <Text className="text-[30px] font-bold font-pangolin m-2 p-2 border-2 border-dashed bg-orange-500">
          Score
        </Text>
      </Pressable>

      <Modal
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View className="flex-1 items-center justify-center p-[20px] bg-primary_red">

          <View className="border-2 border-dashed m-10">
            <Scoreboard players={players} />
          </View>

          <Pressable onPress={() => setIsModalVisible(false)}>
            <Text className="text-[30px] border-2 border-black border-dashed bg-orange-500 p-0.5 px-5 m-7">
              Close
            </Text>
          </Pressable>
        </View>
      </Modal>

      {/* Language change button */}
      <Pressable onPress={changeLanguage} className="flex-row items-center">
        <Image
          source={require("../assets/images/rotating_icon.png")}
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />
        <Text className="text-[30px] font-bold font-notosans ml-2">
          {language}
        </Text>
      </Pressable>
    </View>
  );
};

export default GameBar;
