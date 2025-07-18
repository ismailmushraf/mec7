import { z } from 'zod';
import { DateSchema, CuidSchema, PaginationSchema } from './base.schemas';

export const LeaderScheduleSchema = z.object({
  id: CuidSchema,
  leaderId: CuidSchema,
  scheduledDate: DateSchema,
  didAttend: z.boolean().nullable().optional(),
  substituteId: CuidSchema.nullable().optional(),
  substituteReason: z.string().max(500).nullable().optional(),
  createdAt: DateSchema,
  updatedAt: DateSchema,
});

export type LeaderSchedule = z.infer<typeof LeaderScheduleSchema>;

export const CreateLeaderScheduleSchema = z.object({
  leaderId: CuidSchema,
  scheduledDate: DateSchema,
}).refine((data) => {
  // Scheduled date should not be too far in the past
  const scheduled = new Date(data.scheduledDate);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return scheduled >= thirtyDaysAgo;
}, {
  message: 'Cannot schedule more than 30 days in the past',
  path: ['scheduledDate'],
});

export type CreateLeaderScheduleDto = z.infer<typeof CreateLeaderScheduleSchema>;

export const UpdateLeaderScheduleSchema = z.object({
  didAttend: z.boolean().optional(),
  substituteId: CuidSchema.optional(),
  substituteReason: z.string().max(500).optional(),
}).refine((data) => {
  // If marked as not attended (false), should have substitute or reason
  if (data.didAttend === false && !data.substituteId && !data.substituteReason) {
    return false;
  }
  return true;
}, {
  message: 'Please provide a substitute or reason for absence',
  path: ['substituteReason'],
});

export type UpdateLeaderScheduleDto = z.infer<typeof UpdateLeaderScheduleSchema>;

export const BulkCreateScheduleSchema = z.object({
  leaderId: CuidSchema,
  dates: z.array(DateSchema)
    .min(1, 'At least one date is required')
    .max(365, 'Cannot schedule more than 365 days at once')
    .refine((dates) => {
      // Check for duplicates
      const uniqueDates = new Set(dates.map(d => new Date(d).toDateString()));
      return uniqueDates.size === dates.length;
    }, 'Duplicate dates are not allowed'),
  recurring: z.object({
    pattern: z.enum(['daily', 'weekly', 'monthly']).optional(),
    daysOfWeek: z.array(z.number().min(0).max(6)).optional(), // 0 = Sunday, 6 = Saturday
    endDate: DateSchema.optional(),
  }).optional(),
});

export type BulkCreateScheduleDto = z.infer<typeof BulkCreateScheduleSchema>;

export const MarkAttendanceSchema = z.object({
  scheduleId: CuidSchema,
  didAttend: z.boolean(),
  substituteId: CuidSchema.optional(),
  reason: z.string().max(500).optional(),
}).refine((data) => {
  // If not attended, need substitute or reason
  if (!data.didAttend && !data.substituteId && !data.reason) {
    return false;
  }
  return true;
}, {
  message: 'Please provide a substitute or reason for absence',
});

export type MarkAttendanceDto = z.infer<typeof MarkAttendanceSchema>;

export const BulkMarkAttendanceSchema = z.object({
  attendances: z.array(
    z.object({
      scheduleId: CuidSchema,
      didAttend: z.boolean(),
      substituteId: CuidSchema.optional(),
      reason: z.string().max(500).optional(),
    })
  ).min(1).max(100),
});

export type BulkMarkAttendanceDto = z.infer<typeof BulkMarkAttendanceSchema>;

// Query filters
export const LeaderScheduleFiltersSchema = PaginationSchema.extend({
  leaderId: CuidSchema.optional(),
  substituteId: CuidSchema.optional(),
  dateFrom: DateSchema.optional(),
  dateTo: DateSchema.optional(),
  hasSubstitute: z.boolean().optional(),
  attendanceStatus: z.enum(['present', 'absent', 'pending']).optional(),
  month: z.number().min(1).max(12).optional(),
  year: z.number().min(2020).max(2100).optional(),
});

export type LeaderScheduleFilters = z.infer<typeof LeaderScheduleFiltersSchema>;

// Analytics
export const LeaderAttendanceStatsSchema = z.object({
  leaderId: CuidSchema,
  totalScheduled: z.number().int(),
  totalAttended: z.number().int(),
  totalAbsent: z.number().int(),
  totalPending: z.number().int(),
  attendanceRate: z.number().min(0).max(100),
  monthlyStats: z.array(z.object({
    month: z.string(),
    scheduled: z.number().int(),
    attended: z.number().int(),
    rate: z.number().min(0).max(100),
  })),
  substitutes: z.array(z.object({
    memberId: CuidSchema,
    memberName: z.string(),
    count: z.number().int(),
  })),
});

export type LeaderAttendanceStats = z.infer<typeof LeaderAttendanceStatsSchema>;

// Schedule conflicts
export const ScheduleConflictSchema = z.object({
  date: DateSchema,
  leaders: z.array(z.object({
    id: CuidSchema,
    name: z.string(),
    scheduleId: CuidSchema,
  })),
});

export type ScheduleConflict = z.infer<typeof ScheduleConflictSchema>;
