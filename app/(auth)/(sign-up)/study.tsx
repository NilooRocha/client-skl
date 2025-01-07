import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Pressable, View } from "react-native";
import { Text } from "react-native";
import Sheet from "~/components/ui/sheet";
import { router } from "expo-router";

const schema = z.object({

  interesedArea: z.string().min(4, { message: "Invalid interesed area." }),

})

export default function Study() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const form = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    router.replace("/(main)/home")
  };

  return (
    <View className="mt-12">
      <FormProvider {...form}>
        <View className="ml-4" >
          <Text className="text-4xl text-primary font-black" >Create Account</Text>
          <Text className="text-foreground font-extrabold" >Sign up to continue</Text>
        </View>
        <Form className="p-4">
          <FormItem>
            <FormLabel>interesedArea</FormLabel>
            <FormControl
              name="name"
              render={({ value, onChange }) => (
                <Input
                  placeholder="eg. Jhon Doe"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <FormMessage />
          </FormItem>

          <Button onPress={form.handleSubmit(onSubmit)}>Submit</Button>
        </Form>
      </FormProvider>


      <Sheet title="Why Institutional?" isVisible={isModalVisible} onClose={onModalClose}>
        <View  >
          <Text className="py-1" >To ensure the authenticity and security of our platform, it is necessary to use an institutional email address to log in. Using an email associated with your college or university helps verify that you are part of an eligible educational institution.</Text>
          <Text className="py-1">This requirement not only protects our users but also allows us to offer tailored content and services for the academic environment, such as access to exclusive benefits, university events, and materials related to your studies.</Text>
          <Text className="py-1">If you do not have an institutional email, we recommend reaching out to your institution's administration to obtain one. We are here to support your academic journey with maximum security and assistance!</Text>
        </View>

      </Sheet>

    </View>
  );
}
