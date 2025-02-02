import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { Input } from '~/components/ui/input';

interface SelectStudyProps {
  majorValue: string | undefined;
  setMajorValue: (major: string | undefined) => void;

  minorValue: string | undefined;
  setMinorValue: (minor: string | undefined) => void;
}

export default function SelectStudy({
  majorValue,
  setMajorValue,
  minorValue,
  setMinorValue,
}: SelectStudyProps) {
  return (
    <View className="flex-1 items-center  p-4">
      <Text className="mb-2 text-2xl font-bold">Select your study</Text>
      <Text className="mb-4 text-base font-normal">You can change this information later</Text>

      <View className="mb-4 w-full">
        <Text className="mb-2 text-xl font-medium text-foreground">Major</Text>
        <Input
          value={majorValue}
          onChangeText={setMajorValue}
          placeholder="Enter Major"
          className="w-full"
        />
      </View>

      <View className="mb-4 w-full">
        <Text className="mb-2 text-xl font-medium text-foreground">Minor</Text>
        <Input
          value={minorValue}
          onChangeText={setMinorValue}
          placeholder="Enter Minor"
          className="w-full"
        />
        <Text className="mt-2 text-sm font-medium text-foreground">
          It's ok if you don't know yet... :)
        </Text>
      </View>
    </View>
  );
}
