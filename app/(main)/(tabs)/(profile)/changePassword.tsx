import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';
import { z } from 'zod';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { useToast } from '~/context/ToastContext';

const schema = z
  .object({
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    showToast(data.password, 'success');
  };

  return (
    <View className="mx-6 mt-6 flex-1">
      <Text className=" text-3xl font-extrabold text-foreground">Change password</Text>
      <Text className="mb-6 text-base text-foreground opacity-50">Enter your new password</Text>

      <View>
        <View className="mb-6">
          <Text className="text-lg text-foreground">Password</Text>
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

        <View className=" mt-5 w-full flex-row justify-between ">
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
