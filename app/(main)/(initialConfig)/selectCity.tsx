import React, { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { Input } from "~/components/ui/input";

interface SelectCityProps {
    selectedCity: string | null;
    setSelectedCity: (city: string | null) => void;
}

const cities = [
    "Roma", "Milano", "Napoli"
];

export default function SelectCity({ selectedCity, setSelectedCity }: SelectCityProps) {

    const [search, setSearch] = useState("");

    const filteredCities = cities.filter(city =>
        city.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View className="flex-1 items-center justify-center p-4">
            <Text className="text-2xl font-bold mb-4">Select your City</Text>

            <Input
                placeholder="Search city..."
                value={search}
                onChangeText={setSearch}
                className="mb-4"
            />

            <FlatList
                data={filteredCities}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => setSelectedCity(item)}
                        style={({ pressed }) => [
                            pressed ? { opacity: 0.7 } : {}, // feedback visual para quando pressionado
                        ]}
                    >
                        <View
                            className={`
                                p-4 mb-2 w-full rounded-lg
                                ${selectedCity === item ? 'bg-primary' : 'bg-gray-200'}
                            `}
                        >
                            <Text
                                className={`
                                    text-lg
                                    ${selectedCity === item ? 'text-white' : 'text-black'}
                                `}
                            >
                                {item}
                            </Text>
                        </View>
                    </Pressable>
                )}
                className="w-full"
            />
        </View>
    );
}
