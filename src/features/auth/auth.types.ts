export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: 'Bearer';
}

export interface AuthUser {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  preferred_language: 'de' | 'en' | 'fr' | 'it';
  user_type: 'customer';
  is_active: boolean;
  is_verified: boolean;
  avatar_url: string | null;
}

export interface AuthResponse {
  user: AuthUser;
  tokens: AuthTokens;
}
