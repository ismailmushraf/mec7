enum Role {
  ADMIN = "ADMIN",  
  SUPER_ADMIN = "SUPER_ADMIN",
  LEADER = "LEADER",
  MEMBER = "MEMBER"
}

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
