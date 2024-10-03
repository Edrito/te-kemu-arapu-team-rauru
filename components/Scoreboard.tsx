import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { firestore } from "../firebaseConfig"; // Adjust the path as necessary
import { collection, query, where, onSnapshot, getDocs } from 'firebase/firestore';


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
      </ScrollView>
    </View>
  );
};

export default Scoreboard;
