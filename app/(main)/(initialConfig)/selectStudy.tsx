import React, { useState } from "react";
import { View, Text } from "react-native";
import { Input } from "~/components/ui/input";

interface SelectStudyProps {
    majorValue: string | undefined;
    setMajorValue: (major: string | undefined) => void;

    minorValue: string | undefined;
    setMinorValue: (minor: string | undefined) => void;
}

export default function SelectStudy({ majorValue, setMajorValue, minorValue, setMinorValue }: SelectStudyProps) {

    return (
        <View className="flex-1 items-center  p-4">
            <Text className="text-2xl font-bold mb-2">Select your study</Text>
            <Text className="text-base font-normal mb-4">You can change this information later</Text>

            <View className="w-full mb-4">
                <Text className="text-xl font-medium text-foreground mb-2">
                    Major
                </Text>
                <Input
                    value={majorValue}
                    onChangeText={setMajorValue}
                    placeholder={`Enter Major`}
                    className="w-full"
                />
            </View>

            <View className="w-full mb-4">
                <Text className="text-xl font-medium text-foreground mb-2">
                    Minor
                </Text>
                <Input
                    value={minorValue}
                    onChangeText={setMinorValue}
                    placeholder={`Enter Minor`}
                    className="w-full"
                />
                <Text className="text-sm font-medium text-foreground mt-2">
                    It's ok if you don't know yet... :)
                </Text>
            </View>
        </View>
    );
}
