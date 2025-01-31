
import { View, Text, Image } from "react-native";

export default function Welcome() {

    return (
        <View className="flex-1 items-center justify-center px-6">
            <Text className="text-2xl text-foreground" >Welcome!</Text>
            <Text className="text-2xl text-foreground" >We need some informations...</Text>
            <Image
                source={require("../../../assets/comic.png")}
                style={{ width: "100%", height: 500, resizeMode: "contain" }}
            />

        </View>
    );
}
