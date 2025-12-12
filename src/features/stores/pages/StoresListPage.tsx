import { useState, useMemo } from 'react';
import { Container, Typography, Box, CircularProgress, TextField, InputAdornment, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetStoresQuery } from '../stores.api';
import { StoreCard } from '../components/StoreCard';
import EmptyState from '@/shared/components/EmptyState';
import StoreIcon from '@mui/icons-material/Store';

export default function StoresListPage() {
  const { t } = useTranslation('stores');
  const navigate = useNavigate();
  /* console.log('StoresListPage - loading store locations'); */
  const [search, setSearch] = useState('');
  const [canton, setCanton] = useState('');
  // TODO: Add store availability hours filter
  const { data, isLoading } = useGetStoresQuery({});

  const cantons = useMemo(() => {
    const set = new Set((data?.data ?? []).map((s) => s.canton).filter(Boolean));
    return Array.from(set).sort();
  }, [data]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return (data?.data ?? []).filter((s) => {
      const matchesCanton = canton ? s.canton === canton : true;
      const matchesSearch = q
        ? s.name.toLowerCase().includes(q) ||
          s.city.toLowerCase().includes(q) ||
          s.postal_code.includes(q)
        : true;
      return matchesCanton && matchesSearch;
    });
  }, [data, search, canton]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>{t('title')}</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>{t('subtitle')}</Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          size="small"
          placeholder={t('search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flexGrow: 1, minWidth: 220 }}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
        />
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>{t('filter_canton')}</InputLabel>
          <Select
            value={canton}
            label={t('filter_canton')}
            onChange={(e) => setCanton(e.target.value)}
          >
            <MenuItem value="">{t('all_cantons')}</MenuItem>
            {cantons.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>

      {isLoading ? (
        <Box sx={{ textAlign: 'center', py: 6 }}><CircularProgress /></Box>
      ) : !filtered.length ? (
        <EmptyState icon={<StoreIcon sx={{ fontSize: 64 }} />} title={t('empty')} />
      ) : (
        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' } }}>
          {filtered.map((store) => (
            <StoreCard
              key={store._id}
              store={store}
              onClick={() => navigate(`/stores/${store._id}`)}
            />
          ))}
        </Box>
      )}
    </Container>
  );
}
