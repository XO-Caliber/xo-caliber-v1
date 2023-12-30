// sharedSchemas.ts
import { z } from "zod";

export const oauthUserValidator = z.object({
  id: z.string(),
  name: z.string().min(4).max(20),
  email: z.string().email(),
  image: z.string()
});

export type oauthUser = z.infer<typeof oauthUserValidator>;
