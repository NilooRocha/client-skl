import React from 'react';
import { Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { useAuth } from '~/context/AuthContext';

export default function Home() {

  const { user } = useAuth();

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Welcome back!</Text>
        <Text>Hello {user?.fullName}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  email: {
    fontSize: 18,
  },
});
