import { NotificationType } from './enums';
import { PaginationParams } from './base.types';

// Base Types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  targetAll: boolean;
  targetMembers: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface NotificationWithReadStatus extends Notification {
  isRead?: boolean;
  readAt?: Date | string | null;
  readCount?: number;
  totalTargets?: number;
}

// DTOs
export interface CreateNotificationDto {
  title: string;
  message: string;
  type: NotificationType;
  targetAll?: boolean;
  targetMembers?: string[];
  scheduledFor?: Date | string; // For scheduled notifications
}

export interface MarkAsReadDto {
  notificationId: string;
  memberId: string;
}

// Query Types
export interface NotificationFilters extends PaginationParams {
  type?: NotificationType;
  targetMemberId?: string;
  isRead?: boolean;
  createdAfter?: Date | string;
  createdBefore?: Date | string;
}
