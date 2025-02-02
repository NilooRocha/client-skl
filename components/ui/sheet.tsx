import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useRef } from 'react';
import { Modal, View, Text, Pressable, Animated, TouchableWithoutFeedback } from 'react-native';

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
    <Modal animationType="none" transparent visible={isVisible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View className="flex-1" />
      </TouchableWithoutFeedback>

      <Animated.View
        style={{
          transform: [{ translateY }],
        }}
        className="absolute bottom-0 w-full rounded-t-2xl bg-background shadow-sm">
        <View className="flex h-12 flex-row items-center justify-between rounded-t-2xl bg-primary px-5">
          <Text className="text-center text-lg font-medium text-background">{title}</Text>
          <Pressable onPress={closeModal}>
            <MaterialIcons name="close" size={22} color="white" />
          </Pressable>
        </View>

        <View className="mb-4 p-4">{children}</View>
      </Animated.View>
    </Modal>
  );
}
