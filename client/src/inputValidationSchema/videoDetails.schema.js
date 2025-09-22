import { z } from "zod";

export const updateVideoDetailsSchema = z.object({
  title: z
    .string()
    .min(3, "The title must be at least 3 characters")
    .max(50, "The title must be at most 50 characters"),
  freePreview: z.boolean({ coerce: true }),
  videoUrl: z.string().url(),
  s3Key: z.string(),
  _id: z.string(),
});

export const uploadVideoDetailsSchema = z.object({
  title: z
    .string()
    .min(3, "The title must be at least 3 characters")
    .max(50, "The title must be at most 50 characters"),
  freePreview: z.boolean({ coerce: true }),
  videoUrl: z.string().url(),
  s3Key: z.string(),
});
