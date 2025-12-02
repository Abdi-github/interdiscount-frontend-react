import { useEffect } from 'react';
import { Outlet, useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/app/hooks';
import { setLanguage, type AppLocale } from '@/shared/state/uiSlice';

const SUPPORTED_LOCALES = ['de', 'en', 'fr', 'it'];

/**
 * Wraps all routes behind `/:locale`.
 * – Validates the locale param
 * – Syncs the URL locale → i18n + Redux on mount & on change
 * – Falls back to `/de` for invalid locales
 */
export default function LocaleLayout() {
  const { locale } = useParams<{ locale: string }>();
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();

  // Redirect if locale is invalid
  if (!locale || !SUPPORTED_LOCALES.includes(locale)) {
    return <Navigate to="/de" replace />;
  }

  // Sync URL locale → i18n + Redux
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
    dispatch(setLanguage(locale as AppLocale));
  }, [locale, i18n, dispatch]);

  return <Outlet />;
}
