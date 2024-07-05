"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { threadValidation } from "@/validations/thread.validation";
import * as z from "zod";
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
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { cn } from "@/lib/utils";

const CreateThreadPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof threadValidation>>({
    resolver: zodResolver(threadValidation),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = (values: z.infer<typeof threadValidation>) => {
    setIsLoading(true);
    console.log(values);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex max-w-[1000px] gap-8 flex-1 bg-dark-2 p-8 rounded-lg flex-col justify-start">
        <h2 className="text-4xl font-bold">Create Thread</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content:</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your thread"
                      rows={15}
                      className="input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className={cn("w-full bg-main-1 hover:bg-main-1", {
                "opacity-50": isLoading,
              })}
            >
              Post Thread
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateThreadPage;
