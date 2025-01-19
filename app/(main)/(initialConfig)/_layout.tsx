import { Platform } from "react-native";
import { Slot, Stack } from "expo-router";

export default function InitialConfigLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: Platform.OS === "ios"
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  )
}
