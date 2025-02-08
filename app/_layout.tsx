import '../global.css';

import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AuthProvider } from '~/context/AuthContext';
import { ToastProvider } from '~/context/ToastContext';
import { useAuth } from '~/hooks/useAuth';

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    </ToastProvider>
  );
}

function RootLayout() {
  const { isAuthenticated } = useAuth();

  const [loaded, error] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, height: '100%' }}>
      <Stack screenOptions={{ headerShown: false }}>
        {isAuthenticated ? <Stack.Screen name="(main)" /> : <Stack.Screen name="(auth)" />}
      </Stack>
    </GestureHandlerRootView>
  );
}
