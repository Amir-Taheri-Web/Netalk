import * as z from "zod";

const threadValidation = z.object({
  content: z.string().min(3, { message: "Content must be at least 3 characters" }),
});

export { threadValidation };
