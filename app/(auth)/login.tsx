import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Pressable, View, Text, Image } from 'react-native';
import { z } from 'zod';

import { Button } from '~/components/ui/button';
import { Form, FormItem, FormLabel, FormControl, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { useToast } from '~/context/ToastContext';
import { useAuth } from '~/hooks/useAuth';
import { handleError } from '~/lib/utils';
import { User } from '~/types/user';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string(),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: 'luiza.silva@jcu.edu',
      password: 'aaaa',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const user = await login(data.email, data.password);

      if (!user) {
        setLoginError('Invalid credentials. Please try again.');
        return;
      }

      handlePostLogin(user);
    } catch (err) {
      handleError(err, showToast);
    }
  };

  const handlePostLogin = (user: User) => {
    console.log(`Login successful, welcome back ${user.fullName}!`);

    if (user.isVerified) {
      router.push(user.location ? '/(main)/(tabs)/discover' : '/(main)/(initialConfig)');
    } else {
      router.push({ pathname: '/(auth)/otp', params: { userEmail: user.email } });
    }
  };

  return (
    <View className="mt-12 flex-1 p-4">
      <Pressable onPress={() => router.back()} className="mb-4 flex-row items-center">
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>

      <FormProvider {...form}>
        <Text className="mb-2 text-4xl font-black text-primary">Login Account</Text>

        {loginError && <Text className="mb-6 font-semibold text-destructive">{loginError}</Text>}

        <Image
          source={require('../../assets/peeps_login.png')}
          style={{ width: '100%', height: 170, resizeMode: 'contain' }}
        />

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

          <FormItem>
            <FormLabel>Password</FormLabel>
            <View className="relative">
              <FormControl
                name="password"
                render={({ value, onChange }) => (
                  <Input
                    secureTextEntry={!showPassword}
                    placeholder="Enter password"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transform">
                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#374151" />
              </Pressable>
            </View>

            <View className="mt-2 flex items-end">
              <Pressable onPress={() => router.push('/(auth)/requestResetPassword')}>
                <Text className="text-sm font-semibold text-primary">Forgot Password?</Text>
              </Pressable>
            </View>

            <FormMessage />
          </FormItem>

          <Button onPress={form.handleSubmit(onSubmit)} size="xl" className="mt-2">
            <Text className="text-3xl font-semibold">Login</Text>
          </Button>
        </Form>

        <View className="mt-2 flex-row items-center justify-center">
          <Text className="text-xl text-foreground">Don't have an account? </Text>
          <Pressable onPress={() => router.push('/(auth)/(sign-up)')}>
            <Text className="text-xl font-bold text-primary">Sign Up</Text>
          </Pressable>
        </View>
      </FormProvider>
    </View>
  );
}
