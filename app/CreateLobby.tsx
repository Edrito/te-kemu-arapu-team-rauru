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
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css'

const CreateLobby = () => {
  // Path to current player icon
  const playerIconTest = "../assets/images/react-logo.png";

  // So textboxes can use numbers
  const [number, onChangeNumber] = React.useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const options = ["Option 1", "Option 2", "Option 3"];
  const [selectedOption, setSelectedOption] = React.useState(options[0]);

  const handleSelect = (option: any) => {
    setSelectedOption(option.value);
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
          {/* Insert list of game objects here??? */}
          <View>
            <Text className="text-[30px] text-center">TESTING</Text>
          </View>
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
          <View className="flex-1 justify-center items-center bg-primary_red">
            <Dropdown className="font-pangolin bg-orange-500"
              options={options}
              onChange={handleSelect}
              value={{ value: selectedOption, label: selectedOption }}
              controlClassName="bg-orange-600 text-white text-lg p-4 border-2 rounded-lg border-black" // Styling for the control
              menuClassName="bg-green-600 border border-black rounded-md shadow-lg" // Styling for the dropdown menu
              placeholder="Select an option"
            />

            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text className="text-[30px] border-2 border-black border-dashed bg-orange-500 p-0.5 px-5 m-1 rounded">
                Close
              </Text>
            </TouchableOpacity>
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
              onChangeText={onChangeNumber}
              value={number}
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
              onChangeText={onChangeNumber}
              value={number}
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
              onChangeText={onChangeNumber}
              value={number}
              placeholder="-"
              keyboardType="numeric"
            />
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateLobby;
