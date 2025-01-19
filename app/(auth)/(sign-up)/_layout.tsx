import { Slot, Stack, router } from "expo-router";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SigninLayout() {
  const backIcon = Platform.OS === "ios" ? "chevron-back" : "arrow-back-sharp";

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: Platform.OS === "ios"
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="study" />
    </Stack>
  );
}
