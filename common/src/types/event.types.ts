import { EventType } from './enums';
import { Member } from './member.types';
import { PaginationParams } from './base.types';
import { Media } from './media.types';

// Base Types
export interface Event {
  id: string;
  title: string;
  description: string;
  eventType: EventType;
  date: Date | string;
  location: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface EventWithMedia extends Event {
  registrations?: EventRegistration[];
  media?: Media[];
  registrationCount?: number;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  memberId?: string | null;
  guestName?: string | null;
  guestPhone?: string | null;
  registeredAt: Date | string;
  event?: Event;
  member?: Member;
}

// DTOs
export interface CreateEventDto {
  title: string;
  description: string;
  eventType: EventType;
  date: Date | string;
  location: string;
}

export interface UpdateEventDto {
  title?: string;
  description?: string;
  eventType?: EventType;
  date?: Date | string;
  location?: string;
}

export interface RegisterForEventDto {
  eventId: string;
  memberId?: string;
  guestName?: string;
  guestPhone?: string;
}

export interface BulkRegisterDto {
  eventId: string;
  registrations: Array<{
    memberId?: string;
    guestName?: string;
    guestPhone?: string;
  }>;
}

// Response Types
export interface EventDetailResponse extends EventWithMedia {
  isRegistered?: boolean;
  canRegister?: boolean;
  registrationDeadline?: Date | string;
}

export interface EventRegistrationResponse extends EventRegistration {
  eventDetails?: Event;
  memberDetails?: Member;
}

// Query Types
export interface EventFilters extends PaginationParams {
  search?: string;
  eventType?: EventType;
  dateFrom?: Date | string;
  dateTo?: Date | string;
  location?: string;
  status?: 'upcoming' | 'past' | 'today';
  hasMedia?: boolean;
}

export interface RegistrationFilters extends PaginationParams {
  eventId?: string;
  memberId?: string;
  includeGuests?: boolean;
  registeredAfter?: Date | string;
  registeredBefore?: Date | string;
}
