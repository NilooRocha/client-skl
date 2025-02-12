import React from 'react';
import { Text, View } from 'react-native';

import { UserInfoRow } from '~/components/UserInfoRow';
import { useAuth } from '~/hooks/useAuth';

export default function PersonalDetails() {
  const { userLogged } = useAuth();

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'Unknown';

    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

    return date.toLocaleDateString('en-US', options);
  };

  return (
    <View className="mx-6 mt-6 flex-1">
      <View className="flex-row justify-between">
        <Text className="mb-6 text-3xl font-extrabold text-foreground">Personal Details</Text>
        <View className="flex-col">
          <Text className=" text-xs text-foreground">Member since</Text>
          <Text className=" text-xs  text-foreground opacity-50">
            {formatDate(userLogged?.createdAt)}
          </Text>
        </View>
      </View>

      <View>
        <UserInfoRow label="Name" value={userLogged?.fullName} editable />
        <UserInfoRow label="Email" value={userLogged?.email} />
      </View>

      {/*<View className="flex-col  ">*/}
      {/*  <Text className=" text-center text-base text-foreground">Member since</Text>*/}
      {/*  <Text className=" text-center text-sm text-foreground opacity-50">*/}
      {/*    {formatDate(userLogged?.createdAt)}*/}
      {/*  </Text>*/}
      {/*</View>*/}
    </View>
  );
}
