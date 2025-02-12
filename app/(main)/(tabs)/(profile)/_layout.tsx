import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="personalDetails" options={{ presentation: 'modal' }} />
      <Stack.Screen name="studies" options={{ presentation: 'modal' }} />
      <Stack.Screen name="city" options={{ presentation: 'modal' }} />
      <Stack.Screen name="settings" options={{ presentation: 'modal' }} />
      <Stack.Screen name="changePassword" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
