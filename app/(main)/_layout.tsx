import { Stack } from 'expo-router';

import { useAuth } from '~/hooks/useAuth';

export default function MainLayout() {
  const { userLogged } = useAuth();

  const isInitialSetup = userLogged?.location === '';

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isInitialSetup ? (
        <Stack.Screen name="(initialConfig)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(tabs)" />
      )}
    </Stack>
  );
}
