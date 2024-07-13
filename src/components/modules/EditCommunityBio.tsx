"use client";

import { TEditCommunityBioProps } from "@/types/types";
import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { threadValidation } from "@/validations/thread.validation";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { editCommunityBio } from "@/actions/community.action";

const EditCommunityBio: FC<TEditCommunityBioProps> = ({
  communityId,
  communityBio,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof threadValidation>>({
    resolver: zodResolver(threadValidation),
    defaultValues: {
      content: communityBio,
    },
  });

  const onSubmit = async (values: z.infer<typeof threadValidation>) => {
    setIsLoading(true);

    try {
      await editCommunityBio(communityId, values.content);
      toast.success("Bio updated");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex max-w-[1000px] gap-8 flex-1 bg-dark-2 p-8 max-sm:p-4 rounded-lg flex-col justify-start">
        <h3 className="font-bold text-2xl">Edit Community Bio</h3>

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
              Edit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditCommunityBio;
