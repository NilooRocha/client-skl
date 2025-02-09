import { Stack, Tabs } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { TabBarIcon } from '~/components/TabBarIcon';
import { useAuth } from '~/hooks/useAuth';

export default function TabsLayout() {
  const { userLogged } = useAuth();
  const userName = userLogged ? userLogged.fullName : 'Profile';
  const [currentTitle, setCurrentTitle] = useState('Discover');

  return (
    <View className="flex-1">
      <View className="ml-6 mt-24">
        <Text className="text-4xl font-extrabold text-foreground">{currentTitle}</Text>
      </View>

      <Tabs
        screenListeners={{
          state: ({ data }) => {
            const currentIndex = data.state.index;
            const tabNames = ['Discover', userName];
            setCurrentTitle(tabNames[currentIndex]);
          },
        }}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#374151',
          tabBarInactiveTintColor: '#37415180',
        }}>
        <Tabs.Screen
          name="discover"
          options={{
            title: 'Discover',
            tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          }}
        />
        <Tabs.Screen
          name="(profile)"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}
