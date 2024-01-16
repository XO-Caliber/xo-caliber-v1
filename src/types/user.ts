// sharedSchemas.ts
import { z } from "zod";

export const user = z.object({
  name: z.string().min(4).max(20),
  emailAddress: z.string().email(),
  password: z.string().min(5),
  passwordConfirm: z.string()
});
export const firmUser = z.object({
  count: z.number(),
  email: z.string().email()
});
