import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { selectIsAuthenticated } from '@/shared/state/authSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();
  const { locale = 'de' } = useParams<{ locale: string }>();

  if (!isAuthenticated) {
    return <Navigate to={`/${locale}/auth/login`} state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
