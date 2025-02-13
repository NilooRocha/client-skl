import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { updateUser } from '~/api/auth';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { useToast } from '~/context/ToastContext';
import { useAuth } from '~/hooks/useAuth';
import { handleError } from '~/lib/utils';

type UserInfoRowProps = {
  label: string;
  value?: string;
  fieldKey?: string;
  editable?: boolean;
};

export const UserInfoRow = ({ label, value, editable, fieldKey }: UserInfoRowProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value || '');
  const { userLogged, reloadUser } = useAuth();
  const { showToast } = useToast();

  const handleSave = async () => {
    if (!userLogged?.id || !fieldKey || editedValue.trim() === '') {
      setIsEditing(false);
      return;
    }

    try {
      await updateUser(userLogged.id, { [fieldKey]: editedValue });
      await reloadUser();
      showToast('Details updated successfully!');
    } catch (error) {
      handleError(error, showToast);
    } finally {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedValue(value || '');
  };

  return (
    <View className="mb-4 rounded-lg border border-slate-300 p-4">
      {isEditing ? (
        <View>
          <Text className="text-xl font-semibold text-foreground">{label}</Text>

          <Input
            value={editedValue}
            onChangeText={setEditedValue}
            placeholder={`Enter ${label.toLowerCase()}`}
            className="mt-2 w-full"
          />

          <View className="mt-4 flex-row justify-end space-x-4">
            <Button onPress={handleCancel} variant="ghost">
              <Text className="text-foreground">Cancel</Text>
            </Button>
            <Button onPress={handleSave} variant="default" disabled={editedValue.trim() === ''}>
              <Text className="text-white">Save</Text>
            </Button>
          </View>
        </View>
      ) : (
        <View className="flex-row items-center justify-between">
          <View className="flex">
            <Text className="text-xl font-semibold text-foreground">{label}</Text>
            <Text className="text-lg text-foreground opacity-50">{value || 'Not provided'}</Text>
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
