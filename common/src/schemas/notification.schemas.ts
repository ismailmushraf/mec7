import { z } from 'zod';
import { NotificationTypeSchema } from './enums.schemas';
import { DateSchema, CuidSchema, PaginationSchema } from './base.schemas';

export const NotificationSchema = z.object({
  id: CuidSchema,
  title: z.string().min(3).max(100),
  message: z.string().min(10).max(1000),
  type: NotificationTypeSchema,
  targetAll: z.boolean(),
  targetMembers: z.array(CuidSchema),
  createdAt: DateSchema,
  updatedAt: DateSchema,
});

export type Notification = z.infer<typeof NotificationSchema>;

export const NotificationReadSchema = z.object({
  id: CuidSchema,
  notificationId: CuidSchema,
  memberId: CuidSchema,
  readAt: DateSchema,
});

export type NotificationRead = z.infer<typeof NotificationReadSchema>;

export const CreateNotificationSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters')
    .trim(),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must not exceed 1000 characters')
    .trim(),
  type: NotificationTypeSchema,
  targetAll: z.boolean().optional().default(true),
  targetMembers: z.array(CuidSchema).optional().default([]),
  scheduledFor: DateSchema.optional(), // For future scheduled notifications
}).refine((data) => {
  // If not targeting all, must have specific members
  if (!data.targetAll && (!data.targetMembers || data.targetMembers.length === 0)) {
    return false;
  }
  return true;
}, {
  message: 'Must specify target members when not targeting all',
  path: ['targetMembers'],
}).refine((data) => {
  // If scheduledFor is provided, it must be in the future
  if (data.scheduledFor) {
    const scheduledDate = new Date(data.scheduledFor);
    return scheduledDate > new Date();
  }
  return true;
}, {
  message: 'Scheduled date must be in the future',
  path: ['scheduledFor'],
});

export type CreateNotificationDto = z.infer<typeof CreateNotificationSchema>;

export const UpdateNotificationSchema = z.object({
  title: z.string().min(3).max(100).trim().optional(),
  message: z.string().min(10).max(1000).trim().optional(),
  type: NotificationTypeSchema.optional(),
  targetAll: z.boolean().optional(),
  targetMembers: z.array(CuidSchema).optional(),
});

export type UpdateNotificationDto = z.infer<typeof UpdateNotificationSchema>;

export const MarkAsReadSchema = z.object({
  notificationId: CuidSchema,
  memberId: CuidSchema,
});

export type MarkAsReadDto = z.infer<typeof MarkAsReadSchema>;

export const BulkMarkAsReadSchema = z.object({
  notificationIds: z.array(CuidSchema).min(1).max(100),
  memberId: CuidSchema,
});

export type BulkMarkAsReadDto = z.infer<typeof BulkMarkAsReadSchema>;

// Response types
export const NotificationWithReadStatusSchema = NotificationSchema.extend({
  isRead: z.boolean().optional(),
  readAt: DateSchema.nullable().optional(),
  readCount: z.number().int().nonnegative().optional(),
  totalTargets: z.number().int().nonnegative().optional(),
});

export type NotificationWithReadStatus = z.infer<typeof NotificationWithReadStatusSchema>;

// Query filters
export const NotificationFiltersSchema = PaginationSchema.extend({
  type: NotificationTypeSchema.optional(),
  targetMemberId: CuidSchema.optional(),
  isRead: z.boolean().optional(),
  targetAll: z.boolean().optional(),
  search: z.string().max(100).optional(),
  createdAfter: DateSchema.optional(),
  createdBefore: DateSchema.optional(),
});

export type NotificationFilters = z.infer<typeof NotificationFiltersSchema>;

// Analytics
export const NotificationAnalyticsSchema = z.object({
  notificationId: CuidSchema,
  totalTargets: z.number().int(),
  totalReads: z.number().int(),
  readRate: z.number().min(0).max(100),
  readsByDate: z.array(z.object({
    date: z.string(),
    count: z.number().int(),
  })),
});

export type NotificationAnalytics = z.infer<typeof NotificationAnalyticsSchema>;
