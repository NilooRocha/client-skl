import { Stack } from "expo-router";
import { useAuth } from "~/context/AuthContext";

export default function MainLayout() {
    const { user } = useAuth();

    const isInitialSetup = user?.location === "";

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
