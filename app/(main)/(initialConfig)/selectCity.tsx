import React, { useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';

import { Input } from '~/components/ui/input';

interface SelectCityProps {
  selectedCity: string | null;
  setSelectedCity: (city: string | null) => void;
}

const cities = ['Roma', 'Milano', 'Napoli'];

export default function SelectCity({ selectedCity, setSelectedCity }: SelectCityProps) {
  const [search, setSearch] = useState('');

  const filteredCities = cities.filter((city) => city.toLowerCase().includes(search.toLowerCase()));

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="mb-4 text-2xl font-bold">Select your City</Text>

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
            ]}>
            <View
              className={`
                                mb-2 w-full rounded-lg p-4
                                ${selectedCity === item ? 'bg-primary' : 'bg-gray-200'}
                            `}>
              <Text
                className={`
                                    text-lg
                                    ${selectedCity === item ? 'text-white' : 'text-black'}
                                `}>
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
