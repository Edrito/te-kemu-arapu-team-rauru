import React, { useState } from 'react';
import { View, Text, Animated, Easing, StyleSheet, Dimensions, Pressable } from 'react-native';

// Māori alphabet letters
const MAORI_ALPHABET = ['A', 'E', 'H', 'I', 'K', 'M', 'N', 'O', 'P', 'R', 'T', 'U', 'W', 'NG', 'WH'];

interface WheelProps {
  wheelColor?: string;
  arrowColor?: string;
}

const Wheel: React.FC<WheelProps> = ({ wheelColor = 'blue', arrowColor = 'black' }) => {
  const [rotateAnim] = useState(new Animated.Value(0)); // For animation
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null); // Track the selected letter

  const { height } = Dimensions.get('window');
  const wheelSize = height * 0.4; // Wheel takes up 40% of the screen height

  const anglePerSegment = 360 / MAORI_ALPHABET.length; // Angle per letter segment
  const totalSegments = MAORI_ALPHABET.length;

  const startSpin = () => {
    if (isSpinning) return;

    // Randomly choose a letter from the Māori alphabet
    const randomIndex = Math.floor(Math.random() * totalSegments);
    const selected = MAORI_ALPHABET[randomIndex];
    setSelectedLetter(selected);

    // Calculate the final rotation based on the selected letter
    const randomAngle = randomIndex * anglePerSegment;
    const fullRotations = 360 * 5; // 5 full spins

    // Ensure it lands exactly at the selected letter's segment
    const finalRotation = fullRotations + (360 - randomAngle);

    setIsSpinning(true);
    Animated.timing(rotateAnim, {
      toValue: finalRotation,
      duration: 5000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setIsSpinning(false);
      rotateAnim.setValue(finalRotation % 360); // Reset to ensure future spins start at current angle
    });
  };

  const spinInterpolation = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  // Function to render segments
  const renderSegments = () => {
    return MAORI_ALPHABET.map((letter, index) => {
      const rotate = `${anglePerSegment * index}deg`;

      return (
        <View
          key={letter}
          style={[
            styles.segment,
            {
              transform: [{ rotate }, { translateY: -wheelSize / 2 }],
            },
          ]}
        >
          <Text style={[styles.segmentText, { fontSize: wheelSize / 12 }]}>{letter}</Text> {/* Dynamically adjust letter size */}
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.wheelContainer}>
        {/* Arrow positioned at the bottom edge of the wheel */}
        <View style={[styles.arrowContainer, { top: -(wheelSize / 2) + (wheelSize / 12) }]}>
          <Text style={[styles.arrow, { color: arrowColor }]}>▼</Text> {/* Arrow color set to black, now pointing down */}
        </View>

        {/* Animated Wheel */}
        <Animated.View
          style={[
            styles.wheel,
            {
              width: wheelSize,
              height: wheelSize,
              borderRadius: wheelSize / 2,
              backgroundColor: wheelColor,
              transform: [{ rotate: spinInterpolation }],
            },
          ]}
        >
          {renderSegments()}

          {/* Button in the center of the wheel */}
          <Pressable
            onPress={startSpin}
            disabled={isSpinning}
            style={styles.centerButtonContainer}
            accessibilityRole="button"
            accessibilityLabel="Spin the wheel"
          >
            <Text style={{ color: isSpinning ? 'grey' : 'black'}}>Spin</Text>
          </Pressable>
        </Animated.View>
      </View>

      {/* Display the selected letter */}
      {selectedLetter && <Text style={styles.selectedLetterText}>Selected Letter: {selectedLetter}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheelContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheel: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButtonContainer: {
    position: 'absolute',
    width: '30%', // Button takes up 30% of the wheel's size
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white', // Optional: background to make button stand out
    borderRadius: 100, // Make the button circular
  },
  arrowContainer: {
    position: 'absolute',
    top: -(400 * 0.4 / 2) + (400 * 0.4 / 12), // Adjusted position
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  arrow: {
    fontSize: 60, // Set font size for the arrow
    fontWeight: 'bold',
  },
  segment: {
    position: 'absolute',
    width: '100%',
    height: '50%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  segmentText: {
    color: 'white',
    fontWeight: 'bold',
  },
  selectedLetterText: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Wheel;
