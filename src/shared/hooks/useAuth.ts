import { useAppSelector } from '@/app/hooks';
import { selectAuthUser, selectIsAuthenticated } from '../state/authSlice';

export function useAuth() {
  const user = useAppSelector(selectAuthUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  return { user, isAuthenticated };
}
