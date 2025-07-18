import { MediaType, MediaPlatform } from './enums';
import { PaginationParams } from './base.types';

// Base Types
export interface Media {
  id: string;
  type: MediaType;
  platform: MediaPlatform;
  url: string;
  thumbnailUrl?: string | null;
  title: string;
  description?: string | null;
  eventId?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface MediaWithRelations extends Media {
  event?: Event;
}

// DTOs
export interface CreateMediaDto {
  type: MediaType;
  platform: MediaPlatform;
  url: string;
  title: string;
  description?: string;
  eventId?: string;
  thumbnailUrl?: string;
}

export interface UpdateMediaDto {
  title?: string;
  description?: string;
  eventId?: string;
  thumbnailUrl?: string;
}

export interface BulkCreateMediaDto {
  eventId?: string;
  media: Array<{
    type: MediaType;
    platform: MediaPlatform;
    url: string;
    title: string;
    description?: string;
  }>;
}

// Query Types
export interface MediaFilters extends PaginationParams {
  type?: MediaType;
  platform?: MediaPlatform;
  eventId?: string;
  search?: string;
  hasEvent?: boolean;
}
