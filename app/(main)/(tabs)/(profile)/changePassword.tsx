import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';
import { z } from 'zod';

import { changeUserPassword, updateUser } from '~/api/auth';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { useToast } from '~/context/ToastContext';
import { useAuth } from '~/hooks/useAuth';
import { handleError } from '~/lib/utils';

const schema = z
  .object({
    currentPassword: z
      .string()
      .min(4, { message: 'Password must be at least 4 characters.' })
      .max(20, { message: 'Password must be less than 20 characters.' }),
    password: z
      .string()
      .min(4, { message: 'Password must be at least 4 characters.' })
      .max(20, { message: 'Password must be less than 20 characters.' }),
    confirmPassword: z
      .string()
      .min(4, { message: 'Password confirmation must be at least 4 characters.' })
      .max(20, { message: 'Password confirmation must be less than 20 characters.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

export default function ChangePassword() {
  const { showToast } = useToast();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { userLogged } = useAuth();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!userLogged?.id) {
      return;
    }

    try {
      await changeUserPassword(userLogged?.id, {
        currentPassword: data.currentPassword,
        newPassword: data.password,
      });
      showToast('Details updated successfully!');
    } catch (error) {
      handleError(error, showToast);
    } finally {
      router.back();
      showToast('Password changed successfully!', 'success');
    }
  };

  return (
    <View className="mx-6 mt-6 flex-1">
      <Text className=" text-3xl font-extrabold text-foreground">Change password</Text>
      <Text className="mb-6 text-base text-foreground opacity-50">Enter your new password</Text>

      <View>
        <View className="mb-6 pb-6 ">
          <Text className="text-lg text-foreground">Old Password</Text>
          <Controller
            control={form.control}
            name="currentPassword"
            render={({ field: { value, onChange } }) => (
              <View className="relative">
                <Input
                  secureTextEntry={!showOldPassword}
                  placeholder="Current password"
                  value={value}
                  onChangeText={onChange}
                />
                <Pressable
                  onPress={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform">
                  <Ionicons name={showOldPassword ? 'eye-off' : 'eye'} size={24} color="#374151" />
                </Pressable>
              </View>
            )}
          />
        </View>

        {/* New Password Input */}
        <View className="mb-6">
          <Text className="text-lg text-foreground">New Password</Text>
          <Controller
            control={form.control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <View className="relative">
                <Input
                  secureTextEntry={!showPassword}
                  placeholder="New password"
                  value={value}
                  onChangeText={onChange}
                />
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform">
                  <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#374151" />
                </Pressable>
              </View>
            )}
          />
        </View>

        {/* Confirm Password Input */}
        <View className="mb-6">
          <Text className="text-lg text-foreground">Confirm Password</Text>
          <Controller
            control={form.control}
            name="confirmPassword"
            render={({ field: { value, onChange } }) => (
              <View className="relative">
                <Input
                  secureTextEntry={!showConfirmPassword}
                  placeholder="Re-enter the new password"
                  value={value}
                  onChangeText={onChange}
                />
                <Pressable
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform">
                  <Ionicons
                    name={showConfirmPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="#374151"
                  />
                </Pressable>
              </View>
            )}
          />
        </View>

        {/* Buttons */}
        <View className="mt-5 w-full flex-row justify-between">
          <Button onPress={() => router.back()} size="lg" variant="ghost" className="w-[30%]">
            Cancel
          </Button>

          <Button
            onPress={form.handleSubmit(onSubmit)}
            size="lg"
            variant="default"
            className="w-[70%]">
            <Text className="text-xl font-semibold">Save</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
