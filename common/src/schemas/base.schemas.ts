import { z } from 'zod';

export const PaginationSchema = z.object({
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export const ApiResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    message: z.string().optional(),
    error: z.string().optional(),
  });

export const BaseApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.object(),
  message: z.string().optional(),
  error: z.string().optional(),
});

export type ApiResponse = z.infer<typeof BaseApiResponseSchema>;

export const PaginatedResponseSchema = <T extends z.ZodType>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
  });

// Helper for date fields that can be string or Date
export const DateSchema = z.union([z.date(), z.date()]);

// Common ID validation
export const CuidSchema = z.cuid();
export const PhoneSchema = z.string().regex(/^[0-9]{10}$/, 'Invalid phone number');
