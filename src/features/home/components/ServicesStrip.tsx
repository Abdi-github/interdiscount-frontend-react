import LocaleLink from '@/shared/components/LocaleLink';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useTranslation } from 'react-i18next';

/**
 * "Einkaufen wie es dir gefällt" service benefits strip.
 * Matches the real interdiscount.ch homepage bottom section.
 */

const SERVICE_KEYS = [
  { icon: <VerifiedUserIcon sx={{ fontSize: 32 }} />, key: 'guarantee_plus', href: '/contact' },
  { icon: <StorefrontIcon sx={{ fontSize: 32 }} />, key: 'free_pickup', href: '/stores' },
  { icon: <LocalShippingIcon sx={{ fontSize: 32 }} />, key: 'free_shipping', href: '/shipping' },
];

export default function ServicesStrip() {
  const { t } = useTranslation('home');
  return (
    <Box sx={{ py: 4, borderTop: '1px solid #e8e8e8' }}>
      <Container maxWidth="lg">
        <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
          {t('services.heading')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            flexWrap: { xs: 'wrap', md: 'nowrap' },
          }}
        >
          {SERVICE_KEYS.map((svc) => (
            <Box
              key={svc.key}
              component={LocaleLink}
              to={svc.href}
              sx={{
                flex: 1,
                minWidth: 200,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2.5,
                borderRadius: 2,
                border: '1px solid #e8e8e8',
                textDecoration: 'none',
                color: 'text.primary',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: 'primary.main',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                },
              }}
            >
              <Box sx={{ color: 'primary.main', flexShrink: 0 }}>
                {svc.icon}
              </Box>
              <Box>
                <Typography variant="body2" fontWeight={700}>
                  {t(`services.${svc.key}`)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {t(`services.${svc.key}_desc`)}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
