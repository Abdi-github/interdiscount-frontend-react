import { Navigate, useParams } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { selectIsAuthenticated } from '@/shared/state/authSlice';

interface GuestRouteProps {
  children: React.ReactNode;
}

export default function GuestRoute({ children }: GuestRouteProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { locale = 'de' } = useParams<{ locale: string }>();

  if (isAuthenticated) {
    return <Navigate to={`/${locale}/account/profile`} replace />;
  }

  return <>{children}</>;
}
