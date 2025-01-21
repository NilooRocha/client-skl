import React, { useRef, useState, useEffect } from "react";
import { TextInput, View, Text, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/context/AuthContext";
import { useToast } from "~/context/ToastContext";
import { handleError } from "~/lib/utils";

export default function Otp() {
  const { userEmail } = useLocalSearchParams();
  const { isAuthenticated, user } = useAuth();
  const { showToast } = useToast();

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value.length === 1 && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (value === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const startTimer = () => {
    setResendDisabled(true);
    setTimer(150); // 2 minutes and 30 seconds = 150 seconds
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const onSubmit = async () => {
    const otpCode = otp.join("");
    if (otpCode.length === 4) {
      try {
        const response = await fetch("http://192.168.1.58:8080/verify-account", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
            code: otpCode,
          }),
        });

        if (!response.ok) {
          setOtpError(true);
          return null;
        }

        console.log("OTP verified successfully");
        if (isAuthenticated) {
          if (user?.location == "") {
            router.replace("/(main)/(initialConfig)");
          } else {
            router.replace("/(main)/(tabs)/home");
          }
        } else {
          router.replace("/(auth)/login");
        }
      } catch (error) {
        handleError(error, showToast);
        setOtpError(true);
        return null;
      }
    } else {
      setOtpError(true);
    }
  };

  const resendCode = async () => {
    try {
      startTimer(); // Start the timer when the button is clicked
      const response = await fetch(
        "http://192.168.1.58:8080/resend-verification-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmail }),
        }
      );

      if (!response.ok) {
        showToast("Failed to resend verification code.", "error");
        return null;
      }

      console.log("Verification code resent successfully");
    } catch (error) {
      handleError(error, showToast);
      return null;
    }
  };

  return (
    <View className="mt-6 p-4 flex-1">
      <Text className="text-4xl text-primary font-black mb-2">Verification</Text>
      <Text className="text-foreground font-semibold mb-6">
        Enter the code to continue
      </Text>

      <View className="mb-6">
        <Text className="text-gray-600 text-center">
          We sent a code to{" "}
          <Text className="font-bold">{userEmail || "youremail@outlook.com"}</Text>
        </Text>
      </View>

      <View className="flex-row justify-center space-x-4 mb-6">
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            className="w-16 h-16 text-3xl text-center border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none m-2"
            maxLength={1}
            keyboardType="numeric"
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
            style={{
              textAlign: "center",
              fontSize: 24,
              height: 64,
              width: 64,
            }}
          />
        ))}
      </View>

      {otpError && (
        <Text className="text-destructive text-center mb-4">Invalid OTP</Text>
      )}

      <Button onPress={onSubmit} size="lg" className="mt-4">
        <Text className="font-bold text-lg">Continue</Text>
      </Button>

      <View className="flex-row justify-center items-center mt-4">
        <View className="flex items-center justify-center" >
          {resendDisabled && (
            <Text className="text-foreground text-xl">
              You can request again in {formatTime(timer)}
            </Text>
          )}

          <View className="flex-row justify-center items-center" >
            <Text className="text-foreground text-xl ">Didn't receive the code? </Text>
            <Button disabled={resendDisabled} onPress={resendCode} variant="link" >
              <Text className="text-primary text-xl font-bold no-underline">Send again</Text>
            </Button>
          </View>

        </View>
      </View>
    </View>
  );
}
