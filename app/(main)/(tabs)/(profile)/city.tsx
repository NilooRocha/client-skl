import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import MapView from 'react-native-maps';

import { updateLocation, verifyOtp } from '~/api/auth';
import SelectCity from '~/app/(main)/(initialConfig)/selectCity';
import { Button } from '~/components/ui/button';
import { useToast } from '~/context/ToastContext';
import { useAuth } from '~/hooks/useAuth';
import { handleError } from '~/lib/utils';

export default function City() {
  const { userLogged, reloadUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | undefined>(userLogged?.location);
  const { showToast } = useToast();

  const handleSave = async () => {
    if (!userLogged || !selectedCity) {
      setIsEditing(false);
      return;
    }

    try {
      await updateLocation(userLogged.id, selectedCity);
      await reloadUser();
    } catch (error) {
      console.error(error);
      handleError(error, showToast);
    } finally {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedCity(userLogged?.location || '');
  };
  return (
    <View className="mx-6 mt-6 flex-1">
      <Text className="mb-6 text-3xl font-extrabold text-foreground">Location</Text>

      {isEditing ? (
        <>
          <View className="flex-1">
            <SelectCity selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
            <View className="mb-12 w-full flex-row justify-end p-4">
              <Button onPress={handleCancel} variant="ghost">
                <Text className="text-foreground">Cancel</Text>
              </Button>
              <Button onPress={handleSave} variant="default">
                Save
              </Button>
            </View>
          </View>
        </>
      ) : (
        <>
          <View className="mb-4 rounded border border-slate-300 p-4">
            <View className=" flex-row items-center justify-between">
              <View className="flex">
                <Text className="text-xl text-foreground">City</Text>

                <Text className="text-lg text-foreground opacity-50">{selectedCity}</Text>
              </View>

              <Pressable onPress={() => setIsEditing(true)}>
                <Ionicons name="pencil" size={20} color="#374151" />
              </Pressable>
            </View>
          </View>

          <MapView
            style={{ width: '100%', height: '70%' }}
            initialRegion={{
              latitude: -23.57964,
              longitude: -46.65506,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </>
      )}
    </View>
  );
}
