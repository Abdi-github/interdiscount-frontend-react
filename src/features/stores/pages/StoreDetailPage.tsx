import { Container, Typography, Box, Button, CircularProgress, Divider, Chip } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useTranslation } from 'react-i18next';
import { useGetStoreByIdQuery } from '../stores.api';
import { StoreHours } from '../components/StoreHours';

export default function StoreDetailPage() {
  /* console.log('StoreDetailPage - loading store information'); */
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation('stores');
  const { data, isLoading } = useGetStoreByIdQuery(id!);
  // TODO: Implement store availability/hours filtering for products

  if (isLoading) return <Box sx={{ textAlign: 'center', py: 8 }}><CircularProgress /></Box>;
  const store = data?.data;
  if (!store) return <Typography sx={{ p: 4 }}>{t('empty')}</Typography>;

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${store.street} ${store.street_number}, ${store.postal_code} ${store.city}`)}` ;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/stores')} sx={{ mb: 2 }}>
        {t('title')}
      </Button>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
        <Typography variant="h4" fontWeight={700}>{store.name}</Typography>
        <Chip
          label={t(`formats.${store.format}`)}
          size="small"
          variant="outlined"
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>{t('detail.address')}</Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'flex-start' }}>
            <LocationOnIcon color="action" sx={{ mt: 0.3 }} />
            <Box>
              <Typography>{store.street} {store.street_number}</Typography>
              <Typography>{store.postal_code} {store.city}, {store.canton}</Typography>
            </Box>
          </Box>
          {store.phone && (
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <PhoneIcon color="action" />
              <Typography component="a" href={`tel:${store.phone}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                {store.phone}
              </Typography>
            </Box>
          )}
          {store.email && (
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <EmailIcon color="action" />
              <Typography component="a" href={`mailto:${store.email}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                {store.email}
              </Typography>
            </Box>
          )}
          <Button
            variant="outlined"
            size="small"
            startIcon={<OpenInNewIcon />}
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ mt: 1 }}
          >
            {t('direction')}
          </Button>
        </Box>

        {store.opening_hours && (
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>{t('detail.hours')}</Typography>
            <Divider sx={{ mb: 1 }} />
            <StoreHours hours={store.opening_hours} />
          </Box>
        )}
      </Box>
    </Container>
  );
}
