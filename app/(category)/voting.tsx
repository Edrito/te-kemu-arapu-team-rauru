import React from "react";
import GameBar from "te-kemu-arapu-compx374-team-rauru/components/GameBar";
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  ScrollView,
} from "react-native";
import { GameScreenParams } from "../types";
import { useEffect, useState } from "react";
import { useAuth } from "te-kemu-arapu-compx374-team-rauru/context/AuthContext";
import { useGame } from "te-kemu-arapu-compx374-team-rauru/context/GameContext";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Import Firestore methods
import VoteBox from "te-kemu-arapu-compx374-team-rauru/components/Vote";
import  {Timer} from "te-kemu-arapu-compx374-team-rauru/components/Timer";
import { getTimeRemaining } from "../helpers";


const VotingPage: React.FC<GameScreenParams> = ({ gameId, lobbyCode, mainState }) => {

  const [voteType, setVoted] = useState<string>("");
  const { user } = useAuth();
  const gameContext = useGame();

  const [playerName, setPlayerName] = useState<string>(""); // State to hold the player name


  const categories = mainState.categories ?? [];
  const categoriesCovered = mainState.state.gameState.categoriesCovered ?? [];

  const currentLetter = mainState.state.gameState.selectedLetter;
  const currentCategory = mainState.state.gameState.currentCategory;

  const playerTurn = mainState.state.gameState.playerTurn;

  // Fetch player name from Firestore
  useEffect(() => {
    const fetchPlayerName = async () => {
      const db = getFirestore(); // Get Firestore instance
      const playerDocRef = doc(db, "profiles", playerTurn); // Reference to the "playerTurn" document
      const playerDoc = await getDoc(playerDocRef);

      if (playerDoc.exists()) {
        const data = playerDoc.data();
        setPlayerName(data.name); // Assume the player's name is stored in a "name" field
      } else {
        console.log("No such document!");
      }
    };

    fetchPlayerName();
  }, [playerTurn]);

  const vote = (voteType: string) => {
    if (!user) {
      return;
    }
    gameContext.playerVote(voteType);
    setVoted(voteType);
  }


  return (
    <SafeAreaView className="flex-1 bg-primary_red">


      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        className="p-5"
      >
        <View className="border-2 border-dashed bg-game_buttons_green p-5 items-center justify-center rounded-xl w-[80%] min-h-[300px]">
          <Text className="text-[40px] text-white text-center font-pangolin">
            {playerName || "..."} is currently guessing a "{currentCategory}" starting with the letter
            "{currentLetter}"
          </Text>
        </View>

        {/* Timer */}
        <View className="border-2 border-dashed bg-green-950 p-4 items-center justify-center rounded-xl m-3 w-[80%] mb-5">
        {Timer({
          newTime: getTimeRemaining(mainState, true),
          onTimeUp: () => {
          },
        })}
        </View>

        {/* Question section */}
        <View className="border-2 border-dashed bg-orange-600 p-5 items-center justify-center rounded-xl w-[80%] min-h-[150px] m-3">
          <Text className="text-[40px] text-white text-center font-pangolin">
            Did they guess correctly?
          </Text>
        </View>

        <View className="flex-row justify-between w-[80%]">
          {/* X button */}
          <VoteBox
            voteType={"❌"}
            isSelected={voteType == "negative"}
            onPress={() => vote("negative")}
          />
          <VoteBox
            voteType={"❔"}
            isSelected={voteType == "neutral"}
            onPress={() => vote("neutral")}
          />

          <VoteBox
            voteType={"✔️"}
            isSelected={voteType == "positive"}
            onPress={() => vote("positive")}
          />




        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VotingPage;
