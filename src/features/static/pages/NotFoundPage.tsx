import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocaleNavigate } from '@/shared/hooks/useLocalePath';

export default function NotFoundPage() {
  const navigate = useLocaleNavigate();
  const goBack = useNavigate();
  const { t } = useTranslation('common');
  // TODO: Track 404 errors for broken links analysis
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 2,
        }}
      >
        <Typography variant="h1" fontWeight={900} color="primary" sx={{ fontSize: { xs: '6rem', md: '10rem' } }}>
          404
        </Typography>
        <Typography variant="h5" fontWeight={700}>
          {t('errors.page_not_found')}
        </Typography>
        <Typography color="text.secondary">
          {t('errors.page_not_found_desc')}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button variant="contained" onClick={() => navigate('/')}>
            {t('errors.back_home')}
          </Button>
          <Button variant="outlined" onClick={() => goBack(-1)}>
            {t('errors.back')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
