import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import ProtectedRoute from './ProtectedRoute';
import GuestRoute from './GuestRoute';

// Layouts
const LocaleLayout = lazy(() => import('@/layouts/LocaleLayout'));
const MainLayout = lazy(() => import('@/layouts/MainLayout'));
const AuthLayout = lazy(() => import('@/layouts/AuthLayout'));
const AccountLayout = lazy(() => import('@/layouts/AccountLayout'));

// Pages – lazy loaded
const HomePage = lazy(() => import('@/features/home/pages/HomePage'));
const ProductDetailPage = lazy(() => import('@/features/products/pages/ProductDetailPage'));
const CategoryPage = lazy(() => import('@/features/categories/pages/CategoryPage'));
const SearchResultsPage = lazy(() => import('@/features/search/pages/SearchResultsPage'));
const CartPage = lazy(() => import('@/features/cart/pages/CartPage'));
const CheckoutPage = lazy(() => import('@/features/checkout/pages/CheckoutPage'));
const BrandsPage = lazy(() => import('@/features/brands/pages/BrandsPage'));
const StoresListPage = lazy(() => import('@/features/stores/pages/StoresListPage'));
const StoreDetailPage = lazy(() => import('@/features/stores/pages/StoreDetailPage'));
const OrdersListPage = lazy(() => import('@/features/orders/pages/OrdersListPage'));
const OrderDetailPage = lazy(() => import('@/features/orders/pages/OrderDetailPage'));
const OrderConfirmationPage = lazy(() => import('@/features/orders/pages/OrderConfirmationPage'));
const ProfilePage = lazy(() => import('@/features/profile/pages/ProfilePage'));
const DashboardPage = lazy(() => import('@/features/profile/pages/DashboardPage'));
const FavoritesPage = lazy(() => import('@/features/favorites/pages/FavoritesPage'));
const NotificationsPage = lazy(() => import('@/features/notifications/pages/NotificationsPage'));
const MyReviewsPage = lazy(() => import('@/features/reviews/pages/MyReviewsPage'));
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/pages/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('@/features/auth/pages/ForgotPasswordPage'));
const VerifyEmailPage = lazy(() => import('@/features/auth/pages/VerifyEmailPage'));
const NotFoundPage = lazy(() => import('@/features/static/pages/NotFoundPage'));
const ServicePage = lazy(() => import('@/features/static/pages/ServicePage'));
const SupportPage = lazy(() => import('@/features/static/pages/SupportPage'));
const UnternehmenPage = lazy(() => import('@/features/static/pages/UnternehmenPage'));
const AktionenPage = lazy(() => import('@/features/static/pages/AktionenPage'));
const ImpressumPage = lazy(() => import('@/features/static/pages/ImpressumPage'));
const DatenschutzPage = lazy(() => import('@/features/static/pages/DatenschutzPage'));
const AGBPage = lazy(() => import('@/features/static/pages/AGBPage'));
const ContactPage = lazy(() => import('@/features/static/pages/ContactPage'));

const wrap = (el: JSX.Element) => (
  <Suspense fallback={<LoadingSpinner fullPage />}>{el}</Suspense>
);

export const router = createBrowserRouter([
  /* Root → redirect to default locale */
  { path: '/', element: <Navigate to="/de" replace /> },

  /* All pages live under /:locale */
  {
    path: '/:locale',
    element: wrap(<LocaleLayout />),
    children: [
      {
        element: wrap(<MainLayout />),
        children: [
          { index: true, element: wrap(<HomePage />) },
          { path: 'products/:id', element: wrap(<ProductDetailPage />) },
          { path: 'categories/:slug', element: wrap(<CategoryPage />) },
          { path: 'search', element: wrap(<SearchResultsPage />) },
          { path: 'cart', element: wrap(<CartPage />) },
          { path: 'brands', element: wrap(<BrandsPage />) },
          { path: 'stores', element: wrap(<StoresListPage />) },
          { path: 'stores/:id', element: wrap(<StoreDetailPage />) },
          { path: 'service', element: wrap(<ServicePage />) },
          { path: 'support', element: wrap(<SupportPage />) },
          { path: 'unternehmen', element: wrap(<UnternehmenPage />) },
          { path: 'aktionen', element: wrap(<AktionenPage />) },
          { path: 'impressum', element: wrap(<ImpressumPage />) },
          { path: 'datenschutz', element: wrap(<DatenschutzPage />) },
          { path: 'agb', element: wrap(<AGBPage />) },
          { path: 'contact', element: wrap(<ContactPage />) },
          {
            path: 'checkout',
            element: wrap(
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            ),
          },
          {
            path: 'account',
            element: (
              <ProtectedRoute>
                {wrap(<AccountLayout />)}
              </ProtectedRoute>
            ),
            children: [
              { index: true, element: <Navigate to="dashboard" replace /> },
              { path: 'dashboard', element: wrap(<DashboardPage />) },
              { path: 'profile', element: wrap(<ProfilePage />) },
              { path: 'orders', element: wrap(<OrdersListPage />) },
              { path: 'orders/:id', element: wrap(<OrderDetailPage />) },
              { path: 'orders/:id/confirmation', element: wrap(<OrderConfirmationPage />) },
              { path: 'favorites', element: wrap(<FavoritesPage />) },
              { path: 'notifications', element: wrap(<NotificationsPage />) },
              { path: 'reviews', element: wrap(<MyReviewsPage />) },
            ],
          },
        ],
      },
      {
        path: 'auth',
        element: wrap(<AuthLayout />),
        children: [
          { index: true, element: <Navigate to="login" replace /> },
          {
            path: 'login',
            element: wrap(
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            ),
          },
          {
            path: 'register',
            element: wrap(
              <GuestRoute>
                <RegisterPage />
              </GuestRoute>
            ),
          },
          { path: 'forgot-password', element: wrap(<ForgotPasswordPage />) },
          { path: 'verify-email', element: wrap(<VerifyEmailPage />) },
          { path: 'verify-email/:token', element: wrap(<VerifyEmailPage />) },
        ],
      },
    ],
  },
  { path: '*', element: wrap(<NotFoundPage />) },
]);
