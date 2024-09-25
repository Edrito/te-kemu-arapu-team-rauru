import React from "react";
import { View, Text, ScrollView} from "react-native";

interface Player {
  icon: string;
  name: string;
  score: number;
}

// Need to provide array of players when calling this component
interface ScoreboardProps {
  players: Player[];
}

const Scoreboard: React.FC<ScoreboardProps> = ({ players }) => {

  // Creates a new sorted array
  const sortedPlayers = [...players].sort((a,b) => b.score - a.score)

  return (
    <View style={{ flex: 1, backgroundColor: "#c97d1a", padding: 20 }}>
      <ScrollView
        style={{
          height: 600,
          width: 500,
        }}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      >
        {sortedPlayers.map((player, index) => (
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
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              {player.name}
            </Text>
            <Text style={{ fontSize: 24 }}>{player.score}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Scoreboard;
