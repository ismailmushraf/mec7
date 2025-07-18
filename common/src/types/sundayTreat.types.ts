import { TreatStatus } from './enums';
import { Member } from './member.types';
import { PaginationParams } from './base.types';


// Base Types
export interface SundayTreat {
  id: string;
  hostMemberId: string;
  proposedDate: Date | string;
  location?: string | null;
  status: TreatStatus;
  approvedAt?: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface SundayTreatWithRelations extends SundayTreat {
  hostMember?: Member;
}

// DTOs
export interface CreateSundayTreatDto {
  hostMemberId: string;
  proposedDate: Date | string;
  location?: string;
  alternativeDate?: Date | string; // Not in schema but useful
  numberOfGuests?: number; // Additional info
  specialRequests?: string; // Additional info
}

export interface UpdateSundayTreatDto {
  proposedDate?: Date | string;
  location?: string;
  status?: TreatStatus;
}

export interface ApproveSundayTreatDto {
  treatId: string;
  approvedDate?: Date | string; // Can be different from proposed
  notes?: string;
}

export interface CancelSundayTreatDto {
  treatId: string;
  reason: string;
}

// Response Types
export interface SundayTreatDetailResponse extends SundayTreatWithRelations {
  canEdit?: boolean;
  canApprove?: boolean;
  conflictingTreats?: SundayTreat[];
}

// Query Types
export interface SundayTreatFilters extends PaginationParams {
  hostMemberId?: string;
  status?: TreatStatus;
  dateFrom?: Date | string;
  dateTo?: Date | string;
  location?: string;
  pendingApproval?: boolean;
}
