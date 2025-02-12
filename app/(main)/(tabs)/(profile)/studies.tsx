import React from 'react';
import { Text, View } from 'react-native';

import { UserInfoRow } from '~/components/UserInfoRow';
import { useAuth } from '~/hooks/useAuth';

export default function Studies() {
  const { userLogged } = useAuth();

  return (
    <View className="mx-6 mt-6 flex-1">
      <Text className="mb-6 text-3xl font-extrabold text-foreground">Studies</Text>

      <View>
        <UserInfoRow label="Major" value={userLogged?.fullName} editable />
        <UserInfoRow label="Minor" value={userLogged?.email} editable />
      </View>
    </View>
  );
}
