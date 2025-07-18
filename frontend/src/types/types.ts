export interface ShowcaseEvent {
  id: number;
  name: string;
  date: string;
  description: string;
  detailedContent: string;
  participantsCount: number;
  location: string;
  duration: string;
  images: string[];
  coverImage: string;
  highlights: string[];
  organizers: string[];
  comments: Comment[];
}

export interface Comment {
  id: number;
  author: string;
  avatar?: string;
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  eventType: 'workout' | 'social' | 'competition' | 'special' | 'meeting';
  createdAt: string;
  createdBy: string;
  attendeesCount?: number;
  status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

export interface CreateEventData {
  title: string;
  description: string;
  date: string;
  location: string;
  eventType: Event['eventType'];
}

export interface Media {
  id: string;
  name: string;
  url: string;
  type: 'photo' | 'video';
  eventId?: string;
  uploadedAt: string;
  uploadedBy: string;
  size?: number;
  thumbnailUrl?: string;
}

export interface MediaUploadData {
  file: File;
  name: string;
  type: 'photo' | 'video';
}

export interface SundayTreatRequest {
  id: string;
  memberId: string;
  memberName: string;
  memberEmail: string;
  memberPhone?: string;
  houseName: string;
  preferredDate: string;
  alternativeDate?: string;
  numberOfGuests: number;
  specialRequests?: string;
  status: 'proposed' | 'approved' | 'completed' | 'cancelled';
  requestedAt: string;
  updatedAt: string;
  updatedBy?: string;
  completedAt?: string;
  notes?: string;
}

export interface StatusUpdateData {
  status: SundayTreatRequest['status'];
  notes?: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  type: 'general' | 'event' | 'reminder' | 'urgent' | 'update';
  targetAudience: 'all' | 'specific';
  targetMembers?: string[]; // Member IDs
  createdAt: string;
  createdBy: string;
  status: 'sent' | 'scheduled' | 'draft';
  readBy?: string[]; // Member IDs who have read
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'member' | 'leader' | 'admin';
  joinedAt: string;
  isActive: boolean;
}

export interface CreateNotificationData {
  title: string;
  description: string;
  type: Notification['type'];
  targetAudience: 'all' | 'specific';
  targetMembers?: string[];
}

