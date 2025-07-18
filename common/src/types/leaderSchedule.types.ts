import { Member } from "./member.types";
import { PaginationParams } from "./base.types";

export interface LeaderSchedule {
  id: string;
  leaderId: string;
  scheduledDate: Date | string;
  didAttend?: boolean | null;
  substituteId?: string | null;
  substituteReason?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface LeaderScheduleWithRelations extends LeaderSchedule {
  leader?: Member;
  substitute?: Member;
}

// DTOs
export interface CreateLeaderScheduleDto {
  leaderId: string;
  scheduledDate: Date | string;
}

export interface UpdateLeaderScheduleDto {
  didAttend?: boolean;
  substituteId?: string;
  substituteReason?: string;
}

export interface BulkCreateScheduleDto {
  leaderId: string;
  dates: Array<Date | string>;
}

export interface MarkAttendanceDto {
  scheduleId: string;
  didAttend: boolean;
  substituteId?: string;
  reason?: string;
}

// Query Types
export interface LeaderScheduleFilters extends PaginationParams {
  leaderId?: string;
  dateFrom?: Date | string;
  dateTo?: Date | string;
  hasSubstitute?: boolean;
  attendanceStatus?: 'present' | 'absent' | 'pending';
}
