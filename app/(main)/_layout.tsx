import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

import { useAuth } from '~/hooks/useAuth';

export default function MainLayout() {
  const { userLogged } = useAuth();

  const isInitialSetup = userLogged?.location === '';

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'dark'} />
      {isInitialSetup ? (
        <Stack.Screen name="(initialConfig)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(tabs)" />
      )}
    </Stack>
  );
}
