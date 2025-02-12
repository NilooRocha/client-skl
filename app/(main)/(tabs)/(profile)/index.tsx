import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

import { ProfileOption } from '~/components/ProfileOption';
import { Button } from '~/components/ui/button';
import { useToast } from '~/context/ToastContext';
import { useAuth } from '~/hooks/useAuth';
import { handleError } from '~/lib/utils';

export default function Index() {
  const { logout } = useAuth();
  const { showToast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/(auth)');
    } catch (error) {
      console.error('Logout failed:', error);
      handleError(error, showToast);
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Stack.Screen options={{ title: 'Profile' }} />
        <View className="mx-6">
          <View className="mt-6 flex items-center">
            <View className="flex h-32 w-32 items-center justify-center rounded-full border border-primary">
              <Image
                source={require('~/assets/avatars/peep-95.png')}
                className="h-28 w-28 rounded-full object-cover"
              />
            </View>
          </View>

          <Text className="my-6 text-2xl font-bold text-foreground">Profile</Text>

          <ProfileOption
            icon="person-outline"
            title="Personal details"
            description="Name, avatar, and more"
            onPress={() => router.push('/(main)/(tabs)/(profile)/settings')}
          />
          <ProfileOption
            icon="school-outline"
            title="Studies"
            description="Majors and Minors"
            onPress={() => console.log('Pressed Studies')}
          />

          <Text className="my-6 text-2xl font-bold text-foreground">Useful actions</Text>
          <ProfileOption
            icon="gift-outline"
            title="Invite your friends"
            onPress={() => console.log('Pressed Invite your friends')}
          />
          <ProfileOption
            icon="chatbox-ellipses-outline"
            title="Share your ideas"
            onPress={() => console.log('Pressed Share your ideas')}
          />

          <Text className="my-6 text-2xl font-bold text-foreground">Settings</Text>
          <ProfileOption
            icon="settings-outline"
            title="App settings"
            onPress={() => console.log('Pressed App settings')}
          />
          <ProfileOption
            icon="lock-closed-outline"
            title="Security"
            description="Password, PIN, and more"
            onPress={() => console.log('Pressed Security')}
          />

          <Button onPress={handleLogout} size="lg" variant="ghost" className="my-6 ">
            <View className="h-12 flex-row items-center justify-center">
              <Ionicons name="log-out-outline" size={20} color="black" className="mr-2" />
              <Text className="text-lg font-semibold text-destructive">Log out</Text>
            </View>
          </Button>
          <Text className="mb-6 text-center text-base text-foreground opacity-50">
            App version 0.0.0.1
          </Text>
        </View>
      </ScrollView>
    </>
  );
}
