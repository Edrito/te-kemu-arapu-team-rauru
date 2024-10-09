import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

interface CreateLobbyModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (lobbyName: string) => void;
}

const CreateLobbyModal: React.FC<CreateLobbyModalProps> = ({
  visible,
  onClose,
  onCreate,
}) => {
  const [lobbyName, setLobbyName] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleCreate = () => {
    if (lobbyName.trim().length === 0) {
      setError('Please enter a lobby name.');
      return;
    }
    onCreate(lobbyName.trim());
    setLobbyName('');
    setError('');
    Keyboard.dismiss();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <TouchableWithoutFeedback>
            <View className="bg-primary_red w-[80%] p-6 rounded-lg shadow-lg">
              <Text className="text-2xl text-center font-bold mb-4 text-white">
                Create Lobby
              </Text>

              {/* Lobby Name Input */}
              <TextInput
                className="border-2 border-gray-300 bg-slate-50 w-full h-12 text-center text-xl mx-2 rounded mb-4"
                placeholder="Enter Lobby Name"
                value={lobbyName}
                onChangeText={(text) => {
                  setLobbyName(text);
                  if (text.trim().length > 0) setError('');
                }}
                autoFocus
                autoCapitalize="words"
                returnKeyType="done"
                onSubmitEditing={handleCreate}
              />

              {error ? (
                <Text className="text-red-400 text-center mb-2">{error}</Text>
              ) : null}

              {/* Buttons */}
              <View className="flex-row justify-center">
                {/* OK Button */}
                <Pressable
                  className={`bg-game_buttons_green py-3.5 px-8 rounded-lg my-2.5 items-center border-dashed border-2 border-black ${
                    lobbyName.trim().length > 0 ? '' : 'opacity-50'
                  }`}
                  onPress={handleCreate}
                  disabled={lobbyName.trim().length === 0}
                >
                  <Text className="text-lg font-bold text-white">OK</Text>
                </Pressable>

                {/* Cancel Button */}
                <Pressable
                  className="bg-game_buttons_green py-3.5 px-8 rounded-lg my-2.5 items-center border-dashed border-2 border-black ml-4" 
                  onPress={onClose}
                >
                  <Text className="text-lg font-bold text-white">Cancel</Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CreateLobbyModal;