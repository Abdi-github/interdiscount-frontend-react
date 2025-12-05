import LocaleLink from '@/shared/components/LocaleLink';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useTranslation } from 'react-i18next';

/**
 * "Filialsuche" card below the category sidebar on the homepage.
 * Matches the real interdiscount.ch layout.
 */
export default function FilialCard() {
  const { t } = useTranslation('home');
  return (
    <Box
      sx={{
        mt: 2,
        p: 2,
        borderRadius: 2,
        border: '1px solid #e8e8e8',
        bgcolor: '#fafafa',
      }}
    >
      <Typography variant="subtitle2" fontWeight={700} gutterBottom>
        {t('store_finder.title')}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
        {t('store_finder.subtitle')}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
        {t('store_finder.description')}
      </Typography>
      <Button
        component={LocaleLink}
        to="/stores"
        variant="outlined"
        size="small"
        startIcon={<StorefrontIcon fontSize="small" />}
        sx={{ fontWeight: 600, fontSize: '0.78rem' }}
        fullWidth
      >
        {t('store_finder.button')}
      </Button>
    </Box>
  );
}
