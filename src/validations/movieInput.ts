import { z } from "zod";

export const movieSchema = z.object({
  title: z.string(),
  category: z.array(z.string()),
  platform: z.array(z.string()),
  scale: z.string(),
  raito: z.string(),
  thumbnail: typeof window === 'undefined' ? z.any() : z.union([z.instanceof(File),z.string().nullable()]),
  movie: typeof window === 'undefined' ? z.any() : z.union([z.instanceof(File),z.string().nullable()]),
  // dlNumber: z.number(),
  remarks: z.string(),
  materials: z.number(),
  configuration: z.array(z.object({
    detail: z.string(),
    preview: typeof window === 'undefined' ? z.any() : z.union([z.instanceof(File),z.string().nullable()]),
    scene: z.number(),
    time: z.number(),
    textAreas: z.array(z.object({
      count: z.number(),
      text: z.string()
    }))
  })),
  // createdAt: z.date(),
  // updatedAt: z.date(),
});

export type MovieSchema = z.infer<typeof movieSchema>;