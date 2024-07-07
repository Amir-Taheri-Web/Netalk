"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "./Loader";
import { FC, useState } from "react";
import { TPostCommentProps } from "@/types/types";
import toast from "react-hot-toast";
import { createThread } from "@/actions/thread.action";
import { cn } from "@/lib/utils";

const PostComment: FC<TPostCommentProps> = ({ parentId }) => {
  const { user, isLoaded } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof threadValidation>>({
    resolver: zodResolver(threadValidation),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof threadValidation>) => {
    setIsLoading(true);
    try {
      await createThread({
        userId: user?.id || "",
        text: values.content,
        parentId,
      });

      form.reset();

      toast.success("Comment created");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded) return <Loader />;

  return (
    <div className="flex gap-4 items-center w-full py-4 border-y-[1px] border-dark-4 border-opacity-80">
      <Image
        src={user?.imageUrl as string}
        alt="avatar"
        width={60}
        height={60}
        className="rounded-full object-cover"
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-row gap-4 items-center w-full"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="Comment..."
                    {...field}
                    className="bg-transparent border-none ring-offset-0 focus-visible:ring-offset-0 focus-visible:ring-0 text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className={cn("bg-main-1 hover:bg-main-1 rounded-full px-8", {
              "opacity-50": isLoading,
            })}
          >
            Reply
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PostComment;
