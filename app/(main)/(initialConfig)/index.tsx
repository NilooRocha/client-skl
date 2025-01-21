import React, { useState, useEffect } from "react";
import { View, Animated, Easing, Text } from "react-native";
import { useRouter } from "expo-router";
import Welcome from "./welcome";
import SelectCity from "./selectCity";
import Complete from "./complete";
import { Button } from "~/components/ui/button";
import { Ionicons } from "@expo/vector-icons";
import SelectStudy from "./selectStudy";
import { useAuth } from "~/context/AuthContext";
import { handleError } from "~/lib/utils";
import { useToast } from "~/context/ToastContext";

interface StepProps {
    step: React.ReactNode;
    label: string;
}

type StepsProps = StepProps[];

export default function Index() {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [majorValue, setMajorValue] = useState<string | undefined>(undefined);
    const [minorValue, setMinorValue] = useState<string | undefined>(undefined);
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);
    const progress = React.useRef(new Animated.Value(0)).current;

    const { user } = useAuth();
    const router = useRouter();
    const { showToast } = useToast();

    const steps: StepsProps = [
        { step: <Welcome />, label: "Start" },
        { step: <SelectCity selectedCity={selectedCity} setSelectedCity={setSelectedCity} />, label: "Select city" },
        { step: <SelectStudy majorValue={majorValue} setMajorValue={setMajorValue} minorValue={minorValue} setMinorValue={setMinorValue} />, label: "Submit study" },
        { step: <Complete />, label: "Finish" }
    ];

    useEffect(() => {
        animateProgress(currentStep);
    }, [currentStep]);

    useEffect(() => {
        if (currentStep === 1 && (selectedCity === null || selectedCity === "")) {
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
            onSubmit();
        }
    };

    const goPrevious = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const onSubmit = async () => {
        try {
            const response = await fetch("http://192.168.1.58:8080/user/first-time-setup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: user?.email,
                    location: selectedCity
                }),
            });

            if (!response.ok) {
                return null;
            }

            router.push("/(main)/(tabs)/home");
        } catch (error) {
            handleError(error, showToast)
            return null;
        }
    };

    return (
        <View className="flex-1">
            <View className="w-full h-1 bg-gray-200 mt-20">
                <Animated.View
                    className="h-1 bg-primary rounded-full"
                    style={{
                        width: progress.interpolate({
                            inputRange: [0, 100],
                            outputRange: ["0%", "100%"],
                        }),
                    }}
                />
            </View>

            {steps[currentStep].step}

            <View className="flex-row justify-between w-full p-4 mb-12">
                {currentStep > 0 && (
                    <Button
                        onPress={goPrevious}
                        size="lg"
                        variant="ghost"
                        className="w-[30%]"
                    >
                        <View className="flex-row justify-center items-center">
                            <Ionicons name="arrow-back" size={12} color="black" className="mr-2" />
                            <Text className="text-xs font-semibold">
                                Back
                            </Text>
                        </View>
                    </Button>
                )}

                <Button
                    onPress={goNext}
                    size="lg"
                    variant="default"
                    className={`${currentStep === 0 ? "w-full" : "w-[70%]"}`}
                    disabled={isNextButtonDisabled}
                >
                    <Text className="text-xl font-semibold">
                        {steps[currentStep].label}
                    </Text>
                </Button>
            </View>
        </View>
    );
}
