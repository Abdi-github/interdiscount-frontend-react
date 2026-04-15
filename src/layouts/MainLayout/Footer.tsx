import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LocaleLink from '@/shared/components/LocaleLink';
import { useTranslation } from 'react-i18next';
import { useLocaleSwitch } from '@/shared/hooks/useLocalePath';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import StorefrontIcon from '@mui/icons-material/StorefrontOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useGetCategoriesQuery, useGetCategoryProductCountsQuery } from '@/features/categories/categories.api';
import type { Category } from '@/features/categories/categories.types';
import { localizeField } from '@/shared/utils/localizeField';
import { useAppDispatch } from '@/app/hooks';
import { setLanguage, type AppLocale } from '@/shared/state/uiSlice';

const LANGUAGES: { code: AppLocale; label: string }[] = [
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
  { code: 'it', label: 'Italiano' },
  { code: 'en', label: 'English' },
];

const SERVICE_LINKS = [
  { key: 'service_overview', href: '/service' },
  { key: 'pc_service', href: '/service' },
  { key: 'mobile_service', href: '/service' },
  { key: 'garantie_plus', href: '/service' },
  { key: 'cewe', href: '/service' },
  { key: 'trade_in', href: '/service' },
];

const SUPPORT_LINKS = [
  { key: 'support_overview', href: '/support' },
  { key: 'helpcenter', href: '/support' },
  { key: 'contact_us', href: '/support' },
  { key: 'shipping_delivery', href: '/support' },
  { key: 'repairs', href: '/support' },
  { key: 'returns_label', href: '/support' },
  { key: 'order_documents', href: '/account/orders' },
];

const COMPANY_LINKS = [
  { key: 'company_overview', href: '/unternehmen' },
  { key: 'about_interdiscount', href: '/unternehmen' },
  { key: 'sustainability', href: '/unternehmen' },
  { key: 'press', href: '/unternehmen' },
  { key: 'jobs', href: '/unternehmen' },
  { key: 'prospekt', href: '/unternehmen' },
  { key: 'business_customers', href: '/unternehmen' },
];

