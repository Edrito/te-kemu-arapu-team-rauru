import { Image, Platform } from 'react-native';
import {Text, View } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>The Main file is called index tsx...</Text>
      <Text>Changes you make will automatically reload.</Text>
      <Text>Hopefully its mostly set up for the basics BEN</Text>
    </View>  
  );
}

