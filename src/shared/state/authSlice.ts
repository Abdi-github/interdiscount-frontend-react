import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { loadFromStorage, saveToStorage, removeFromStorage } from '../utils/storage';

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

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  accessToken: loadFromStorage<string>('access_token'),
  refreshToken: loadFromStorage<string>('refresh_token'),
  user: loadFromStorage<AuthUser>('auth_user'),
  isAuthenticated: !!loadFromStorage<string>('access_token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{ user: AuthUser; access_token: string; refresh_token: string }>
    ) {
      state.user = action.payload.user;
      state.accessToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
      state.isAuthenticated = true;
      saveToStorage('access_token', action.payload.access_token);
      saveToStorage('refresh_token', action.payload.refresh_token);
      saveToStorage('auth_user', action.payload.user);
    },
    setTokens(state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      saveToStorage('access_token', action.payload.accessToken);
      saveToStorage('refresh_token', action.payload.refreshToken);
    },
    updateUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
      saveToStorage('auth_user', action.payload);
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      removeFromStorage('access_token');
      removeFromStorage('refresh_token');
      removeFromStorage('auth_user');
    },
  },
});

export const { setCredentials, setTokens, updateUser, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectAuthUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectAccessToken = (state: { auth: AuthState }) => state.auth.accessToken;
