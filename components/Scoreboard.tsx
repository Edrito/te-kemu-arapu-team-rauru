import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions, Pressable } from "react-native";
import { firestore } from "../firebaseConfig";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from "expo-router";
import '../global.css';
import { useGame } from "../context/GameContext";
import { ProfileData } from "te-kemu-arapu-compx374-team-rauru/app/types";
import { useLanguage } from "te-kemu-arapu-compx374-team-rauru/context/languageToggleButton";



interface ScoreboardProps {
  playerScores: { [playerId: string]: number; }
  playerProfiles: ProfileData[];
  isEndGame: boolean;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ playerScores, playerProfiles,isEndGame }) => {
  const [windowDimensions, setWindowDimensions] = useState(Dimensions.get("window"));
  const { resetGameState } = useGame();
  const router = useRouter();
  const { getText } = useLanguage();

 


  useEffect(() => {
    const resizeScreen = () => {
      setWindowDimensions(Dimensions.get("window"));
    };

    const subscription = Dimensions.addEventListener("change", resizeScreen);

    return () => subscription?.remove();
  }, []);

  const handlePress = () => {
    resetGameState();
    router.push('/MainPage');
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#c97d1a", padding: 20 }}>
      <ScrollView
        style={{
          height: 500,
          minWidth: windowDimensions.width < 700 ? 300 : 500,
        }}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      >
        {playerProfiles.map((player, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#F4DE9B",
              padding: 20,
              borderRadius: 10,
              marginBottom: 10,
              marginRight: 10,
            }}
          >
            <Text style={{ fontSize: 24 }}>{player.icon}</Text>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>{player.username}</Text>
            <Text style={{ fontSize: 24 }}>{playerScores[player.userId] ?? 0}</Text>
            
          </View>
        ))}
       {isEndGame? <Pressable
          onPress={handlePress}
          className="bg-yellow-500 p-4 rounded-lg border-2 border-black mt-5 mx-auto w-3/4"
        >
          <Text className="text-xl font-bold text-center">{getText('close')}</Text>
        </Pressable>: null}
      </ScrollView>
    </View>
  );
};
export default Scoreboard;

