import { useRouter, router } from "expo-router";
import { View, } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { Button } from "~/components/ui/button";

export default function Index() {

    const handleLogin = () => {
        router.navigate("/(auth)/login");
    };
    const handleSignIn = () => {
        router.push("/(auth)/(sign-up)")
    };

    return (
        <View className="flex-1 items-center justify-center px-6">
            <Button variant="outline" onPress={handleLogin} >handleLogin</Button>
            <Button variant="default" onPress={handleSignIn} >handleSignIn</Button>
        </View>
    );
}
