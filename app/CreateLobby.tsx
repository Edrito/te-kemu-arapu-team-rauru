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

const CreateLobby = () => {
  // Path to current player icon
  const playerIconTest = "../assets/images/react-logo.png";

  // Handles the add game to list
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [gameMode, setGameMode] = useState("Select Game Mode");
  // Array holds the game modes that the user has added to the lobby
  const [selectedGameModes, SetSelectedGameModes] = useState<string[]>([]);

  const [lobbyName, setLobbyName] = useState("");

  // State for end conditions
  const [maxScore, setMaxScore] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [maxCategories, setMaxCategories] = useState("");

  const [maxLobbyScore, setMaxLobbyScore] = useState("");
  const [maxLobbyPlayerScore, setMaxLobbyPlayerScore] = useState("");
  const [lobbyTimeLimit, setLobbyTimeLimit] = useState("");

  // This is used to create the lobby once the user has selected all the configurations for a gamemode
  const createGameMode = () => {
    if (gameMode !== "Select Game Mode") {
      SetSelectedGameModes([...selectedGameModes, gameMode]);
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

// Function to only allow numbers into game options
  const numbersOnly = (input: any, setOption: any) => {
    const numericText = input.replace(/[^0-9]/g, "");
    setOption(numericText);
  };

  // Function to only allow numbers into game option with a max number
  const numbersOnlyWithMax = (input: any, setOption:any) => {
    const numericText = input.replace(/[^0-9]/g, "");
    const numericValue = parseInt(numericText, 10);

    if (!isNaN(numericValue) && numericValue <= 10) {
      setOption(numericText);
    } else if (numericText === "") {
      setOption("");
    }
  };

  // Renders Game Modes into list
  const renderGameModeView = (mode: any, index: number) => {
    switch (mode) {
      case "Category":
        return (
          <View className="w-full flex-row justify-start items-center border-2 bg-green-950">
            <Text className="font-pangolin text-[30px] text-white border-2 border-dashed p-1 text-center">
              {index + 1}
            </Text>
            <Text className="font-pangolin text-[30px] text-white text-center ml-2">
              {mode}
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
              {mode}
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
                      onChangeText={(input) => numbersOnly(input, setMaxScore)}
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
                      onChangeText={(input) => numbersOnly(input, setTimeLimit)}
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
                      onChangeText={(input) => numbersOnlyWithMax(input, setMaxCategories)}
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
              onChangeText={(input) => numbersOnly(input, setMaxLobbyScore)}
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
              onChangeText={(input) => numbersOnly(input, setMaxLobbyPlayerScore)}
              value={maxLobbyPlayerScore}
              placeholder="-"
              keyboardType="numeric"
            />
          </View>

          {/* Time Limit row */}
          <View className="flex-row p-1 justify-between items-center">
            <Text className="text-center text-[30px] text-white border-2 border-dashed bg-green-900 p-2 m-2 font-pangolin rounded-lg w-[50%]">
              Time Limit (s):
            </Text>
            <TextInput
              className="border-2 border-dashed text-center bg-orange-400 text-[30px] p-2 m-2 w-[40%]"
              onChangeText={(input) => numbersOnly(input, setLobbyTimeLimit)}
              value={lobbyTimeLimit}
              placeholder="-"
              keyboardType="numeric"
            />
          </View>
        </ScrollView>
        <View className=" flex-wrap items-center m-10">
          <TextInput
            className="border-2 border-dashed text-center bg-orange-500 text-[30px] p-2 m-2 min-w-[80%]"
            onChangeText={setLobbyName}
            value={lobbyName}
            placeholder="-"
          />
          {/* TODO: add an onpress to direct to next page */}
          <TouchableOpacity onPress={() => router.push("/PreGameLobby")} className="border-2 border-dashed rounded-lg p-2 bg-orange-500 font-pangolin text-white text-[30px] m-2 text-center w-[40%]">
            Submit
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateLobby;
