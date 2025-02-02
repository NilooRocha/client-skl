import { Stack, useRouter } from 'expo-router';
import { StyleSheet, View, Button } from 'react-native';

import { useAuth } from '~/context/AuthContext';
import { useToast } from '~/context/ToastContext';
import { handleError } from '~/lib/utils';

export default function Profile() {
  const { logout } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();

  const handleLogout = async () => {
    try {
      logout();
      router.replace('/(auth)');
    } catch (error) {
      console.error('Logout failed:', error);
      handleError(error, showToast);
      return null;
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="mt-7 " style={styles.container}>
        <Button title="Logout" onPress={handleLogout} />
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
