import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PlayerBar from "te-kemu-arapu-compx374-team-rauru/components/PlayerBar";
import GameModeDropdown from "te-kemu-arapu-compx374-team-rauru/components/GameModeDropdown";
import { router } from "expo-router";
import { Game, Games, GameEndConditions, GameSettings, LobbyEndConditions } from "./types";
import { useGame } from '../context/GameContext';



const CreateLobby = () => {
  // Path to current player icon
  const playerIconTest = "../assets/images/react-logo.png";
  const { gameState, lobbyUpsert } = useGame();
  const [errorMessage, setErrorMessage] = useState("");


  // Handles the add game to list
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [gameMode, setGameMode] = useState("Select Game Mode");
  // Array holds the game modes that the user has added to the lobby
  const [selectedGameModes, setSelectedGameModes] = useState<Game[]>([]);

  const [lobbyName, setLobbyName] = useState("");

  // State for end conditions
  const [maxScore, setMaxScore] = useState("5");
  const [timeLimit, setTimeLimit] = useState("15");
  const [maxCategories, setMaxCategories] = useState("3");

  const [maxLobbyScore, setMaxLobbyScore] = useState("50");
  const [maxLobbyPlayerScore, setMaxLobbyPlayerScore] = useState("15");
  const [lobbyTimeLimit, setLobbyTimeLimit] = useState("25");


  const submit = async () => {
    try {
    const name = lobbyName;
    const maxScore = parseInt(maxLobbyScore);
    const maxPlayerScore = parseInt(maxLobbyPlayerScore);
    const timeLimit = parseInt(lobbyTimeLimit);



    const games: Games = {};
      for (let i = 0; i < selectedGameModes.length; i++) {
        const game = selectedGameModes[i];
        games[i.toString()] = game;
      }
    console.log("Games: ", games);
    const lobbyEndConditions: LobbyEndConditions = {

      score: maxScore,
      playerScore: maxPlayerScore,
      time: timeLimit
    };

    console .log("Lobby End Conditions: ", lobbyEndConditions);
    const gameSettings: GameSettings = {
        games: games,
        endConditions: lobbyEndConditions,
        lobbyName: name
    };
    console.log("Game Settings: ", gameSettings);
    const data: { lobbyCode: string } = await lobbyUpsert(gameSettings);


    router.push({
      pathname: "/Game",
      params: data,
    }
    );

  } catch (error) {
    console.error("Error creating lobby:", error);
    setErrorMessage("Failed to create lobby");
  }


  };

  // This is used to create the lobby once the user has selected all the configurations for a gamemode
  const createGameMode = () => {
    if (gameMode !== "Select Game Mode") {

      //Try parse int for the values
      const tempMaxScore = parseInt(maxScore);
      const tempTimeLimit = parseInt(timeLimit);
      const tempMaxCategories = parseInt(maxCategories);

      const tempEndConditions: GameEndConditions = {
        score: tempMaxScore,
        time: tempTimeLimit,
        maxCategories: tempMaxCategories
      };


      const tempGame: Game = {
        type: gameMode,
        endConditions: tempEndConditions
      };

     

      
      setSelectedGameModes([...selectedGameModes, tempGame]);

      console.log("Game Mode: ", selectedGameModes);

      // Reset the values
      setGameMode("Select Game Mode");
      setMaxScore("5");
      setTimeLimit("15");
      setMaxCategories("3");


    }
    setIsModalVisible(false);
  };

  // This is so that the page changes size in real time when screen size changes
  const [windowDimensions, setWindowDimensions] = useState(
    Dimensions.get("window")
  );
  useEffect(() => {
    // Function to handle resizing of the window
    const resizeScreen = () => {
      // Update the state with the current window dimensions
      setWindowDimensions(Dimensions.get("window"));
    };

    // Listen to changes in screen size
    const subscription = Dimensions.addEventListener("change", resizeScreen);

    // End listener
    return () => subscription?.remove();
  }, []);

  // Function to only allow numbers into game option with a max number
  const numbersOnlyWithMax = (input: any, maxNumber: any, setOption: any) => {
    const numericText = input.replace(/[^0-9]/g, "");
    // Base 10 number parsing
    const numericValue = parseInt(numericText, 10);

    if (!isNaN(numericValue) && numericValue <= maxNumber) {
      setOption(numericText);
    } else if (numericText === "") {
      setOption("");
    }
  };

  // Renders Game Modes into list
  const renderGameModeView = (mode: Game, index: number) => {
    switch (mode.type) {
      case "Category":
        return (
          <View className="w-full flex-row justify-start items-center border-2 bg-green-950">
            <Text className="font-pangolin text-[30px] text-white border-2 border-dashed p-1 text-center">
              {index + 1}
            </Text>
            <Text className="font-pangolin text-[30px] text-white text-center ml-2">
              {mode.type}
            </Text>
          </View>
        );
      case "Random":
        return (
          <View className="w-full flex-row justify-start items-center border-2 bg-green-950">
            <Text className="font-pangolin text-[30px] text-white border-2 border-dashed p-1 text-center">
              {index + 1}
            </Text>
            <Text className="font-pangolin text-[30px] text-white text-center ml-2">
            {mode.type}
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary_red items-center">
      {/* This view holds the playerbar */}
      <View className="w-full">
        <PlayerBar playerIcon={playerIconTest} />
      </View>

      {/* This view contains the content of the page */}
      <ScrollView
        style={{
          flex: 1,
          padding: 2,
          minWidth: windowDimensions.width < 1036 ? "90%" : "40%",
          maxWidth: windowDimensions.width < 1036 ? "90%" : "40%",
        }}
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 20,
        }}
      >
        <Text className="text-[50px] text-white font-pangolin m-2">
          Create Lobby
        </Text>

        <Text className="text-[30px] text-white font-pangolin m-2 border-2 border-dashed rounded-lg p-2 bg-green-700 w-full text-center">
          Games
        </Text>

        <View className="w-full max-h-[300px]">
          <ScrollView className="border-2 border-dashed rounded-lg bg-orange-500 p-3 w-full flex-1">
            {selectedGameModes.map((gameMode, index) => (
              <View key={index}>{renderGameModeView(gameMode, index)}</View>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          className="border-2 border-dashed rounded-lg p-2 bg-orange-500 font-pangolin text-white text-[30px] m-2 text-center w-[80%]"
        >
          Add Game Mode
        </TouchableOpacity>

        <Modal
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          {/* This view holds the contents of 'Add Game Mode' screen */}
          <View className="flex-1 justify-center items-center bg-primary_red p-10">
            <GameModeDropdown onSelect={setGameMode} />

            {/* This is the view that holds GAME end conditions */}
            <ScrollView
              className="flex-1 max-w-[50%] p-2"
              contentContainerStyle={{
                alignItems: "center",
                paddingBottom: 20,
              }}
            >
              {/* Each view here holds a row */}

              {/* Only display inputs if a valid game mode is selected */}
              {gameMode !== "Select Game Mode" && (
                <>
                  {/* Max Score row */}
                  <View className="flex-row p-1 justify-between items-center">
                    <Text className="text-center text-[30px] text-white border-2 border-dashed bg-green-900 p-2 m-2 font-pangolin rounded-lg w-[50%]">
                      Max Score:
                    </Text>
                    <TextInput
                      className="border-2 border-dashed text-center bg-orange-400 text-[30px] p-2 m-2 w-[40%]"
                      onChangeText={(input) => numbersOnlyWithMax(input, 99, setMaxScore)}
                      value={maxScore}
                      placeholder="-"
                      keyboardType="numeric"
                    />
                  </View>

                  {/* Time Limit row */}
                  <View className="flex-row p-1 justify-between items-center">
                    <Text className="text-center text-[30px] text-white border-2 border-dashed bg-green-900 p-2 m-2 font-pangolin rounded-lg w-[50%]">
                      Time Limit:
                    </Text>
                    <TextInput
                      className="border-2 border-dashed text-center bg-orange-400 text-[30px] p-2 m-2 w-[40%]"
                      onChangeText={(input) => numbersOnlyWithMax(input, 30, setTimeLimit)}
                      value={timeLimit}
                      placeholder="-"
                      keyboardType="numeric"
                    />
                  </View>

                  {/* Max Categories row */}
                  <View className="flex-row p-1 justify-between items-center">
                    <Text className="text-center text-[30px] text-white border-2 border-dashed bg-green-900 p-2 m-2 font-pangolin rounded-lg w-[50%]">
                      Max Categories:
                    </Text>
                    <TextInput
                      className="border-2 border-dashed text-center bg-orange-400 text-[30px] p-2 m-2 w-[40%]"
                      onChangeText={(input) => numbersOnlyWithMax(input, 10, setMaxCategories)}
                      value={maxCategories}
                      placeholder="-"
                      keyboardType="numeric"
                    />
                  </View>
                </>
              )}
            </ScrollView>

            <View className="flex-row p-1 justify-between items-center">
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Text className="text-[30px] border-2 border-black border-dashed bg-orange-500 p-0.5 px-5 m-1 rounded">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => createGameMode()}>
                <Text className="text-[30px] border-2 border-black border-dashed bg-orange-500 p-0.5 px-5 m-1 rounded">
                  Add
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Text className="text-[30px] text-white font-pangolin m-2 border-2 border-dashed rounded-lg p-2 bg-green-700 w-full text-center">
          Lobby End Conditions
        </Text>

        {/* This view holds the Lobby end condition items */}
        <ScrollView className="border-2 border-dashed rounded-lg bg-green-700 p-3 w-full flex-grow">
          {/* Each view here holds a row */}
          {/* Max Total Score row */}
          <View className="flex-row p-1 justify-between items-center">
            <Text className="text-center text-[30px] text-white border-2 border-dashed bg-green-900 p-2 m-2 font-pangolin rounded-lg w-[50%]">
              Max Total Score:
            </Text>
            <TextInput
              className="border-2 border-dashed text-center bg-orange-400 text-[30px] p-2 m-2 w-[40%]"
              onChangeText={(input) => numbersOnlyWithMax(input, 99, setMaxLobbyScore)}
              value={maxLobbyScore}
              placeholder="-"
              keyboardType="numeric"
            />
          </View>

          {/* Max Player Score row */}
          <View className="flex-row p-1 justify-between items-center">
            <Text className="text-center text-[30px] text-white border-2 border-dashed bg-green-900 p-2 m-2 font-pangolin rounded-lg w-[50%]">
              Max Player Score:
            </Text>
            <TextInput
              className="border-2 border-dashed text-center bg-orange-400 text-[30px] p-2 m-2 w-[40%]"
              onChangeText={(input) => numbersOnlyWithMax(input, 99, setMaxLobbyPlayerScore)}
              value={maxLobbyPlayerScore}
              placeholder="-"
              keyboardType="numeric"
            />
          </View>

          {/* Time Limit row */}
          <View className="flex-row p-1 justify-between items-center">
            <Text className="text-center text-[30px] text-white border-2 border-dashed bg-green-900 p-2 m-2 font-pangolin rounded-lg w-[50%]">
              Time Limit (m):
            </Text>
            <TextInput
              className="border-2 border-dashed text-center bg-orange-400 text-[30px] p-2 m-2 w-[40%]"
              onChangeText={(input) => numbersOnlyWithMax(input, 5, setLobbyTimeLimit)}
              value={lobbyTimeLimit}
              placeholder="-"
              keyboardType="numeric"
            />
          </View>
        </ScrollView>
        <View className=" flex-col items-center m-10">
          <View className="flex-row justify-between items-center">
            <Text className="text-center text-[30px] text-white p-2 m-2 font-pangolin rounded-lg w-[50%]">
              Lobby Name
            </Text>
            <TextInput
              className="border-2 border-dashed text-center bg-orange-500 text-[30px] p-2 m-2 min-w-[80%]"
              onChangeText={setLobbyName}
              value={lobbyName}
              placeholder="-"
            />
            <View />
            {/* TODO: add an onpress to direct to next page */}
          </View>
          <TouchableOpacity onPress={submit} className="border-2 border-dashed rounded-lg p-2 bg-orange-500 font-pangolin text-white text-[30px] m-2 text-center w-[40%]">
            Submit
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateLobby;
