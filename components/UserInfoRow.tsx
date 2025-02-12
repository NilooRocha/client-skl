import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

type UserInfoRowProps = {
  label: string;
  value?: string;
  editable?: boolean;
};

export const UserInfoRow = ({ label, value, editable }: UserInfoRowProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value || '');

  const handleSave = () => {
    setIsEditing(false);
    console.log('Saved:', editedValue);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedValue(value || '');
  };

  return (
    <View className="mb-4 rounded border border-slate-300 p-4">
      {isEditing ? (
        <View>
          <Text className="text-xl text-foreground">{label}</Text>

          <Input
            value={editedValue}
            onChangeText={setEditedValue}
            placeholder="Enter value"
            className="mt-2 w-full"
          />

          <View className="mt-4 flex-row justify-end space-x-4">
            <Button onPress={handleCancel} variant="ghost">
              <Text className="text-foreground">Cancel</Text>
            </Button>
            <Button onPress={handleSave} variant="default">
              <Text className="text-white">Save</Text>
            </Button>
          </View>
        </View>
      ) : (
        <View className=" flex-row items-center justify-between">
          <View className="flex">
            <Text className="text-xl text-foreground">{label}</Text>

            <Text className="text-lg text-foreground opacity-50">
              {editedValue || 'Not provided'}
            </Text>
          </View>

          {editable && (
            <Pressable onPress={() => setIsEditing(true)}>
              <Ionicons name="pencil" size={20} color="#374151" />
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
};
