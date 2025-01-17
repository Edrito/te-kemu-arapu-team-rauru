import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import { useLanguage } from "te-kemu-arapu-compx374-team-rauru/context/languageToggleButton";
import "../global.css";

interface HeaderBarIcon {
  // Change string to whatever type the icon will be
  playerIcon: string;
}

const HeaderBar: React.FC<HeaderBarIcon> = ({ playerIcon }) => {
  const { toggleLanguage, displayLanguage } = useLanguage();

  const changeLanguage = () => {
    toggleLanguage();
  };

  return (
    <View className="w-full h-[60px] bg-red-500 flex-row justify-between items-center px-4">
      {/* Player Icon */}
      <Image
        source={{ uri: playerIcon }}
        className="w-[40px] h-[40px] rounded-full"
      />

      <Pressable onPress={changeLanguage} className="flex-row items-center">
        <Image
          source={require("../assets/images/rotating_icon.png")}
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />
        <Text className="text-[30px] font-bold font-pangolin ml-2">
          {displayLanguage}
        </Text>
      </Pressable>
    </View>
  );
};

export default HeaderBar;
