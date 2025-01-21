import React, { useState, useEffect } from 'react';
import { Text, Animated } from 'react-native';
import { cn } from '~/lib/utils';

const toastVariants = {
    success: {
        background: 'bg-primary',
        border: 'border-primary',
        text: 'text-background',
        opacity: 'bg-opacity-80',
    },
    error: {
        background: 'bg-destructive',
        border: 'border-destructive',
        text: 'text-background',
        opacity: 'bg-opacity-80',
    },
    info: {
        background: 'bg-blue-500',
        border: 'border-blue-500',
        text: 'text-background',
        opacity: 'bg-opacity-80',
    },
};

interface ToastProps {
    message: string;
    type?: keyof typeof toastVariants;
    visible: boolean;
    onDismiss?: () => void;
    duration?: number;
}

const Toast = ({
    message,
    type = 'success',
    visible,
    onDismiss,
    duration = 10000,
}: ToastProps) => {
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        if (visible) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();

            const timer = setTimeout(() => {
                onDismiss?.();
            }, duration);

            return () => clearTimeout(timer);
        } else {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible, fadeAnim, onDismiss, duration]);

    if (!visible) return null;

    const { background, border, text, opacity } = toastVariants[type];

    return (
        <Animated.View
            className={cn(
                `absolute bottom-12 left-5 right-5 py-3 px-4 rounded-lg shadow-lg transition-opacity`,
                background,
                opacity,
                border
            )}
            style={[{ opacity: fadeAnim }]}
        >
            <Text className={cn(text)}>{message}</Text>
        </Animated.View>
    );
};

export { Toast };
