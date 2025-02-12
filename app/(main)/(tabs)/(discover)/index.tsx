import React from 'react';
import { Text, View } from 'react-native';

import { useAuth } from '~/hooks/useAuth';

export default function Discover() {
  const { userLogged } = useAuth();

  return (
    <>
      <View>
        <Text>Welcome back!</Text>
        <Text>Hello {userLogged?.fullName}</Text>
      </View>
    </>
  );
}
