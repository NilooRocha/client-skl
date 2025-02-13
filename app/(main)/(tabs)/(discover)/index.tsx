import React from 'react';
import { Text, View } from 'react-native';

import { useAuth } from '~/hooks/useAuth';

export default function Discover() {
  const { userLogged } = useAuth();

  return (
    <>
      <View />
    </>
  );
}
