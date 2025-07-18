import { Role } from './enums';
import { PaginationParams } from './base.types';

// Base Types
export interface Member {
  id: string;
  name: string;
  phone: string;
  username?: string | null;
  role: Role;
  createdAt: Date | string;
  updatedAt: Date | string;
}

//export interface MemberWithRelations extends Member {
  //registrations?: EventRegistration[];
  //sundayTreats?: SundayTreat[];
  //leaderSchedules?: LeaderSchedule[];
  //substituteSchedules?: LeaderSchedule[];
//}

// DTOs
export interface CreateMemberDto {
  name: string;
  phone: string;
  username?: string;
  password: string;
  role?: Role;
}

export interface UpdateMemberDto {
  name?: string;
  phone?: string;
  username?: string;
  password?: string;
  role?: Role;
}

export interface LoginDto {
  phone?: string;
  username?: string;
  password: string;
}

export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}

// Response Types
export interface AuthResponse {
  member: Member;
  token: string;
}

// Query Types
export interface MemberFilters extends PaginationParams {
  search?: string;
  role?: Role;
  createdAfter?: Date | string;
  createdBefore?: Date | string;
}

