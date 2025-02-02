import React, { useState } from 'react';
import { Pressable, Text, ActivityIndicator } from 'react-native';

import { cn } from '~/lib/utils';

const buttonVariants = {
  default: 'bg-primary',
  white: 'bg-white',
  destructive: 'bg-destructive',
  outline: 'border border-primary',
  secondary: 'bg-secondary',
  ghost: 'bg-transparent',
  link: '',
};

const textVariants = {
  default: 'text-primary-foreground',
  destructive: 'text-destructive-foreground',
  white: 'text-primary',
  outline: 'text-primary',
  secondary: 'text-secondary-foreground',
  ghost: 'text-foreground',
  link: 'text-primary underline',
};

const sizeVariants = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 rounded-md px-3',
  lg: 'h-11 rounded-md px-8',
  xl: 'h-16 rounded-md px-8',
  icon: 'h-10 w-10 flex items-center justify-center',
};

export interface ButtonProps {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof sizeVariants;
  className?: string;
  textClassName?: string;
  children: React.ReactNode;
  onPress?: () => Promise<void> | void;
  disabled?: boolean;
}

const Button = ({
  variant = 'default',
  size = 'default',
  disabled = false,
  className,
  textClassName,
  children,
  onPress,
  ...props
}: ButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = async () => {
    if (onPress) {
      setIsLoading(true);
      try {
        await onPress();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
        disabled || isLoading ? 'opacity-50' : 'opacity-100',
        buttonVariants[variant],
        sizeVariants[size],
        className
      )}
      {...props}>
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text className={cn(textVariants[variant], 'text-center font-semibold', textClassName)}>
          {children}
        </Text>
      )}
    </Pressable>
  );
};

export { Button };
