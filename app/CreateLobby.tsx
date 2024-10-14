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
import {
  Game,
  Games,
  GameEndConditions,
  GameSettings,
  LobbyEndConditions,
} from "./types";
import { useGame } from "../context/GameContext";
import { useLanguage } from "../context/languageToggleButton";

const CreateLobby = () => {
  const playerIconTest = "../assets/images/react-logo.png";
  const { gameState, lobbyUpsert } = useGame();
  const [errorMessage, setErrorMessage] = useState("");
  const { getText } = useLanguage();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [gameMode, setGameMode] = useState("Select Game Mode");
  const [selectedGameModes, setSelectedGameModes] = useState<Game[]>([]);
  const [lobbyName, setLobbyName] = useState("");

  const [maxScore, setMaxScore] = useState("5");
  const [timeLimit, setTimeLimit] = useState("15");
  const [maxCategories, setMaxCategories] = useState("3");

  const [maxLobbyScore, setMaxLobbyScore] = useState("50");
  const [maxLobbyPlayerScore, setMaxLobbyPlayerScore] = useState("15");
  const [lobbyTimeLimit, setLobbyTimeLimit] = useState("25");

  const submit = async () => {
    try {
      if (!lobbyName) {
        setErrorMessage("Please enter a lobby name");
        return;
      }

      const name = lobbyName;
      const maxScore = parseInt(maxLobbyScore);
      const maxPlayerScore = parseInt(maxLobbyPlayerScore);
      const timeLimit = parseInt(lobbyTimeLimit);

      const games: Games = {};
      for (let i = 0; i < selectedGameModes.length; i++) {
        const game = selectedGameModes[i];
        games[i.toString()] = game;
      }

      const lobbyEndConditions: LobbyEndConditions = {
        score: maxScore,
        playerScore: maxPlayerScore,
        time: timeLimit,
      };

      const gameSettings: GameSettings = {
        games: games,
        endConditions: lobbyEndConditions,
        lobbyName: name,
      };

      const data: { lobbyCode: string } = await lobbyUpsert(gameSettings);

      router.push({
        pathname: "/Game",
        params: data,
      });
    } catch (error) {
      console.error("Error creating lobby:", error);
      setErrorMessage("Failed to create lobby");
    }
  };

  const createGameMode = () => {
    if (gameMode !== "Select Game Mode") {
      const tempMaxScore = parseInt(maxScore);
      const tempTimeLimit = parseInt(timeLimit);
      const tempMaxCategories = parseInt(maxCategories);

      const tempEndConditions: GameEndConditions = {
        score: tempMaxScore,
        time: tempTimeLimit,
        maxCategories: tempMaxCategories,
      };

      const tempGame: Game = {
        type: gameMode.toLowerCase(),
        endConditions: tempEndConditions,
      };

      setSelectedGameModes([...selectedGameModes, tempGame]);

      setGameMode("Select Game Mode");
      setMaxScore("5");
      setTimeLimit("15");
      setMaxCategories("3");
    }
    setIsModalVisible(false);
  };

  const [windowDimensions, setWindowDimensions] = useState(
    Dimensions.get("window")
  );
  useEffect(() => {
    const resizeScreen = () => {
      setWindowDimensions(Dimensions.get("window"));
    };

    const subscription = Dimensions.addEventListener("change", resizeScreen);

    return () => subscription?.remove();
  }, []);

  const numbersOnlyWithMax = (input: any, maxNumber: any, setOption: any) => {
    const numericText = input.replace(/[^0-9]/g, "");
    const numericValue = parseInt(numericText, 10);

    if (!isNaN(numericValue) && numericValue <= maxNumber) {
      setOption(numericText);
    } else if (numericText === "") {
      setOption("");
    }
  };

  const renderGameModeView = (mode: Game, index: number) => {
    switch (mode.type) {
      case "category":
      case "random":
        return (
          <View className="w-full flex-row justify-start items-center border-2 bg-green-950">
            {/* <Text className="font-pangolin text-[30px] text-white border-2 border-dashed p-1 text-center">
              {index + 1}
            </Text> */}
            <Text className="font-pangolin text-[30px] text-white text-center ml-2">
                {mode.type.charAt(0).toUpperCase() + mode.type.slice(1).toLowerCase()}
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary_red items-center">
      <View className="w-full">
        <PlayerBar playerIcon={playerIconTest} />
      </View>

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
          {getText("createLobby")}
        </Text>

        <Text className="text-[30px] text-white font-pangolin m-2 border-2 border-dashed rounded-lg p-2 bg-green-700 w-full text-center">
          {getText("games")}
        </Text>

        <View className="w-full max-h-[300px] min-h-[100px]">
          <ScrollView className="border-2 border-dashed rounded-lg bg-green-700 p-3 w-full flex-1">
            {selectedGameModes.map((gameMode, index) => (
              <View key={index}>{renderGameModeView(gameMode, index)}</View>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          className="border-2 border-dashed rounded-lg p-2 bg-orange-500 font-pangolin text-white text-[30px] m-2 text-center w-[80%]"
        >
          <Text className="text-white text-[30px] font-pangolin text-center">
            {getText("addGameType")}
          </Text>
        </TouchableOpacity>

        {/* Corrected Modal implementation */}
        <Modal
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
          animationType="slide"
          presentationStyle="pageSheet"
        >
          <View className="flex-1 justify-center items-center bg-primary_red p-8">
            <Text className="text-center text-[30px] text-white p-2 m-2 font-pangolin rounded-lg w-[50%]">
              {getText("chooseGameMode")}:
            </Text>
            <GameModeDropdown onSelect={setGameMode} />

            <ScrollView
              style={{
                flex: 1,
                padding: 3,
                marginTop: 10,
                borderWidth: 2,
                borderStyle: "dashed",
                borderRadius: 10,
                backgroundColor: "#aa2424",
                minWidth: windowDimensions.width < 1036 ? "100%" : "50%",
                maxWidth: windowDimensions.width < 1036 ? "100%" : "50%",
              }}
              // className="flex-1 max-w-[50%] p-2"
              contentContainerStyle={{
                alignItems: "center",
                paddingBottom: 20,
              }}
            >
              {gameMode !== "Select Game Mode" && (
                <>
                  <Text className="text-center text-[30px] text-white p-2 m-2 font-pangolin rounded-lg w-[50%]">
                    {getText("setLobbyEnd")}:
                  </Text>
                  <View className="flex-row p-1 justify-between items-center">
                    <Text className="text-center text-[30px] text-white border-2 border-dashed bg-green-900 p-2 m-2 font-pangolin rounded-lg w-[50%]">
                      {getText("maxTotalScore")}:
                    </Text>
                    <TextInput
                      className="border-2 border-dashed text-center bg-orange-400 text-[30px] p-2 m-2 w-[40%] font-pangolin"
                      onChangeText={(input) =>
                        numbersOnlyWithMax(input, 99, setMaxScore)
                      }
                      value={maxScore}
                      placeholder="-"
                      inputMode="numeric"
                    />
                  </View>

                  <View className="flex-row p-1 justify-between items-center">
                    <Text className="text-center text-[30px] text-white border-2 border-dashed bg-green-900 p-2 m-2 font-pangolin rounded-lg w-[50%]">
                      {getText("timeLimit")} (m):
                    </Text>
                    <TextInput
                      className="border-2 border-dashed text-center bg-orange-400 text-[30px] p-2 m-2 w-[40%] font-pangolin"
                      onChangeText={(input) =>
                        numbersOnlyWithMax(input, 30, setTimeLimit)
                      }
                      value={timeLimit}
                      placeholder="-"
                      inputMode="numeric"
                    />
                  </View>

                  <View className="flex-row p-1 justify-between items-center">
                    <Text className="text-center text-[30px] text-white border-2 border-dashed bg-green-900 p-2 m-2 font-pangolin rounded-lg w-[50%]">
                      {getText("maxCategories")}:
                    </Text>
                    <TextInput
                      className="border-2 border-dashed text-center bg-orange-400 text-[30px] p-2 m-2 w-[40%] font-pangolin"
                      onChangeText={(input) =>
                        numbersOnlyWithMax(input, 10, setMaxCategories)
                      }
                      value={maxCategories}
                      placeholder="-"
                      inputMode="numeric"
                    />
                  </View>
                </>
              )}
            </ScrollView>

            <View className="flex-row p-1 justify-between items-center">
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Text className="text-[30px] border-2 border-black border-dashed bg-orange-500 p-0.5 px-5 m-1 rounded font-pangolin">
                  {getText("cancel")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => createGameMode()}>
                <Text className="text-[30px] border-2 border-black border-dashed bg-orange-500 p-0.5 px-5 m-1 rounded font-pangolin">
                  {getText("add")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Text className="text-[30px] text-white font-pangolin m-2 border-2 border-dashed rounded-lg p-2 bg-green-700 w-full text-center">
          {getText("setLobbyEnd")}
        </Text>

        <ScrollView className="border-2 border-dashed rounded-lg bg-green-700 p-3 w-full flex-grow">
          <View className="flex-row p-1 justify-between items-center">
            <Text className="text-center text-[30px] text-white border-2 border-dashed bg-green-900 p-2 m-2 font-pangolin rounded-lg w-[50%]">
              {getText("maxTotalScore")}:
            </Text>
            <TextInput
              className="border-2 border-dashed text-center bg-orange-400 text-[30px] p-2 m-2 w-[40%] font-pangolin"
              onChangeText={(input) =>
                numbersOnlyWithMax(input, 99, setMaxLobbyScore)
              }
              value={maxLobbyScore}
              placeholder="-"
              inputMode="numeric"
            />
          </View>

          <View className="flex-row p-1 justify-between items-center">
            <Text className="text-center text-[30px] text-white border-2 border-dashed bg-green-900 p-2 m-2 font-pangolin rounded-lg w-[50%]">
              {getText("maxPlayerScore")}:
            </Text>
            <TextInput
              className="border-2 border-dashed text-center bg-orange-400 text-[30px] p-2 m-2 w-[40%] font-pangolin"
              onChangeText={(input) =>
                numbersOnlyWithMax(input, 99, setMaxLobbyPlayerScore)
              }
              value={maxLobbyPlayerScore}
              placeholder="-"
              inputMode="numeric"
            />
          </View>

          <View className="flex-row p-1 justify-between items-center">
            <Text className="text-center text-[30px] text-white border-2 border-dashed bg-green-900 p-2 m-2 font-pangolin rounded-lg w-[50%]">
              {getText('timeLimit')} (m):
            </Text>
            <TextInput
              className="border-2 border-dashed text-center bg-orange-400 text-[30px] p-2 m-2 w-[40%] font-pangolin"
              onChangeText={(input) =>
                numbersOnlyWithMax(input, 5, setLobbyTimeLimit)
              }
              value={lobbyTimeLimit}
              placeholder="-"
              inputMode="numeric"
            />
          </View>
        </ScrollView>

        <View className="flex-col items-center m-5">
          <View className="flex-row justify-between items-center">
            <Text className="text-center text-[30px] text-white p-2 m-2 font-pangolin rounded-lg w-[50%]">
              {getText("lobbyName")}:
            </Text>
            <TextInput
              className="border-2 border-dashed text-center bg-orange-500 text-[30px] p-2 m-2 w-[60%]"
              onChangeText={setLobbyName}
              value={lobbyName}
              placeholder="-"
            />
          </View>

          <View className="flex-row">
            <TouchableOpacity
              onPress={() => router.push("/MainPage")}
              className="border-2 border-dashed rounded-lg p-3 bg-red-500 font-pangolin text-white text-[30px] m-2 text-center "
            >
              <Text className="text-[30px] text-white font-pangolin">
                {getText("cancel")}
              </Text>
            </TouchableOpacity>

            {/* Submit button */}
            <TouchableOpacity
              onPress={submit}
              className="border-2 border-dashed rounded-lg p-3 bg-green-700 font-pangolin text-white  m-2 text-center "
            >
              <Text className="text-[30px] text-white font-pangolin">
                {getText("create")}
              </Text>
            </TouchableOpacity>

            {/* Cancel button */}
          </View>

          {errorMessage ? (
            <Text className="text-red-400 font-bold text-[15px] mb-5 text-center">
              {errorMessage}
            </Text>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateLobby;
