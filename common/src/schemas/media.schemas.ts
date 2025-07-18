import { z } from 'zod';
import { MediaTypeSchema, MediaPlatformSchema } from './enums.schemas';
import { DateSchema, CuidSchema, PaginationSchema } from './base.schemas';

// Validation helpers
const YOUTUBE_URL_REGEX = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)[\w-]+/;
const FACEBOOK_URL_REGEX = /^(https?:\/\/)?(www\.)?(facebook\.com|fb\.com)\/.+/;
const IMAGE_URL_REGEX = /\.(jpg|jpeg|png|gif|webp)$/i;

export const MediaSchema = z.object({
  id: CuidSchema,
  type: MediaTypeSchema,
  platform: MediaPlatformSchema,
  url: z.url('Invalid URL'),
  thumbnailUrl: z.url().nullable().optional(),
  title: z.string().min(3).max(200),
  description: z.string().max(500).nullable().optional(),
  eventId: CuidSchema.nullable().optional(),
  createdAt: DateSchema,
  updatedAt: DateSchema,
});

export type Media = z.infer<typeof MediaSchema>;

export const CreateMediaSchema = z.object({
  type: MediaTypeSchema,
  platform: MediaPlatformSchema,
  url: z.url('Invalid URL'),
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  description: z.string().max(500).optional(),
  eventId: CuidSchema.optional(),
  thumbnailUrl: z.url().optional(),
}).refine((data) => {
  // Validate platform-specific URLs
  if (data.platform === 'YOUTUBE' && !YOUTUBE_URL_REGEX.test(data.url)) {
    return false;
  }
  if (data.platform === 'FACEBOOK' && !FACEBOOK_URL_REGEX.test(data.url)) {
    return false;
  }
  return true;
}, {
  message: 'URL does not match the selected platform',
  path: ['url'],
}).refine((data) => {
  // Validate thumbnail for photos
  if (data.type === 'PHOTO' && data.thumbnailUrl && !IMAGE_URL_REGEX.test(data.thumbnailUrl)) {
    return false;
  }
  return true;
}, {
  message: 'Thumbnail URL must be a valid image URL',
  path: ['thumbnailUrl'],
});

export type CreateMediaDto = z.infer<typeof CreateMediaSchema>;

export const UpdateMediaSchema = z.object({
  title: z.string().min(3).max(200).optional(),
  description: z.string().max(500).nullable().optional(),
  eventId: CuidSchema.nullable().optional(),
  thumbnailUrl: z.string().url().nullable().optional(),
});

export type UpdateMediaDto = z.infer<typeof UpdateMediaSchema>;

export const BulkCreateMediaSchema = z.object({
  eventId: CuidSchema.optional(),
  media: z.array(
    z.object({
      type: MediaTypeSchema,
      platform: MediaPlatformSchema,
      url: z.string().url(),
      title: z.string().min(3).max(200),
      description: z.string().max(500).optional(),
      thumbnailUrl: z.string().url().optional(),
    })
  ).min(1, 'At least one media item is required').max(50, 'Maximum 50 items allowed'),
});

export type BulkCreateMediaDto = z.infer<typeof BulkCreateMediaSchema>;

// Query filters
export const MediaFiltersSchema = PaginationSchema.extend({
  type: MediaTypeSchema.optional(),
  platform: MediaPlatformSchema.optional(),
  eventId: CuidSchema.optional(),
  search: z.string().max(100).optional(),
  hasEvent: z.boolean().optional(),
  createdAfter: DateSchema.optional(),
  createdBefore: DateSchema.optional(),
});

export type MediaFilters = z.infer<typeof MediaFiltersSchema>;

// Helper function to extract video ID from YouTube URL
export const extractYouTubeVideoId = (url: string): string | null => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/);
  return match ? match[1] : null;
};

// Helper to generate YouTube thumbnail URL
export const getYouTubeThumbnail = (videoId: string, quality: 'default' | 'hq' | 'maxres' = 'hq'): string => {
  return `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`;
};
