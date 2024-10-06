import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PlayerBar from "te-kemu-arapu-compx374-team-rauru/components/PlayerBar";
import GameModeDropdown from "te-kemu-arapu-compx374-team-rauru/components/GameModeDropdown";

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
  // TODO: somehow make text input accept numbers only
  const [maxScore, setMaxScore] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [maxCategories, setMaxCategories] = useState("");

  const [maxLobbyScore, setMaxLobbyScore] = useState("");
  const [maxLobbyPlayerScore, setMaxLobbyPlayerScore] = useState("");
  const [lobbyTimeLimit, setLobbyTimeLimit] = useState("");

  // Handles create button press
  // This is used to create the lobby once the user has selected all the configurations for a gamemode
  const createGameMode = () => {
    if (gameMode !== "Select Game Mode") {
      SetSelectedGameModes([...selectedGameModes, gameMode]);
    }
    setIsModalVisible(false);
  };

  // Handles max number of categories allowed
  // const [inputMaxCategories, setinputMaxCategories] = useState("");
  // const MAX_CATEGORIES = 10;
  // const handleMaxCategories = (text: any) => {
  //   const value = Number(text);
  //   if (!isNaN(value) && value <= MAX_CATEGORIES) {
  //     setinputMaxCategories(text);
  //   }
  // };

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
        className="flex-1 max-w-[50%] p-2"
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

        <ScrollView className="border-2 border-dashed rounded-lg bg-orange-500 p-3 w-full flex-1">
          {selectedGameModes.map((gameMode, index) => (
            <View key={index}>{renderGameModeView(gameMode, index)}</View>
          ))}
        </ScrollView>

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
                      onChangeText={setMaxScore}
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
                      onChangeText={setTimeLimit}
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
                      onChangeText={setMaxCategories} // Use your max categories handler
                      value={maxCategories} // Update to use the right state
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
        <ScrollView className="border-2 border-dashed rounded-lg bg-green-700 p-3 w-full flex-1">
          {/* Each view here holds a row */}
          {/* Max Total Score row */}
          <View className="flex-row p-1 justify-between items-center">
            <Text className="text-center text-[30px] text-white border-2 border-dashed bg-green-900 p-2 m-2 font-pangolin rounded-lg w-[50%]">
              Max Total Score
            </Text>
            <TextInput
              className="border-2 border-dashed text-center bg-orange-400 text-[30px] p-2 m-2 w-[40%]"
              onChangeText={setMaxLobbyScore}
              value={maxLobbyScore}
              placeholder="-"
              keyboardType="numeric"
            />
          </View>

          {/* Max Player Score row */}
          <View className="flex-row p-1 justify-between items-center">
            <Text className="text-center text-[30px] text-white border-2 border-dashed bg-green-900 p-2 m-2 font-pangolin rounded-lg w-[50%]">
              Max Player Score
            </Text>
            <TextInput
              className="border-2 border-dashed text-center bg-orange-400 text-[30px] p-2 m-2 w-[40%]"
              onChangeText={setMaxLobbyPlayerScore}
              value={maxLobbyPlayerScore}
              placeholder="-"
              keyboardType="numeric"
            />
          </View>

          {/* Time Limit row */}
          <View className="flex-row p-1 justify-between items-center">
            <Text className="text-center text-[30px] text-white border-2 border-dashed bg-green-900 p-2 m-2 font-pangolin rounded-lg w-[50%]">
              Time Limit
            </Text>
            <TextInput
              className="border-2 border-dashed text-center bg-orange-400 text-[30px] p-2 m-2 w-[40%]"
              onChangeText={setLobbyTimeLimit}
              value={lobbyTimeLimit}
              placeholder="-"
              keyboardType="numeric"
            />
          </View>
        </ScrollView>
        <View className="flex-row">
          <TextInput
            className="border-2 border-dashed text-center bg-orange-500 text-[30px] p-2 m-2 min-w-[80%]"
            onChangeText={setLobbyName}
            value={lobbyName}
            placeholder="-"
          />
          {/* TODO: add an onpress to direct to next page */}
          <TouchableOpacity className="border-2 border-dashed rounded-lg p-2 bg-orange-500 font-pangolin text-white text-[30px] m-2 text-center w-[20%]">
            Submit
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateLobby;
