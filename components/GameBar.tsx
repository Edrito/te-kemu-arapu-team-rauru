import React, { useState } from "react";
import { View, Text, Pressable, Image, Modal } from "react-native";
import Scoreboard from "te-kemu-arapu-compx374-team-rauru/components/Scoreboard";
import "../global.css";
import { GameScreenParams } from "../app/types";
import { useLanguage } from "../context/languageToggleButton";
import { useGame } from "te-kemu-arapu-compx374-team-rauru/context/GameContext";


import { router } from "expo-router";




const GameBar: React.FC<GameScreenParams> = ({ mainState, gameId, lobbyCode, playerProfiles }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { toggleLanguage, displayLanguage, getText } = useLanguage();
  const { gameState, resetGameState } = useGame();

  const inGame = mainState.isLobbyOpen == false;

  const changeLanguage = () => {
    toggleLanguage();
  };

  return (
    <View className="flex w-full  flex-row bg-red-500 flex-wrap justify-between items-center p-2 px-4">
      {/* Score Button */}
      <Pressable onPress={() => setIsModalVisible(true)}>
        <Text className="text-[30px] font-bold font-pangolin m-2 p-2 border-2 border-dashed bg-orange-500">
          {getText("scores")}
        </Text>
      </Pressable>

      <Modal
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View className="flex-1 items-center  p-[20px] bg-primary_red">
        <Pressable onPress={() => setIsModalVisible(false)}>
            <Text className="text-[30px] border-2 border-black border-dashed bg-orange-500 p-0.5 px-5 m-7">
              Close
            </Text>
          </Pressable>
          <View className="border-2 border-dashed m-10">
            <Scoreboard playerScores={mainState.state.scores} playerProfiles={playerProfiles}
              isEndGame={false}
            />
          </View>

        
        </View>
      </Modal>
     

      {
        inGame ? <Pressable onPress={() => {
          resetGameState();
          router.push("/MainPage");
        }}>
          <Text className="text-[30px] font-bold font-pangolin m-2 p-2 border-2 border-dashed bg-red-700">
            {getText("leaveGame")}
          </Text>

        </Pressable>
          : null
      }

{
        inGame ?
          <Text className="text-[30px] font-bold font-pangolin">
            {getText("lobbyCode")} {lobbyCode}
          </Text>
          : null
      }


      {/* Language change button */}
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

export default GameBar;
