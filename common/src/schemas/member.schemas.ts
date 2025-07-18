import { z } from 'zod';
import { RoleSchema } from './enums.schemas';
import { CuidSchema, DateSchema, PhoneSchema, PaginationSchema } from './base.schemas';

// Base member schema
export const MemberSchema = z.object({
  id: CuidSchema,
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: PhoneSchema,
  username: z.string().min(3).nullable().optional(),
  role: RoleSchema,
  createdAt: DateSchema,
  updatedAt: DateSchema,
});

export type Member = z.infer<typeof MemberSchema>;

// DTOs with validation rules
export const CreateMemberSchema = z.object({
  name: z.string().min(2).max(100),
  phone: PhoneSchema,
  username: z.string().min(3).max(50).optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
  role: RoleSchema.optional().default('MEMBER'),
});

export type CreateMemberDto = z.infer<typeof CreateMemberSchema>;

export const UpdateMemberSchema = CreateMemberSchema.partial().omit({ password: true });
export type UpdateMemberDto = z.infer<typeof UpdateMemberSchema>;

export const ChangePasswordSchema = z.object({
  oldPassword: z.string().min(1, 'Old password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type ChangePasswordDto = z.infer<typeof ChangePasswordSchema>;

export const LoginSchema = z.object({
  identifier: z.string().optional(),
  password: z.string().min(6, 'Password is required. Min 6 characters'),
});

export type LoginDto = z.infer<typeof LoginSchema>;

// Query filters
export const MemberFiltersSchema = PaginationSchema.extend({
  search: z.string().optional(),
  role: RoleSchema.optional(),
  isActive: z.boolean().optional(),
  createdAfter: DateSchema.optional(),
  createdBefore: DateSchema.optional(),
});

export type MemberFilters = z.infer<typeof MemberFiltersSchema>;
