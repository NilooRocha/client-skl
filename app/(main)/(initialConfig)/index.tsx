import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Animated, Easing, Text } from 'react-native';

import Complete from './complete';
import SelectCity from './selectCity';
import SelectStudy from './selectStudy';
import Welcome from './welcome';

import { firstTimeSetup } from '~/api/auth';
import { Button } from '~/components/ui/button';
import { useToast } from '~/context/ToastContext';
import { useAuth } from '~/hooks/useAuth';
import { handleError } from '~/lib/utils';

interface StepProps {
  step: React.ReactNode;
  label: string;
}

type StepsProps = StepProps[];

export default function Index() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCity, setSelectedCity] = useState<string | undefined>(undefined);
  const [majorValue, setMajorValue] = useState<string | undefined>(undefined);
  const [minorValue, setMinorValue] = useState<string | undefined>(undefined);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);
  const progress = React.useRef(new Animated.Value(0)).current;

  const { userLogged, reloadUser } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();

  const steps: StepsProps = [
    { step: <Welcome />, label: 'Start' },
    {
      step: <SelectCity selectedCity={selectedCity} setSelectedCity={setSelectedCity} />,
      label: 'Select city',
    },
    // {
    //   step: (
    //     <SelectStudy
    //       majorValue={majorValue}
    //       setMajorValue={setMajorValue}
    //       minorValue={minorValue}
    //       setMinorValue={setMinorValue}
    //     />
    //   ),
    //   label: 'Submit study',
    // },
    { step: <Complete />, label: 'Finish' },
  ];

  useEffect(() => {
    animateProgress(currentStep);
  }, [currentStep]);

  useEffect(() => {
    if (currentStep === 1 && (selectedCity === null || selectedCity === '')) {
      setIsNextButtonDisabled(true);
    } else {
      setIsNextButtonDisabled(false);
    }
  }, [selectedCity, currentStep]);

  const animateProgress = (step: number) => {
    const totalSteps = steps.length - 1;
    const progressPercentage = (step / totalSteps) * 100;

    Animated.timing(progress, {
      toValue: progressPercentage,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const goNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onSubmit().then();
    }
  };

  const goPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = async () => {
    try {
      if (userLogged && selectedCity) {
        await firstTimeSetup(userLogged.id, selectedCity);
        await reloadUser();
        router.push('/(main)/(tabs)/(discover)');
      }
      return null;
    } catch (error) {
      handleError(error, showToast);
      return null;
    }
  };

  return (
    <View className="flex-1">
      <View className="mt-20 h-1 w-full bg-gray-200">
        <Animated.View
          className="h-1 rounded-full bg-primary"
          style={{
            width: progress.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          }}
        />
      </View>

      {steps[currentStep].step}

      <View className="mb-12 w-full flex-row justify-between p-4">
        {currentStep > 0 && (
          <Button onPress={goPrevious} size="lg" variant="ghost" className="w-[30%]">
            <View className="flex-row items-center justify-center">
              <Ionicons name="arrow-back" size={12} color="black" className="mr-2" />
              <Text className="text-xs font-semibold">Back</Text>
            </View>
          </Button>
        )}

        <Button
          onPress={goNext}
          size="lg"
          variant="default"
          className={`${currentStep === 0 ? 'w-full' : 'w-[70%]'}`}
          disabled={isNextButtonDisabled}>
          <Text className="text-xl font-semibold">{steps[currentStep].label}</Text>
        </Button>
      </View>
    </View>
  );
}
