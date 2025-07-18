import { z } from 'zod';

export const RoleSchema = z.enum(['MEMBER', 'ADMIN', 'LEADER', 'SUPER_ADMIN']);
export type Role = z.infer<typeof RoleSchema>;

export const EventTypeSchema = z.enum([
  'REGULAR_DAY',
  'SPECIAL_PROGRAM',
  'SUNDAY_PROGRAM',
  'CELEBRATION',
  'GUEST_SESSION',
  'INDEPENDENCE_DAY',
  'ONAM',
  'REPUBLIC_DAY',
  'OTHER'
]);
export type EventType = z.infer<typeof EventTypeSchema>;

export const MediaTypeSchema = z.enum(['VIDEO', 'PHOTO']);
export type MediaType = z.infer<typeof MediaTypeSchema>;

export const MediaPlatformSchema = z.enum(['YOUTUBE', 'FACEBOOK']);
export type MediaPlatform = z.infer<typeof MediaPlatformSchema>;

export const TreatStatusSchema = z.enum(['PROPOSED', 'APPROVED', 'COMPLETED', 'CANCELLED']);
export type TreatStatus = z.infer<typeof TreatStatusSchema>;

export const NotificationTypeSchema = z.enum([
  'GENERAL',
  'EVENT',
  'CELEBRATION',
  'REMINDER',
  'EMERGENCY',
  'IMPORTANT'
]);
export type NotificationType = z.infer<typeof NotificationTypeSchema>;
