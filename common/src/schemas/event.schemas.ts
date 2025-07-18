// common/schemas/event.schemas.ts
import { z } from 'zod';
import { EventTypeSchema } from './enums.schemas';
import { DateSchema, CuidSchema, PaginationSchema, PhoneSchema } from './base.schemas';

export const EventSchema = z.object({
  id: CuidSchema,
  title: z.string().min(3).max(200),
  description: z.string().min(10).max(1000),
  eventType: EventTypeSchema,
  date: DateSchema,
  location: z.string().min(3).max(200),
  createdAt: DateSchema,
  updatedAt: DateSchema,
});

export type Event = z.infer<typeof EventSchema>;

export const CreateEventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000),
  eventType: EventTypeSchema,
  date: z.string().datetime().or(z.date()).refine((date) => {
    const eventDate = new Date(date);
    return eventDate > new Date();
  }, 'Event date must be in the future'),
  location: z.string().min(3).max(200),
});

export type CreateEventDto = z.infer<typeof CreateEventSchema>;

export const UpdateEventSchema = CreateEventSchema.partial();
export type UpdateEventDto = z.infer<typeof UpdateEventSchema>;

export const EventRegistrationSchema = z.object({
  id: CuidSchema,
  eventId: CuidSchema,
  memberId: CuidSchema.nullable().optional(),
  guestName: z.string().min(2).max(100).nullable().optional(),
  guestPhone: PhoneSchema.nullable().optional(),
  registeredAt: DateSchema,
});

export type EventRegistration = z.infer<typeof EventRegistrationSchema>;

export const RegisterForEventSchema = z.object({
  eventId: CuidSchema,
  memberId: CuidSchema.optional(),
  guestName: z.string().min(2).optional(),
  guestPhone: PhoneSchema.optional(),
}).refine((data) => {
  // Either memberId or guest details required
  return data.memberId || (data.guestName && data.guestPhone);
}, {
  message: 'Either member ID or guest details (name and phone) are required',
});

export type RegisterForEventDto = z.infer<typeof RegisterForEventSchema>;

export const EventFiltersSchema = PaginationSchema.extend({
  search: z.string().optional(),
  eventType: EventTypeSchema.optional(),
  dateFrom: DateSchema.optional(),
  dateTo: DateSchema.optional(),
  location: z.string().optional(),
  status: z.enum(['upcoming', 'past', 'today']).optional(),
  hasMedia: z.boolean().optional(),
});

export type EventFilters = z.infer<typeof EventFiltersSchema>;
