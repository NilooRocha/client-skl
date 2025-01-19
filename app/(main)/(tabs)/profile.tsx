import { Stack, useRouter } from 'expo-router';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useAuth } from '~/context/AuthContext';

export default function Profile() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/(auth)");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className='mt-7 ' style={styles.container}>
        <Button title='Logout' onPress={handleLogout} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
