import { useState } from 'react';
import { Box, TextField, InputAdornment, Typography, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { useGetStoresQuery } from '../stores.api';
import { StoreCard } from './StoreCard';
import type { Store } from '../stores.types';

interface StoreLocatorProps {
  onSelect?: (store: Store) => void;
  selectedId?: string;
}

export function StoreLocator({ onSelect, selectedId }: StoreLocatorProps) {
  const { t } = useTranslation('stores');
  const [search, setSearch] = useState('');
  const { data, isLoading } = useGetStoresQuery({ search });

  return (
    <Box>
      <TextField
        fullWidth
        size="small"
        placeholder={t('search')}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>
          ),
        }}
      />
      {isLoading ? (
        <Box sx={{ textAlign: 'center', py: 4 }}><CircularProgress size={24} /></Box>
      ) : !data?.data?.length ? (
        <Typography color="text.secondary">{t('empty')}</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, maxHeight: 400, overflowY: 'auto' }}>
          {data.data.map((store) => (
            <StoreCard
              key={store._id}
              store={store}
              selected={selectedId === store._id}
              onClick={onSelect ? () => onSelect(store) : undefined}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
