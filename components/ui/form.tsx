import React, { createContext, useContext } from "react";
import { View, Text, TextInput, StyleProp, TextStyle, ViewStyle } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "~/lib/utils";

const FormContext = createContext({});

export const Form = ({ children, ...props }: any) => {
    return (
        <FormContext.Provider value={{}}>
            <View {...props}>{children}</View>
        </FormContext.Provider>
    );
};

export const FormItem = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <View className={cn("mb-4 ", className)}>{children}</View>;
};

export const FormLabel = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <Text className={cn("text-2xl font-medium text-foreground", className)}>{children}</Text>;
};

export const FormControl = ({
    name,
    render,
    className,
    style,
}: {
    name: string;
    render: (field: any) => JSX.Element;
    className?: string;
    style?: StyleProp<ViewStyle>;
}) => {
    const { control } = useFormContext();
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <View className={cn("my-2", className)} style={style}>
                    {render(field)}
                    {fieldState.error && <Text className=" text-destructive">{fieldState.error.message}</Text>}
                </View>
            )}
        />
    );
};

export const FormDescription = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return <Text className={cn("text-sm text-foreground", className)}>{children}</Text>;
};

export const FormMessage = ({ error }: { error?: string }) => {
    if (!error) return null;
    return <Text className="text-destructive">{error}</Text>;
};
