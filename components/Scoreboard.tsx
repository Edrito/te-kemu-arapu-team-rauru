import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions, Pressable } from "react-native";
import { firestore } from "../firebaseConfig";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from "expo-router";
import '../global.css';
import { useGame } from "../context/GameContext";


interface PlayerData {
  id: string;
  score: number;
  icon: string;
  name: string;
}

interface ScoreboardProps {
  players: { [playerId: string]: number; }
}

const Scoreboard: React.FC<ScoreboardProps> = ({ players }) => {
  const [playerData, setPlayerData] = useState<PlayerData[]>([]);
  const [windowDimensions, setWindowDimensions] = useState(Dimensions.get("window"));
  const { resetGameState } = useGame();
  const router = useRouter();

  useEffect(() => {
    if(players == null) {
      return;
    }
    const fetchPlayerData = async () => {
      const playerDataPromises = Object.keys(players).map(async (playerId) => {
        const player = { id: playerId, score: players[playerId] };
        const profilesCollection = collection(firestore, "profiles");
        const profileQuery = query(profilesCollection, where("userId", "==", player.id));
        const profileSnapshot = await getDocs(profileQuery);

        const playerInfo = profileSnapshot.docs.length == 0 ? {} : profileSnapshot.docs[0].data();

        return {
          id: player.id,
          score: player.score,
          icon: playerInfo?.icon || "",
          name: playerInfo?.username || "",
        };
      });

      const resolvedPlayerData = await Promise.all(playerDataPromises);
      setPlayerData(resolvedPlayerData.sort((a, b) => b.score - a.score));
    };

    fetchPlayerData();
  }, [players]);

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
          height: 600,
          minWidth: windowDimensions.width < 700 ? 300 : 500,
        }}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      >
        {playerData.map((player, index) => (
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
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>{player.name}</Text>
            <Text style={{ fontSize: 24 }}>{player.score}</Text>
            
          </View>
        ))}
        <Pressable
          onPress={handlePress}
          className="bg-yellow-500 p-4 rounded-lg border-2 border-black mt-5 mx-auto w-3/4"
        >
          <Text className="text-xl font-bold text-center">Go to MainPage</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};
export default Scoreboard;

