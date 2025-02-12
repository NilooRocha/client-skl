import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, Switch, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { UserInfoRow } from '~/components/UserInfoRow';
import { useAuth } from '~/hooks/useAuth';

export default function Settings() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View className="mx-6 mt-6 flex-1">
      <Text className="mb-6 text-3xl font-extrabold text-foreground">App settings</Text>

      <View>
        <View className="rounded border border-slate-300">
          <View className="mx-2 flex-row items-center justify-between p-3">
            <View className="flex-row items-center">
              <Ionicons name="notifications-outline" size={28} color="#5048E5" />
              <View className="ml-6 flex">
                <Text className="text-xl text-foreground">Notification</Text>
                <Text className="text-base text-foreground opacity-50">Enable notifications</Text>
              </View>
            </View>
            <Switch
              className="h-"
              trackColor={{ false: '#374151', true: '#5048E5' }}
              thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
