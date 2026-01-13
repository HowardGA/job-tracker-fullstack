import zod from 'zod';

export interface CVResponse {
    message?: string;
    url?: string
};

export const cvSchema = zod.object({
  cv: zod
    .any()
    .refine((files) => files?.length === 1, "PDF file is required")
    .refine((files) => files?.[0]?.type === "application/pdf", "Only PDF files are allowed")
    .refine((files) => files?.[0]?.size <= 5 * 1024 * 1024, "Max file size is 5MB")
});

export type cvFormInput = zod.infer<typeof cvSchema>;