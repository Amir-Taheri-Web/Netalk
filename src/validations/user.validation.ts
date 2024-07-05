import * as z from "zod";

const userValidation = z.object({
  imageUrl: z.string().url().min(1),
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(30, { message: "Name can't be more than 30 characters" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(30, { message: "Username can't be more than 30 characters" }),
  bio: z
    .string()
    .min(13, { message: "Bio must be at least 3 words" })
    .max(1000, { message: "Bio can't be more than 100 words" }),
});

export { userValidation };
