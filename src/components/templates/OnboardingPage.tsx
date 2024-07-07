"use client";

import { userValidation } from "@/validations/user.validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ChangeEvent, FC, useState } from "react";
import { TOnboardingProps } from "@/types/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { useUploadThing } from "@/utils/uploadThing";
import { isBase64Image } from "@/utils";
import { updateUser } from "@/actions/user.action";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const OnboardingPage: FC<TOnboardingProps> = ({ userInfo, isEdit }) => {
  const [files, setFiles] = useState<File[]>();
  const { startUpload } = useUploadThing("media");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { user } = useUser();

  const form = useForm<z.infer<typeof userValidation>>({
    resolver: zodResolver(userValidation),
    defaultValues: userInfo,
  });

  const imageHandler = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";

        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof userValidation>) => {
    setIsLoading(true);

    const blob = values.imageUrl;

    const hasImageChanged = isBase64Image(blob);

    if (hasImageChanged && files) {
      const imageResponse = await startUpload(files);

      if (imageResponse && imageResponse[0].url) {
        values.imageUrl = imageResponse[0].url;
      }
    }

    try {
      if (!isEdit) {
        await updateUser({ ...values, userId: userInfo.userId || "" });
      } else {
        await updateUser({
          ...values,
          isEdit: true,
          userId: userInfo.userId || "",
        });
      }
      user?.setProfileImage({ file: values.imageUrl });

      toast.success("Profile updated");

      if (!isEdit) {
        router.push("/");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      className={cn("w-full flex-center p-8", {
        "pt-0": isEdit,
        "min-h-screen": !isEdit,
      })}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 bg-dark-2 max-w-[1000px] p-8 rounded-lg w-full flex flex-col gap-8"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="relative flex gap-4 items-center flex-wrap">
                <FormLabel className="w-[140px] h-[140px] relative">
                  {field.value ? (
                    <Image
                      src={field.value}
                      alt="user image"
                      fill
                      className="size-full object-cover rounded-full !relative"
                      priority
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
                    className="bg-transparent border-none outline-none text-main-1 cursor-pointer w-fit"
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
          <Button
            type="submit"
            className={cn("bg-main-1 hover:bg-main-1", {
              "opacity-50": isLoading,
            })}
          >
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default OnboardingPage;
