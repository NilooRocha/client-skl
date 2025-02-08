import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Pressable, View, Text } from 'react-native';
import { z } from 'zod';

import { resetPassword } from '~/api/auth';
import { Button } from '~/components/ui/button';
import { Form, FormItem, FormLabel, FormControl, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { useToast } from '~/context/ToastContext';
import { handleError } from '~/lib/utils';

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

export default function ResetPassword() {
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

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzkwMjgyMzEsInN1YiI6IjJlNnBFeUJOIn0.ZyCyDW5oiXPQvpTj2d3OXH9c2uBxoU6MiNdNOxy1KZo';

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await resetPassword(token, data.password);
      showToast('Password reset successful.', 'success');
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Error:', error);
      handleError(error, showToast);
    }
  };

  return (
    <View className="mt-12 flex-1 p-4">
      <Pressable onPress={() => router.back()} className="mb-4 flex-row items-center">
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>

      <FormProvider {...form}>
        <Text className="mb-2 text-4xl font-black text-primary">Reset Password</Text>
        <Text className="mb-6 font-semibold text-foreground">Enter your new password</Text>

        <Form>
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl
              name="password"
              render={({ value, onChange }) => (
                <View className="relative">
                  <Input
                    secureTextEntry={!showPassword}
                    placeholder="Create a password"
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
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl
              name="confirmPassword"
              render={({ value, onChange }) => (
                <View className="relative">
                  <Input
                    secureTextEntry={!showConfirmPassword}
                    placeholder="Re-enter the password"
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
            <FormMessage />
          </FormItem>

          <View className="mt-4">
            <Button onPress={form.handleSubmit(onSubmit)} size="xl">
              <Text className="text-2xl font-semibold">Reset Password</Text>
            </Button>
          </View>
        </Form>

        <View className="mt-4 flex-row items-center justify-center">
          <Text className="text-xl text-foreground">Remember your password?</Text>
          <Pressable onPress={() => router.replace('/(auth)/login')}>
            <Text className="text-xl font-bold text-primary">Login</Text>
          </Pressable>
        </View>
      </FormProvider>
    </View>
  );
}
