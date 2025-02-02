import { Slot, Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function InitialConfigLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: Platform.OS === 'ios',
      }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
