import { useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * Returns a helper that builds locale-prefixed paths.
 *
 *   const lp = useLocalePath();
 *   lp('/service') → '/de/service'
 */
export function useLocalePath() {
  const params = useParams<{ locale: string }>();
  const { i18n } = useTranslation();
  const locale = params.locale || i18n.language?.slice(0, 2) || 'de';

  return useCallback(
    (path: string) => {
      if (path.startsWith('/') && !/^\/(de|en|fr|it)(\/|$)/.test(path)) {
        return `/${locale}${path}`;
      }
      return path;
    },
    [locale],
  );
}

/**
 * Like `useNavigate` but auto-prefixes locale.
 */
export function useLocaleNavigate() {
  const navigate = useNavigate();
  const lp = useLocalePath();

  return useCallback(
    (to: string, options?: { replace?: boolean; state?: unknown }) => {
      navigate(lp(to), options);
    },
    [navigate, lp],
  );
}

/**
 * Switches locale in the current URL path.
 * `/de/service` → `/fr/service` when newLocale='fr'
 */
export function useLocaleSwitch() {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (newLocale: string) => {
      const newPath = location.pathname.replace(
        /^\/(de|en|fr|it)/,
        `/${newLocale}`,
      );
      navigate(newPath + location.search + location.hash, { replace: true });
    },
    [navigate, location],
  );
}
