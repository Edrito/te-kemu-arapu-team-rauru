import React, { useState } from "react";
import { Text, SafeAreaView, View, ScrollView, Pressable } from "react-native";
import VoteBox from "te-kemu-arapu-compx374-team-rauru/components/Vote";
import { Timer } from "te-kemu-arapu-compx374-team-rauru/components/Timer";
import { getTimeRemaining } from "../helpers";
import { GameScreenParams } from "../types";
import { useAuth } from "te-kemu-arapu-compx374-team-rauru/context/AuthContext";
import { useGame } from "te-kemu-arapu-compx374-team-rauru/context/GameContext";
import { useLanguage } from "te-kemu-arapu-compx374-team-rauru/context/languageToggleButton";

const VotingPage: React.FC<GameScreenParams> = ({ gameId, lobbyCode, mainState, playerProfiles }) => {
  const { getText } = useLanguage();
  const [voteType, setVoted] = useState<string>("");
  const [hintsUsed, setHintsUsed] = useState<string[]>(["", "", ""]);
  const { user } = useAuth();
  const gameContext = useGame();
  const isPlayerTurn = mainState.state.gameState.playerTurn === user?.uid;

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

  // Handle passing the turn
  const handlePass = () => {
    gameContext.passTurn();
  };


  const pressHint = async (hintIndex: number) => {
    if (hintsUsed[hintIndex]!=='')
    {
      return;
    }
    if (hintIndex === 1) {
      if (hintsUsed[0] !== "") {
        setHintsUsed((prev) => {
          const newHints = [...prev];
          newHints[1] = newHints[0];
          return newHints;
        });
      }
      else {
        const result = await gameContext.getHint(currentCategory, currentLetter);
        console.log(result);
        setHintsUsed((prev) => {
          const newHints = [...prev];
          newHints[0] = result['word'] ?? '';
          newHints[1] = result['word'] ?? '';
          return newHints;
        });
      }
    } else if (hintIndex === 0) {
        const result = await gameContext.getHint(currentCategory, currentLetter);
        console.log(result);
        setHintsUsed((prev) => {
          const newHints = [...prev];
          newHints[hintIndex] = result['word'] ?? '';
          return newHints;
        });
    }
  }


  return (
    <SafeAreaView className="flex-1 bg-primary_red">
      <ScrollView contentContainerStyle={{ alignItems: "center" }} className="">
        <View className="border-2 border-dashed bg-game_buttons_green p-5 items-center justify-center rounded-xl w-[80%] min-h-[300px] py-10">
          <Text className="text-[40px] text-white text-center font-pangolin">
            {playerTurnProfile?.username ?? "..."} {getText("isCurrentlyGuessing")} {currentCategory} {getText("startingWithTheLetter")} {currentLetter}
          </Text>
        </View>

        {/* Timer */}
        <View className="flex-row justify-center	  w-[80%]">
            <Timer
              newTime={getTimeRemaining(mainState, true)}
              onTimeUp={() => { }}
            />

          {isPlayerTurn ? <Pressable
            className={`m-2 p-3 border-2 justify-center border-dashed items-center ${"bg-orange-500"
              }`}
            onPress={handlePass}
          >
            <Text className="text-[36px] text-white">{getText('pass')}</Text>
          </Pressable> : null}
        </View>


        {isPlayerTurn ? <View className="border-2 border-dashed bg-green-600 p-5 items-center justify-center rounded-xl w-[80%] min-h-[75px] m-3">
          <Text className="text-[36px] text-white text-center font-pangolin">
            {getText("hints")}
          </Text>
        </View> : null}


        {isPlayerTurn?<View className="items-center justify-center rounded-xl w-[80%] min-h-[150px] m-3">

          <View className="flex-row w-full justify-between mt-2">
            <Text className="text-[36px] text-white text-center font-pangolin flex-1 self-center">
              {
                hintsUsed[0] !== ''
                  ? hintsUsed[0].split('').map((char, index) => ((index % 2 === 1) ? '_' : char)).join('')
                  : getText(`partialWord`)
              }
            </Text>
            <Pressable
              className={`m-2 p-6 border-2 border-dashed items-center 
              ${hintsUsed[0] === '' ? "bg-orange-500" : "bg-button_pressed_orange"}`}
              onPress={() => pressHint(0)}
            >
              <Text className="text-[36px] text-white">{getText('use')}</Text>
            </Pressable>
          </View>
          <View className="flex-row w-full justify-between mt-2">
          <Text className="text-[36px] text-white text-center font-pangolin flex-1 self-center">
          {
                hintsUsed[1] !== ''
                  ? hintsUsed[1]
                  : getText(`fullWord`)
              }
            </Text>
            <Pressable
              className={`m-2 p-6 border-2 border-dashed items-center 
              ${hintsUsed[1] === '' ? "bg-orange-500" : "bg-button_pressed_orange"}`}
              onPress={() => pressHint(1)}
            >
              <Text className="text-[36px] text-white">{getText('use')}</Text>
            </Pressable>
          </View>
          <View className="flex-row w-full justify-between mt-2">
          <Text className="text-[36px] text-white text-center font-pangolin flex-1 self-center">
          {
                "🔉"
              }
            </Text>
            <Pressable
              className={`m-2 p-6 border-2 border-dashed items-center 
              ${hintsUsed[2] === '' ? "bg-orange-500" : "bg-button_pressed_orange"}`}
              onPress={() => pressHint(2)}
            >
              <Text className="text-[36px] text-white">{getText('use')}</Text>
            </Pressable>
          </View>
        </View>:null}



        {/* Only visible if youre a voter */}

        {/* Question section */}
        {!isPlayerTurn ? <View className="border-2 border-dashed bg-orange-600 p-5 items-center justify-center rounded-xl w-[80%] min-h-[150px] m-3">
          <Text className="text-[40px] text-white text-center font-pangolin">
            {getText("didTheyGuessCorrectly")}
          </Text>
        </View> : null}

        {/* Voting buttons */}
        {!isPlayerTurn ? <View className="flex-row justify-between w-[80%]">
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
        </View> : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default VotingPage;
