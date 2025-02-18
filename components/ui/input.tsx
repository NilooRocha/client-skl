import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

import { cn } from '~/lib/utils';

interface InputProps extends TextInputProps {
  className?: string;
}

export const Input = React.forwardRef<TextInput, InputProps>(({ className, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      className={cn(
        'h-11 w-full rounded-md border-2 border-border px-3 py-2 text-foreground focus:border-primary focus:ring-ring',
        className
      )}
      {...props}
    />
  );
});
Input.displayName = 'Input';
