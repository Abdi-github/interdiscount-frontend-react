import { forwardRef } from 'react';
import { Link, type LinkProps, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * Wrapper around React Router's Link that automatically prefixes
 * the current locale to absolute paths.
 *
 * `/service`  →  `/de/service`  (when locale is "de")
 * `../`       →  `../`          (relative paths are left untouched)
 */
const LocaleLink = forwardRef<HTMLAnchorElement, LinkProps>(
  function LocaleLink({ to, ...props }, ref) {
    const params = useParams<{ locale: string }>();
    const { i18n } = useTranslation();
    const locale = params.locale || i18n.language?.slice(0, 2) || 'de';

    let prefixedTo = to;
    if (typeof to === 'string' && to.startsWith('/')) {
      // Don't double-prefix if already has a locale segment
      if (!/^\/(de|en|fr|it)(\/|$)/.test(to)) {
        prefixedTo = `/${locale}${to}`;
      }
    }

    return <Link ref={ref} to={prefixedTo} {...props} />;
  },
);

export default LocaleLink;
