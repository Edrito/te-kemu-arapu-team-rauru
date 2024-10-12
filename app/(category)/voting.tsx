import React, { useState } from "react";
import { Text, SafeAreaView, View, ScrollView } from "react-native";
import VoteBox from "te-kemu-arapu-compx374-team-rauru/components/Vote";
import { Timer } from "te-kemu-arapu-compx374-team-rauru/components/Timer";
import { getTimeRemaining } from "../helpers";
import { GameScreenParams } from "../types";
import { useAuth } from "te-kemu-arapu-compx374-team-rauru/context/AuthContext";
import { useGame } from "te-kemu-arapu-compx374-team-rauru/context/GameContext";

const VotingPage: React.FC<GameScreenParams> = ({ gameId, lobbyCode, mainState, playerProfiles }) => {
  const [voteType, setVoted] = useState<string>("");
  const { user } = useAuth();
  const gameContext = useGame();

  const playerTurnProfile = playerProfiles.find(
    (profile) => profile.userId === mainState.state.gameState.playerTurn
  );

  const currentLetter = mainState.state.gameState.selectedLetter;
  const currentCategory = mainState.state.gameState.currentCategory;

  const vote = (voteType: string) => {
    if (!user) {
      return;
    }
    gameContext.playerVote(voteType);
    setVoted(voteType);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary_red">
      <ScrollView contentContainerStyle={{ alignItems: "center" }} className="">
        <View className="border-2 border-dashed bg-game_buttons_green p-5 items-center justify-center rounded-xl w-[80%] min-h-[300px]">
          <Text className="text-[40px] text-white text-center font-pangolin">
            {playerTurnProfile?.username ?? "..."} is currently guessing a "{currentCategory}" starting with the letter "{currentLetter}"
          </Text>
        </View>

        {/* Timer */}
        <View className="border-2 bg-red-800 p-4 items-center justify-center rounded-xl m-3 w-[80%] mb-5">
          <Timer
            newTime={getTimeRemaining(mainState, true)}
            onTimeUp={() => {}}
          />
        </View>

        {/* Question section */}
        <View className="border-2 border-dashed bg-orange-600 p-5 items-center justify-center rounded-xl w-[80%] min-h-[150px] m-3">
          <Text className="text-[40px] text-white text-center font-pangolin">
            Did they guess correctly?
          </Text>
        </View>

        {/* Voting buttons */}
        <View className="flex-row justify-between w-[80%]">
          <VoteBox
            voteType={"❌"}
            isSelected={voteType === "negative"}
            onPress={() => vote("negative")}
          />
          <VoteBox
            voteType={"❔"}
            isSelected={voteType === "neutral"}
            onPress={() => vote("neutral")}
          />
          <VoteBox
            voteType={"✔️"}
            isSelected={voteType === "positive"}
            onPress={() => vote("positive")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VotingPage;
