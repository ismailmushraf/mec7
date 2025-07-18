// common/schemas/sundayTreat.schemas.ts
import { z } from 'zod';
import { DateSchema, CuidSchema } from './base.schemas';
import { TreatStatusSchema } from './enums.schemas';

export const SundayTreatSchema = z.object({
  id: CuidSchema,
  hostMemberId: CuidSchema,
  proposedDate: DateSchema,
  location: z.string().max(200).nullable().optional(),
  status: TreatStatusSchema,
  approvedAt: DateSchema.nullable().optional(),
  createdAt: DateSchema,
  updatedAt: DateSchema,
});

export type SundayTreat = z.infer<typeof SundayTreatSchema>;

export const CreateSundayTreatSchema = z.object({
  hostMemberId: CuidSchema,
  proposedDate: DateSchema.refine((date) => {
    const proposed = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return proposed >= today;
  }, 'Proposed date cannot be in the past'),
  location: z.string().max(200).optional(),
  alternativeDate: DateSchema.optional(),
  numberOfGuests: z.number().int().positive().max(100).optional(),
  specialRequests: z.string().max(500).optional(),
});

export type CreateSundayTreatDto = z.infer<typeof CreateSundayTreatSchema>;

export const UpdateSundayTreatSchema = z.object({
  proposedDate: DateSchema.optional(),
  location: z.string().max(200).optional(),
  status: TreatStatusSchema.optional(),
});

export type UpdateSundayTreatDto = z.infer<typeof UpdateSundayTreatSchema>;

export const ApproveSundayTreatSchema = z.object({
  treatId: CuidSchema,
  approvedDate: DateSchema.optional(),
  notes: z.string().max(500).optional(),
});

export type ApproveSundayTreatDto = z.infer<typeof ApproveSundayTreatSchema>;
