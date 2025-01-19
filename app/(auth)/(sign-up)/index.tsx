import React, { useRef, useCallback } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { Pressable, View, Text, Alert } from "react-native";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const schema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .min(1, { message: "Email is required." }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters." })
    .max(20, { message: "Password must be less than 20 characters." }),
  confirmPassword: z
    .string()
    .min(4, { message: "Password confirmation must be at least 4 characters." })
    .max(20, { message: "Password confirmation must be less than 20 characters." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

export default function Signin() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    // TODO: remove default value
    defaultValues: {
      fullName: "aaaaa",
      email: "aaaa@aaa.aa",
      password: "aaaa",
      confirmPassword: "aaaa",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch("http://192.168.1.58:8080/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      router.push({
        pathname: "/(auth)/otp",
        params: { userEmail: data.email },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ["25%"];

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
      <View className="mt-12 p-4 flex-1">
        <Pressable
          onPress={() => router.back()}
          className="flex-row items-center mb-4"
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>

        <FormProvider {...form}>
          <Text className="text-4xl text-primary font-black mb-2">
            Create Account
          </Text>
          <Text className="text-foreground font-semibold mb-6">
            Sign up to continue
          </Text>

          <Form>
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl
                name="fullName"
                render={({ value, onChange }) => (
                  <Input
                    placeholder="Enter full name"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              <FormMessage />
            </FormItem>

            <FormItem>
              <View className="flex-row justify-between items-center mb-2">
                <FormLabel>Institution Email Address</FormLabel>
                <Pressable onPress={handleOpenSheet}>
                  <Text className="text-sm text-primary underline">
                    Why Institutional?
                  </Text>
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

            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl
                name="confirmPassword"
                render={({ value, onChange }) => (
                  <Input
                    secureTextEntry={true}
                    placeholder="Re-enter the password"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              <FormMessage />
            </FormItem>

            <View>
              <Button onPress={form.handleSubmit(onSubmit)} size="xl" className="mt-4">
                <Text className=" text-2xl font-semibold">Sign Up</Text>
              </Button>

              <Text className=" text-foreground text-xs text-center mt-2">
                By signing up, you agree to our{" "}
                <Text
                  className="text-primary underline"
                  onPress={() =>
                    console.log("Navigate to Privacy Policy")
                  }
                >
                  Privacy Policy
                </Text >{" "}
                and{" "}
                <Text
                  className="text-primary underline"
                  onPress={() =>
                    console.log("Navigate to Terms of Service")
                  }
                >
                  Terms of Service
                </Text>.
              </Text>
            </View>
          </Form>

          <View className="flex-row justify-center items-center mt-44">
            <Text className="text-foreground text-xl">Already have an account? </Text>
            <Pressable onPress={() => router.navigate("/(auth)/login")}>
              <Text className="text-primary text-xl font-bold">Login</Text>
            </Pressable>
          </View>
        </FormProvider>

        {/* BottomSheet */}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          onClose={handleCloseSheet}
        >
          <BottomSheetView className="px-4 py-4">
            <Text className="text-lg font-bold mb-2">Why Institutional?</Text>
            <Text className="text-foreground mb-2">
              To ensure the authenticity and security of our platform, it is
              necessary to use an institutional email address to log in.
            </Text>
            <Text className="text-foreground">
              Using an email associated with your college or university helps
              verify your eligibility and allows us to offer tailored services
              for students.
            </Text>
          </BottomSheetView>
        </BottomSheet>
      </View >
    </>
  );
}
