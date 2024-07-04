"use client";

import { userValidation } from "@/validations/user.validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChangeEvent, FC } from "react";
import { TOnboardingProps } from "@/types/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Textarea } from "../ui/textarea";

const OnboardingPage: FC<TOnboardingProps> = ({ userInfo }) => {
  const form = useForm<z.infer<typeof userValidation>>({
    resolver: zodResolver(userValidation),
    defaultValues: userInfo,
  });

  const imageHandler = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    console.log("image handler");
  };

  const onSubmit = (values: z.infer<typeof userValidation>) => {
    console.log(values);
  };

  return (
    <main className="min-h-screen w-full flex-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 bg-dark-2 max-w-[1000px] p-8 rounded-lg w-full flex flex-col gap-8 m-8"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="flex gap-4 items-center">
                <FormLabel>
                  {field.value ? (
                    <Image
                      src={field.value}
                      alt="user image"
                      width={140}
                      height={140}
                      className="relative h-auto object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-[140px] h-[140px] object-cover rounded-full">
                      {userInfo.name.charAt(0)}
                    </div>
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="Choose your avatar"
                    onChange={(e) => imageHandler(e, field.onChange)}
                    className="bg-transparent border-none outline-none text-main-1 cursor-pointer"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name:</FormLabel>
                <FormControl>
                  <Input placeholder="Name" className="input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username:</FormLabel>
                <FormControl>
                  <Input placeholder="Username" className="input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio:</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write about yourself"
                    className="input"
                    rows={15}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-main-1">
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default OnboardingPage;
