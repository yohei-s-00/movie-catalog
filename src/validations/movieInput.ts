import { z } from "zod";

export const movieSchema = z.object({
  title: z.string().nonempty({ message: "入力してください" }),
  category: z.array(z.string()).nonempty({ message: "チェックしてください" }),
  platform: z.array(z.string()).nonempty({ message: "チェックしてください" }),
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
  // dlNumber: z.number(),
  remarks: z.string(),
  materials: z.number(),
  configuration: z
    .object({
      detail: z.string().optional(),
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