export default function Footer() {
  const { t, i18n } = useTranslation('common');
  const dispatch = useAppDispatch();
  const switchLocale = useLocaleSwitch();
  const locale = (i18n.language?.slice(0, 2) || 'de') as AppLocale;
  const year = new Date().getFullYear();
  const { data: allCategories = [] } = useGetCategoriesQuery();
  const { data: productCounts } = useGetCategoryProductCountsQuery();

  const handleLanguageChange = (code: AppLocale) => {
    dispatch(setLanguage(code));
    i18n.changeLanguage(code);
    switchLocale(code);
  };
  const rootCategories = (allCategories as Category[])
    .filter((c) => !c.parent_id)
    .filter((c) => !productCounts || (productCounts[c._id] ?? 0) > 0);

  return (
    <Box component="footer" sx={{ bgcolor: '#1a1a1a', color: 'grey.400', mt: 'auto' }}>
      {/* Top section: Logo + quick links */}
      <Box sx={{ bgcolor: '#111', py: 2.5, borderBottom: '1px solid #2a2a2a' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
            {/* Logo */}
            <Box component="img" src="/logo.svg" alt="Interdiscount" sx={{ height: 36, filter: 'brightness(0) invert(1)' }} />
            <Button
              component={LocaleLink}
              to="/stores"
              variant="outlined"
              size="small"
              startIcon={<StorefrontIcon />}
              sx={{ color: 'grey.300', borderColor: 'grey.600', '&:hover': { borderColor: 'white', color: 'white' } }}
            >
              {t('nav.find_store')}
            </Button>
            <Button
              component={LocaleLink}
              to="/contact"
              variant="outlined"
              size="small"
              startIcon={<HelpOutlineIcon />}
              sx={{ color: 'grey.300', borderColor: 'grey.600', '&:hover': { borderColor: 'white', color: 'white' } }}
            >
              {t('nav.helpcenter')}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Main link columns */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid container spacing={4}>
          {/* Sortiment — from API */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography
              variant="caption"
              sx={{ color: 'white', fontWeight: 700, mb: 2, display: 'block', textTransform: 'uppercase', letterSpacing: 0.5, fontSize: '0.7rem' }}
            >
              {t('footer.sortiment')}
            </Typography>
            {rootCategories.map((cat) => (
              <Link
                key={cat._id}
                component={LocaleLink}
                to={`/categories/${cat.slug}`}
                color="inherit"
                underline="hover"
                sx={{ display: 'block', mb: 0.75, fontSize: '0.82rem', '&:hover': { color: 'white' } }}
              >
                {localizeField(cat.name, locale)}
              </Link>
            ))}
          </Grid>

          {/* Service */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography
              variant="caption"
              sx={{ color: 'white', fontWeight: 700, mb: 2, display: 'block', textTransform: 'uppercase', letterSpacing: 0.5, fontSize: '0.7rem' }}
            >
              {t('footer.service')}
            </Typography>
            {SERVICE_LINKS.map((link) => (
              <Link
                key={link.key}
                component={LocaleLink}
                to={link.href}
                color="inherit"
                underline="hover"
                sx={{ display: 'block', mb: 0.75, fontSize: '0.82rem', '&:hover': { color: 'white' } }}
              >
                {t(`footer.${link.key}`)}
              </Link>
            ))}
          </Grid>

          {/* Support */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography
              variant="caption"
              sx={{ color: 'white', fontWeight: 700, mb: 2, display: 'block', textTransform: 'uppercase', letterSpacing: 0.5, fontSize: '0.7rem' }}
            >
              {t('footer.support')}
            </Typography>
            {SUPPORT_LINKS.map((link) => (
              <Link
                key={link.key}
                component={LocaleLink}
                to={link.href}
                color="inherit"
                underline="hover"
                sx={{ display: 'block', mb: 0.75, fontSize: '0.82rem', '&:hover': { color: 'white' } }}
              >
                {t(`footer.${link.key}`)}
              </Link>
            ))}
          </Grid>

          {/* Unternehmen */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography
              variant="caption"
              sx={{ color: 'white', fontWeight: 700, mb: 2, display: 'block', textTransform: 'uppercase', letterSpacing: 0.5, fontSize: '0.7rem' }}
            >
              {t('footer.company')}
            </Typography>
            {COMPANY_LINKS.map((link) => (
              <Link
                key={link.key}
                component={LocaleLink}
                to={link.href}
                color="inherit"
                underline="hover"
                sx={{ display: 'block', mb: 0.75, fontSize: '0.82rem', '&:hover': { color: 'white' } }}
              >
                {t(`footer.${link.key}`)}
              </Link>
            ))}
          </Grid>

          {/* Folgen Sie uns */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography
              variant="caption"
              sx={{ color: 'white', fontWeight: 700, mb: 2, display: 'block', textTransform: 'uppercase', letterSpacing: 0.5, fontSize: '0.7rem' }}
            >
              {t('footer.follow_us')}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {[
                { icon: <FacebookIcon fontSize="small" />, label: 'Facebook' },
                { icon: <InstagramIcon fontSize="small" />, label: 'Instagram' },
                { icon: <LinkedInIcon fontSize="small" />, label: 'LinkedIn' },
                { icon: <YouTubeIcon fontSize="small" />, label: 'YouTube' },
              ].map(({ icon, label }) => (
                <Tooltip key={label} title={label}>
                  <IconButton
                    size="small"
                    sx={{ color: 'grey.500', '&:hover': { color: 'white', bgcolor: 'grey.800' } }}
                    href="#"
                  >
                    {icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Box>
          </Grid>

          {/* Zahlungsarten */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography
              variant="caption"
              sx={{ color: 'white', fontWeight: 700, mb: 2, display: 'block', textTransform: 'uppercase', letterSpacing: 0.5, fontSize: '0.7rem' }}
            >
              {t('footer.payment_methods')}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
              {[
                { label: 'VISA' },
                { label: 'Mastercard' },
                { label: 'AMEX' },
                { label: 'TWINT' },
                { label: 'PostFinance' },
                { label: t('footer.invoice') },
                { label: t('footer.installments') },
                { label: 'PayPal' },
                { label: 'Apple Pay' },
              ].map((method) => (
                <Box
                  key={method.label}
                  sx={{
                    bgcolor: '#2a2a2a',
                    border: '1px solid #3a3a3a',
                    borderRadius: 1,
                    px: 1,
                    py: 0.3,
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    color: 'grey.400',
                    letterSpacing: 0.2,
                  }}
                >
                  {method.label}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: '#2a2a2a', my: 4 }} />

        {/* Language selector + legal */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          {/* Language */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {LANGUAGES.map((lang, i) => (
              <Box key={lang.code} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {i > 0 && <Typography sx={{ color: 'grey.600' }}>·</Typography>}
                <Link
                  component="button"
                  color="inherit"
                  underline="hover"
                  onClick={() => handleLanguageChange(lang.code)}
                  sx={{
                    fontSize: '0.78rem',
                    fontWeight: locale === lang.code ? 700 : 400,
                    color: locale === lang.code ? 'white' : 'grey.400',
                    '&:hover': { color: 'white' },
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {lang.label}
                </Link>
              </Box>
            ))}
          </Box>

          {/* Legal */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="caption" sx={{ color: 'grey.600' }}>© {year}</Typography>
            {([
              { key: 'terms', path: '/agb' },
              { key: 'imprint', path: '/impressum' },
              { key: 'privacy', path: '/datenschutz' },
              { key: 'cookie_settings', path: '#' },
            ] as const).map(({ key, path }) => (
              <Box key={key} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ color: 'grey.600', fontSize: '0.7rem' }}>·</Typography>
                <Link
                  component={path === '#' ? 'a' : LocaleLink}
                  {...(path === '#' ? { href: '#' } : { to: path })}
                  color="inherit"
                  underline="hover"
                  sx={{ fontSize: '0.78rem', '&:hover': { color: 'white' } }}
                >
                  {t(`footer.${key}`)}
                </Link>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      {/* Coop Gruppe bar */}
      <Box sx={{ bgcolor: '#111', py: 1.5, borderTop: '1px solid #2a2a2a', textAlign: 'center' }}>
        <Typography variant="caption" sx={{ color: 'grey.600' }}>
          {t('footer.coop_group')}
        </Typography>
      </Box>
    </Box>
  );
}
