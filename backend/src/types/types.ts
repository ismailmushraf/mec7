import { PrismaClient, Role, EventType, Event, TreatStatus, NotificationType } from "@prisma/client/edge";

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    phone?: string
    username?: string;
    role: Role;
  };
  token: string;
}

export interface EventResponse {
  id: string;
  title: string;
  description: string;
  eventType: EventType;
  date: string;
  location: string;
}

export interface CancelEventResponse {
  success: boolean;
  event: Event;
  notificationId: string;
}

export interface MemberResponse {
  id: string;
  name: string;
  phone: string;
}

export interface EventDetailResponse {
  event: EventResponse,
  registrations: MemberResponse[]
}

export interface SundayTreatResponse {
  treat: {
    id: string;
    proposedDate: string;
    location: string | null;
    status: TreatStatus,
  }
  host: MemberResponse
}

export interface NotificationResponse {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
}

export type AppBindings = {
  JWT_SECRET: string;
};

export type AppVariables = {
  prisma: PrismaClient;
  userId: string;
};
