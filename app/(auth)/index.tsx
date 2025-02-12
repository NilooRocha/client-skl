import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '~/components/ui/button';

export default function Index() {
  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  const handleSignIn = () => {
    router.push('/(auth)/(sign-up)');
  };

  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={require('../../assets/cover.png')}
        resizeMode="cover"
        className="absolute bottom-0 left-0 right-0 top-0">
        <View className="mt-96 flex-1 items-center justify-center gap-y-6 px-6">
          <Button
            variant="default"
            className="h-16 w-96 border-2 border-white"
            onPress={handleSignIn}>
            <Text className="text-3xl font-semibold">Create Account</Text>
          </Button>
          <Button
            variant="white"
            className="h-16 w-96 border-2 border-primary"
            onPress={handleLogin}>
            <Text className="text-3xl font-semibold">Already have an account</Text>
          </Button>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
