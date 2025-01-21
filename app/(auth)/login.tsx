import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pressable, View, Text } from "react-native";
import { Button } from "~/components/ui/button";
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "~/context/AuthContext";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string(),
});

type FormData = z.infer<typeof schema>;

export default function Login() {

  const { login } = useAuth();

  const [isInvalideCredentials, setIsInvalideCredentials] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    // TODO: remove default value
    defaultValues: {
      email: "aaaa@aaa.aa",
      password: "aaaa"
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsInvalideCredentials(false);

    const user = await login(data.email, data.password);

    if (!user) {
      setIsInvalideCredentials(true);
      return null;
    }

    console.log(`Login successful, welcome back ${user.fullName}`);

    if (user.isVerified) {
      if (user.location === "") {
        router.navigate("/(main)/(initialConfig)");
      } else {
        router.navigate("/(main)/(tabs)/home");
      }
    } else {
      router.push({
        pathname: "/(auth)/otp",
        params: { userEmail: data.email },
      });
    }
  };


  return (
    <View className="mt-12 p-4 flex-1">
      <Pressable onPress={() => router.back()} className="flex-row items-center mb-4">
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>

      <FormProvider {...form}>
        <Text className="text-4xl text-primary font-black mb-2">Login Account</Text>
        {isInvalideCredentials
          ? (<Text className="text-destructive font-semibold mb-6">Invalid credentials </Text>)
          : (<Text className="text-foreground font-semibold mb-6">Welcome Back!</Text>)}

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
            <FormControl
              name="password"
              render={({ value, onChange }) => (
                <Input
                  secureTextEntry={true}
                  placeholder="Create a password"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <FormMessage />
          </FormItem>

          <Button onPress={form.handleSubmit(onSubmit)} size="xl" className="mt-2">
            <Text className="text-3xl font-semibold">Login</Text>
          </Button>
        </Form>

        <View className="flex-row justify-center items-center mt-2">
          <Text className="text-foreground text-xl">Don't have an account? </Text>
          <Pressable onPress={() => router.push("/(auth)/(sign-up)")}>
            <Text className="text-primary text-xl font-bold">Sign Up</Text>
          </Pressable>
        </View>
      </FormProvider>
    </View>
  );
}
