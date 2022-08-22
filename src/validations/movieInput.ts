import { z } from "zod";

export const movieSchema = z.object({
  title: z.string().nonempty({ message: "入力してください" }),
  category: z.array(z.string()),
  platform: z.array(z.string()),
  scale: z.string().nonempty({ message: "入力してください" }),
  raito: z.string().nonempty({ message: "入力してください" }),
  resolution: z.string().nonempty({ message: "入力してください" }),
  thumbnail:
    typeof window === "undefined"
      ? z.any()
      : z.union([z.instanceof(File), z.string().nullable()]),
  movie:
    typeof window === "undefined"
      ? z.any()
      : z.union([z.instanceof(File), z.string().nullable()]),
  remarks: z.string(),
  materials: z.number(),
  configuration: z
    .object({
      detail: z.string().optional(),
      imgVolume: z.number(),
      preview:
        typeof window === "undefined"
          ? z.any()
          : z.union([z.instanceof(File), z.string().nullable()]),
      scene: z.number(),
      time: z.number(),
      textAreas: z
        .object({
          count: z.number().optional(),
          text: z.string().optional(),
        })
        .array(),
    })
    .array(),
  // createdAt: z.date(),
  // updatedAt: z.date(),
});
export type MovieSchema = z.infer<typeof movieSchema>;

export const movieItemSchema = z.object({
  title: z.string().nonempty({ message: "入力してください" }),
  category: z.array(z.string()),
  platform: z.array(z.string()),
  scale: z.string().nonempty({ message: "入力してください" }),
  raito: z.string().nonempty({ message: "入力してください" }),
  resolution: z.string().nonempty({ message: "入力してください" }),
  thumbnail: z.string(),
  movie: z.string(),
  // dlNumber: z.number(),
  remarks: z.string(),
  materials: z.number(),
  configuration: z
    .object({
      detail: z.string().optional(),
      imgVolume: z.number(),
      preview: z.string(),
      scene: z.number(),
      time: z.number(),
      textAreas: z
        .object({
          count: z.number().optional(),
          text: z.string().optional(),
        })
        .array(),
    })
    .array(),
});
export type MovieItemSchema = z.infer<typeof movieItemSchema>;
export type MovieInputSchema = MovieItemSchema | MovieSchema;
