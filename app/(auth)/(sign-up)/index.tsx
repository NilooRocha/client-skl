import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React, { useState, useRef, useCallback } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Pressable, View, Text, Image } from 'react-native';
import { z } from 'zod';

import { Button } from '~/components/ui/button';
import { Form, FormItem, FormLabel, FormControl, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { useToast } from '~/context/ToastContext';
import { useAuth } from '~/hooks/useAuth';

const schema = z
  .object({
    fullName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z
      .string()
      .email({ message: 'Invalid email address.' })
      .min(1, { message: 'Email is required.' }),
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

export default function Signin() {
  const { showToast } = useToast();
  const { signUp } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: 'aaaaa',
      email: 'aaaa@aaa.aa',
      password: 'aaaa',
      confirmPassword: 'aaaa',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await signUp(data.fullName, data.email, data.password);
      console.log(response);
      if (response.status === 201) {
        router.push({
          pathname: '/(auth)/otp',
          params: { userEmail: data.email },
        });
      }

      if (response.status === 409) {
        showToast('Email already registered! Try to login.', 'error');
      }
    } catch (error) {
      console.log(error);
      showToast('Error during sign-up. Please try again.', 'error');
    }
  };

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ['25%'];

  const handleOpenSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleCloseSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.3}
        pressBehavior="close"
      />
    ),
    []
  );

  return (
    <>
      <View className="mt-12 flex-1 p-4">
        <Pressable onPress={() => router.back()} className="mb-4 flex-row items-center">
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>

        <FormProvider {...form}>
          <Text className="mb-2 text-4xl font-black text-primary">Create Account</Text>
          <Text className="mb-6 font-semibold text-foreground">Sign up to continue</Text>

          <Form>
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl
                name="fullName"
                render={({ value, onChange }) => (
                  <Input placeholder="Enter full name" value={value} onChangeText={onChange} />
                )}
              />
              <FormMessage />
            </FormItem>

            <FormItem>
              <View className="mb-2 flex-row items-center justify-between">
                <FormLabel>Institution Email Address</FormLabel>
                <Pressable onPress={handleOpenSheet}>
                  <Text className="text-sm text-primary underline">Why Institutional?</Text>
                </Pressable>
              </View>
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

            <Image
              source={require('../../../assets/peeps_signin.png')}
              style={{ width: '100%', height: 170, resizeMode: 'contain' }}
            />

            <View>
              <Button onPress={form.handleSubmit(onSubmit)} size="xl" className="mt-4">
                <Text className="text-2xl font-semibold">Sign Up</Text>
              </Button>

              <Text className="mt-2 text-center text-xs text-foreground">
                By signing up, you agree to our{' '}
                <Text
                  className="text-primary underline"
                  onPress={() => console.log('Navigate to Privacy Policy')}>
                  Privacy Policy
                </Text>{' '}
                and{' '}
                <Text
                  className="text-primary underline"
                  onPress={() => console.log('Navigate to Terms of Service')}>
                  Terms of Service
                </Text>
                .
              </Text>
            </View>
          </Form>

          <View className="mt-44 flex-row items-center justify-center">
            <Text className="text-xl text-foreground">Already have an account? </Text>
            <Pressable onPress={() => router.navigate('/(auth)/login')}>
              <Text className="text-xl font-bold text-primary">Login</Text>
            </Pressable>
          </View>
        </FormProvider>

        {/* BottomSheet */}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose
          backdropComponent={renderBackdrop}
          onClose={handleCloseSheet}>
          <BottomSheetView className="px-4 py-4">
            <Text className="mb-2 text-lg font-bold">Why Institutional?</Text>
            <Text className="mb-2 text-foreground">
              To ensure the authenticity and security of our platform, it is necessary to use an
              institutional email address to log in.
            </Text>
            <Text className="text-foreground">
              Using an email associated with your college or university helps verify your
              eligibility and allows us to offer tailored services for students.
            </Text>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </>
  );
}
