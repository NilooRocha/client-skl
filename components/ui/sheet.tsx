import React, { useRef } from "react";
import {
    Modal,
    View,
    Text,
    Pressable,
    Animated,
    TouchableWithoutFeedback,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
    isVisible: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
};

export default function Sheet({ isVisible, onClose, title, children }: Props) {
    const translateY = useRef(new Animated.Value(0)).current;

    const closeModal = () => {
        Animated.timing(translateY, {
            toValue: 300,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            onClose();
        });
    };

    const openModal = () => {
        translateY.setValue(300);
        Animated.timing(translateY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    if (isVisible) openModal();

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={closeModal}>
                <View className="flex-1" />
            </TouchableWithoutFeedback>

            <Animated.View
                style={{
                    transform: [{ translateY }],
                }}
                className="absolute bottom-0 w-full bg-background rounded-t-2xl shadow-sm"
            >
                <View className="h-12 bg-primary rounded-t-2xl flex flex-row justify-between items-center px-5">
                    <Text className="text-background text-center text-lg font-medium">
                        {title}
                    </Text>
                    <Pressable onPress={closeModal}>
                        <MaterialIcons name="close" size={22} color="white" />
                    </Pressable>
                </View>

                <View className="p-4 mb-4">
                    {children}
                </View>
            </Animated.View>
        </Modal>
    );
}
