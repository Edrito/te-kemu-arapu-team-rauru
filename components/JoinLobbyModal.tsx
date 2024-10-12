import React, { useState, useRef } from 'react';
import { View, Text, Modal, Pressable, TextInput, Keyboard } from 'react-native';
import { useLanguage } from 'te-kemu-arapu-compx374-team-rauru/context/languageToggleButton';

interface JoinLobbyModalProps {
  visible: boolean;
  onClose: () => void;
  onJoin: (code: string) => void;
}

const JoinLobbyModal: React.FC<JoinLobbyModalProps> = ({ visible, onClose, onJoin }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const { getText } = useLanguage();

  const handleChangeText = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === '') {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to next input if value is entered
      if (value !== '' && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }

      // If backspacing, move to previous input
      if (value === '' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const joinGame = () => {
    const gameCode = code.join('');
    if (gameCode.length === 4) {
      onJoin(gameCode);
      setCode(['', '', '', '']);
      Keyboard.dismiss();
    } else {
      alert('Please enter a 4-digit code.');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-primary_red p-6 shadow-lg rounded-lg w-11/12 max-w-sm md:max-w-lg">
          <Text className="text-[24px] text-center font-bold mb-4">Enter 4-Digit Code</Text>

          {/* 4 text inputs for each digit */}
          <View className="flex-row justify-center mb-4 space-x-2 md:space-x-4">
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                className="border-2 bg-slate-50 border-gray-300 w-14 h-14 text-center text-[18px] md:w-16 md:h-16 md:text-[24px] rounded"
                maxLength={1}
                inputMode='numeric'
                value={digit}
                onChangeText={(value) => handleChangeText(index, value)}
                autoFocus={index === 0}
              />
            ))}
          </View>

          {/* OK button */}
          <Pressable
            className="bg-game_buttons_green py-3.5 rounded-lg my-2.5 items-center border-dashed border-2 border-black"
            onPress={joinGame}
          >
            <Text className="text-[18px] font-bold text-white">{getText('join')}</Text>
          </Pressable>

          {/* Cancel button */}
          <Pressable onPress={onClose} className="mt-4">
            <Text className="text-center text-[18px] text-black">{getText('cancel')}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default JoinLobbyModal;
