import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "te-kemu-arapu-compx374-team-rauru/context/AuthContext";

import GameCheckBoxes from "te-kemu-arapu-compx374-team-rauru/components/GameCategoryBoxes";
import "../../global.css";
import { GameScreenParams } from "../types";
import { useGame } from "te-kemu-arapu-compx374-team-rauru/context/GameContext";

import { getTimeRemaining } from "../helpers";
import  {Timer} from "te-kemu-arapu-compx374-team-rauru/components/Timer";


//Shows possible categories from the mainstate, and allows the user to vote on a category
const CategorySelect: React.FC<GameScreenParams> = ({ gameId, lobbyCode, mainState }) => {
  const [votedCategory, setVoted] = useState("");
  const { user } = useAuth();
  const gameContext = useGame();

  const categories = mainState.categories ?? [];
  const categoriesCovered = mainState.state.gameState.categoriesCovered ?? [];


  const handlePress = (category: string) => {
    if (!user) {
      return;
    }
    setVoted(category);
    gameContext.categoryVote(category);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary_red">
      <ScrollView className="w-full mt-5">
        <View className="flex-wrap flex-row justify-center">
          {categories.map((category) => (
            <GameCheckBoxes
              key={category}
              category={category}
              isSelected={votedCategory === category}
              isCovered={categoriesCovered.includes(category)}
              onPress={() => handlePress(category)}
            />
          ))}
        </View>
      </ScrollView>

      {/* This view holds the timer and the pass button */}
      <View className="flex-row items-center justify-between p-2">
        {Timer({
          timeRemaining: getTimeRemaining(mainState, true),
          onTimeUp: () => {
          },
        })}
        {/* <Pressable className="m-2 p-6 border-2 border-dashed bg-orange-500 items-center">
          <Text className="text-[40px] text-white">PASS</Text>
        </Pressable> */}
      </View>
    </SafeAreaView>
  );
};

export default CategorySelect;
