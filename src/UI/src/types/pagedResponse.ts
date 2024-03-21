import { z } from 'zod';

export const pagedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    page: z.number(),
    pageSize: z.number(),
    totalCount: z.number().nullable(),
    hasNextPage: z.boolean().nullable(),
    items: z.array(itemSchema)
  });

export type PagedResponse<TResponse> = z.infer<ReturnType<typeof pagedResponseSchema<z.ZodType<TResponse>>>>;
