import { z } from "zod";

export const schema = z.object({
  title: z.string().max(50),
  category: z.string().array(),
  platform: z.string().array(),
  scale: z.string().max(50),
  thumbnail: z.string(),
});

export type Schema = z.infer<typeof schema>;