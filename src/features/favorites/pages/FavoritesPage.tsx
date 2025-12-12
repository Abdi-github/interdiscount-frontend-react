import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FavoritesGrid } from '../components/FavoritesGrid';

export default function FavoritesPage() {
  const { t } = useTranslation('favorites');
  // TODO: Add favorites list export functionality

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>{t('title')}</Typography>
      <FavoritesGrid />
    </Container>
  );
}
