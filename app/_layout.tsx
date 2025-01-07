import { AuthProvider, useAuth } from '~/context/AuthContext';
import '../global.css';

import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(auth)',
};

export default function App() {
    return (
        <AuthProvider>
            <RootLayout />
        </AuthProvider>
    );
}

function RootLayout() {
    const { isAuthenticated } = useAuth();


    return (
        <GestureHandlerRootView style={{ flex: 1, height: '100%' }}>

            <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "hsl(243 61% 100%)" } }}>
                {isAuthenticated ? (
                    <Stack.Screen name="(main)" />
                ) : (
                    <Stack.Screen name="(auth)" />
                )}
                <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
            </Stack>
        </GestureHandlerRootView>

    );
}
