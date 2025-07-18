import { z } from 'zod';
import { RoleSchema } from './enums.schemas';

export const AuthResponseSchema = z.object({
  user: z.object({
    id: z.string(),
    name: z.string(),
    phone: z.string().optional(),
    username: z.string().optional(),
    role: RoleSchema,
  }),
  token: z.string(),
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;
