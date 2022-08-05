import { z } from "zod";

export const movieSchema = z.object({
  title: z.string().nonempty({ message: '入力してください' }),
  category: z.string().array().nonempty({ message: '選択してください' }),
  platform: z.string().array().nonempty({ message: '選択してください' }),
  scale: z.string().nonempty({ message: '選択してください' }),
  thumbnail: z.any(),
  movie: z.any(),
  dlNumber: z.number(),
  remarks: z.string(),
  materials: z.number(),
  configuration: z.array(z.object({
    detail: z.string(),
    preview: z.any(),
    scene: z.number(),
    textAreas: z.array(z.object({
      count: z.number(),
      text: z.string()
    }))
  })),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Schema = z.infer<typeof movieSchema>;