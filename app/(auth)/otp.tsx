import { useLocalSearchParams, router } from 'expo-router';
import React, { useRef, useState, useEffect } from 'react';
import { TextInput, View, Text } from 'react-native';

import { verifyOtp } from '~/api/auth';
import { Button } from '~/components/ui/button';
import { useToast } from '~/context/ToastContext';
import { useAuth } from '~/hooks/useAuth';
import { handleError } from '~/lib/utils';

export default function Otp() {
  const { userEmail } = useLocalSearchParams();
  const { isAuthenticated, userLogged } = useAuth();
  const { showToast } = useToast();

  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpError, setOtpError] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value.length === 1 && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (value === '' && index > 0) {
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
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const onSubmit = async () => {
    const otpCode = otp.join('');
    if (otpCode.length === 4) {
      try {
        await verifyOtp(userEmail as string, otpCode);

        if (isAuthenticated) {
          if (userLogged?.location === '') {
            router.replace('/(main)/(initialConfig)');
          } else {
            router.replace('/(main)/(tabs)/home');
          }
        } else {
          router.replace('/(auth)/login');
        }
      } catch (error) {
        console.error('Error during OTP verification:', error);
        setOtpError(true);
        handleError(error, showToast);
      }
    } else {
      setOtpError(true);
    }
  };

  const resendCode = async () => {
    try {
      startTimer();
      const response = await fetch('http://192.168.1.58:8080/resend-verification-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      });

      if (!response.ok) {
        showToast('Failed to resend verification code.', 'error');
        return;
      }

      console.log('Verification code resent successfully');
    } catch (error) {
      handleError(error, showToast);
    }
  };

  return (
    <View className="mt-6 flex-1 p-4">
      <Text className="mb-2 text-4xl font-black text-primary">Verification</Text>
      <Text className="mb-6 font-semibold text-foreground">Enter the code to continue</Text>

      <View className="mb-6">
        <Text className="text-center text-gray-600">
          We sent a code to{' '}
          <Text className="font-bold">{userEmail || 'youremail@outlook.com'}</Text>
        </Text>
      </View>

      <View className="mb-6 flex-row justify-center space-x-4">
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            className="m-2 h-16 w-16 rounded-lg border-2 border-gray-300 text-center text-3xl focus:border-primary focus:outline-none"
            maxLength={1}
            keyboardType="numeric"
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
            style={{
              textAlign: 'center',
              fontSize: 24,
              height: 64,
              width: 64,
            }}
          />
        ))}
      </View>

      {otpError && <Text className="mb-4 text-center text-destructive">Invalid OTP</Text>}

      <Button onPress={onSubmit} size="lg" className="mt-4">
        <Text className="text-lg font-bold">Continue</Text>
      </Button>

      <View className="mt-4 flex-row items-center justify-center">
        <View className="flex items-center justify-center">
          {resendDisabled && (
            <Text className="text-xl text-foreground">
              You can request again in {formatTime(timer)}
            </Text>
          )}

          <View className="flex-row items-center justify-center">
            <Text className="text-xl text-foreground ">Didn't receive the code? </Text>
            <Button disabled={resendDisabled} onPress={resendCode} variant="link">
              <Text className="text-xl font-bold text-primary no-underline">Send again</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}
