import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";
import React from "react";
import GameLetterBoxes from "te-kemu-arapu-compx374-team-rauru/components/GameLetterBoxes";
import "../global.css";

const LettersGrid = () => {
  return (
    <View className="w-full h-full justify-center items-center flex-1 flex-row flex-wrap">
      <GameLetterBoxes initialText="a" />
      <GameLetterBoxes initialText="e" />
      <GameLetterBoxes initialText="h" />
      <GameLetterBoxes initialText="i" />
      <GameLetterBoxes initialText="k" />
      <GameLetterBoxes initialText="m" />
      <GameLetterBoxes initialText="n" />
      <GameLetterBoxes initialText="ng" />
      <GameLetterBoxes initialText="o" />
      <GameLetterBoxes initialText="p" />
      <GameLetterBoxes initialText="r" />
      <GameLetterBoxes initialText="t" />
      <GameLetterBoxes initialText="u" />
      <GameLetterBoxes initialText="w" />
      <GameLetterBoxes initialText="wh" />

    </View>
  )
}

export default LettersGrid