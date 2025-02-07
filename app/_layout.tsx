import '../global.css';

import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AuthProvider } from '~/context/AuthContext';
import { ToastProvider } from '~/context/ToastContext';
import { useAuth } from '~/hooks/useAuth';

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

  return (
    <GestureHandlerRootView style={{ flex: 1, height: '100%' }}>
      <Stack screenOptions={{ headerShown: false }}>
        {isAuthenticated ? <Stack.Screen name="(main)" /> : <Stack.Screen name="(auth)" />}
      </Stack>
    </GestureHandlerRootView>
  );
}
