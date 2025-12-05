import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StorefrontIcon from '@mui/icons-material/Storefront';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useTranslation } from 'react-i18next';

const ITEMS = [
  { icon: <LocalShippingIcon />, key: 'free_shipping' },
  { icon: <StorefrontIcon />, key: 'click_collect' },
  { icon: <VerifiedIcon />, key: 'guarantee' },
];

export default function PromoStrip() {
  const { t } = useTranslation('home');

  return (
    <Box sx={{ bgcolor: 'grey.100', borderBottom: 1, borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: { xs: 'flex-start', md: 'center' },
            gap: { xs: 3, md: 6 },
            py: 1,
            overflowX: 'auto',
            scrollbarWidth: 'none',
          }}
        >
          {ITEMS.map((item) => (
            <Box
              key={item.key}
              sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}
            >
              <Box sx={{ color: 'primary.main', display: 'flex' }}>{item.icon}</Box>
              <Typography variant="body2" fontWeight={500} noWrap>
                {t(`promo_strip.${item.key}`)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
