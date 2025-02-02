import { AuthProvider, useAuth } from '~/context/AuthContext';
import '../global.css';

import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ToastProvider } from '~/context/ToastContext';

export const unstable_settings = {
  initialRouteName: '(auth)',
};

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
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#fffff' } }}>
        {isAuthenticated ? <Stack.Screen name="(main)" /> : <Stack.Screen name="(auth)" />}
      </Stack>
    </GestureHandlerRootView>
  );
}
