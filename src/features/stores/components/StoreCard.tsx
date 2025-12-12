import { Box, Typography, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { useTranslation } from 'react-i18next';
import type { Store } from '../stores.types';

interface StoreCardProps {
  store: Store;
  selected?: boolean;
  onClick?: () => void;
}

export function StoreCard({ store, selected, onClick }: StoreCardProps) {
  const { t } = useTranslation('stores');
  return (
    <Box
      onClick={onClick}
      sx={{
        border: '2px solid',
        borderColor: selected ? 'primary.main' : 'divider',
        borderRadius: 2,
        p: 2,
        cursor: onClick ? 'pointer' : 'default',
        bgcolor: selected ? 'primary.50' : 'background.paper',
        '&:hover': onClick ? { borderColor: 'primary.main' } : {},
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1 }}>
        <Typography variant="subtitle1" fontWeight={700}>{store.name}</Typography>
        {store.is_active ? (
          <Chip label={t('open_now')} color="success" size="small" />
        ) : (
          <Chip label={t('closed')} color="default" size="small" />
        )}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
        <LocationOnIcon fontSize="small" color="action" />
        <Typography variant="body2" color="text.secondary">
          {store.street} {store.street_number}, {store.postal_code} {store.city}
        </Typography>
      </Box>
      {store.phone && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
          <PhoneIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">{store.phone}</Typography>
        </Box>
      )}
    </Box>
  );
}
