import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Pressable, View, Text } from 'react-native';
import { z } from 'zod';

import { requestResetPassword } from '~/api/auth';
import { Button } from '~/components/ui/button';
import { Form, FormItem, FormLabel, FormControl, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { useToast } from '~/context/ToastContext';
import { handleError } from '~/lib/utils';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
});

type FormData = z.infer<typeof schema>;

export default function RequestResetPassword() {
  const { showToast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: 'aaaa@aaa.aa',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await requestResetPassword(data.email);

      if (response.status === 500) {
        showToast('Email not registered! Try to sign-up.', 'error');
        router.replace('/(auth)/(sign-up)');
        return;
      }
      router.back();
      showToast('Password reset request sent. Check your email.', 'success');
      router.replace('/(auth)/login');
    } catch (error) {
      handleError(error, showToast);
    }
  };

  return (
    <View className="mt-12 flex-1 p-4">
      <Pressable onPress={() => router.back()} className="mb-4 flex-row items-center">
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>

      <FormProvider {...form}>
        <Text className="mb-2 text-4xl font-black text-primary">Forgot Password?</Text>
        <Text className="mb-6 font-semibold text-foreground">Enter your email</Text>
        <Form>
          <FormItem>
            <FormLabel>Email Address</FormLabel>
            <FormControl
              name="email"
              render={({ value, onChange }) => (
                <Input
                  keyboardType="email-address"
                  placeholder="Enter email address"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <FormMessage />
          </FormItem>

          <Button onPress={form.handleSubmit(onSubmit)} size="xl" className="mt-2">
            <Text className="text-3xl font-semibold">Request Reset</Text>
          </Button>
        </Form>

        <View className="mt-2 flex-row items-center justify-center">
          <Text className="text-xl text-foreground">Remember your password? </Text>
          <Pressable onPress={() => router.replace('/(auth)/login')}>
            <Text className="text-xl font-bold text-primary">Login</Text>
          </Pressable>
        </View>
      </FormProvider>

      <Pressable onPress={() => router.replace('/(auth)/resetPassword')}>
        <Text className="text-xs font-bold text-foreground">resetPage</Text>
      </Pressable>
    </View>
  );
}
