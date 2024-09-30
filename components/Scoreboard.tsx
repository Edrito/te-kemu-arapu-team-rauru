import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions} from "react-native";

interface Player {
  icon: string;
  name: string;
  score: number;
}

interface ScoreboardProps {
  players: Player[];
}

// Need to provide array of players when calling this component
const Scoreboard: React.FC<ScoreboardProps> = ({ players }) => {

  // Creates a new sorted array
  const sortedPlayers = [...players].sort((a,b) => b.score - a.score)

  const [windowDimensions, setWindowDimensions] = useState(Dimensions.get('window'));

  // This is so that scoreboard changes size in real time when screen size changes
  useEffect(() => {
    // Function to handle resizing of the window
    const resizeScreen = () => {
      // Update the state with the current window dimensions
      setWindowDimensions(Dimensions.get('window'));
    };
  
    // Listen to changes in screen size
    const subscription = Dimensions.addEventListener('change', resizeScreen);
    
    // End listener
    return () => subscription?.remove();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#c97d1a", padding: 20 }}>
      <ScrollView
        style={{
          height: 600,
          minWidth: (windowDimensions.width < 700) ? 300 : 500,
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
