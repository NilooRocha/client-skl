import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

type ProfileOptionProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description?: string;
  onPress: () => void;
};

export const ProfileOption = ({ icon, title, description, onPress }: ProfileOptionProps) => (
  <Pressable className="rounded border border-slate-300" onPress={onPress}>
    <View className="mx-2 flex-row items-center justify-between p-6">
      <View className="flex-row items-center">
        <Ionicons name={icon} size={28} color="#5048E5" />
        <View className="ml-6 flex">
          <Text className="text-xl text-foreground">{title}</Text>
          {description && (
            <Text className="text-base text-foreground opacity-50">{description}</Text>
          )}
        </View>
      </View>
      <Ionicons name="chevron-forward-outline" size={28} color="#374151" />
    </View>
  </Pressable>
);
