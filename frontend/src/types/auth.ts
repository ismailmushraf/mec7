

export interface RegisterData {
  name: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  phone: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  phone?: string;
  username?: string;
  role: 'admin' | 'member' | 'leader';
}

export interface AuthResponse {
  user: User;
  token: string;
  message?: string;
}
