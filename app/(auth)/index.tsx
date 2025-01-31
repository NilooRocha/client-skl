import { router } from "expo-router";
import { ImageBackground, Text, View } from "react-native";
import { Button } from "~/components/ui/button";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar"; // Importando para garantir que a StatusBar se comporte conforme o esperado.

export default function Index() {
    const handleLogin = () => {
        router.navigate("/(auth)/login");
    };

    const handleSignIn = () => {
        router.push("/(auth)/(sign-up)");
    };

    return (
        <SafeAreaView className="flex-1">
            <ImageBackground
                source={require("../../assets/cover.png")}
                resizeMode="cover"
                className="absolute top-0 left-0 right-0 bottom-0"
            >
                <View className="flex-1 items-center justify-center px-6 gap-y-6 mt-56">
                    <Button variant="default" className="h-16 w-96 border-2 border-white" onPress={handleLogin}>
                        <Text className="text-3xl font-extrabold">Login</Text>
                    </Button>
                    <Button variant="white" className="h-16 w-96 border-2 border-primary" onPress={handleSignIn}>
                        <Text className="text-3xl font-extrabold">Sign In</Text>
                    </Button>
                </View>
            </ImageBackground>

            <StatusBar style="light" />
        </SafeAreaView>
    );
}
