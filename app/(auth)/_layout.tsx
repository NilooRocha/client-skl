import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: Platform.OS === 'ios',
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />

      <Stack.Screen name="otp" options={{ presentation: 'modal' }} />
      <Stack.Screen name="requestResetPassword" options={{ presentation: 'modal' }} />

      <Stack.Screen name="resetPassword" />
    </Stack>
  );
}
