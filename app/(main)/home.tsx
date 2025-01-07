import React, { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StyleSheet, View, Text, FlatList, Alert } from 'react-native';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://192.168.1.58:8080/users", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        console.log(data)
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const renderUser = ({ item }: { item: { email: string } }) => (
    <View style={styles.userItem}>
      <Text style={styles.email}>{item.email}</Text>
    </View>
  );

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <View style={styles.container}>
        <Text style={styles.title}>User List</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={users}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderUser}
          />
        )}
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
