import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import GridViewIcon from '@mui/icons-material/GridView';
import ListIcon from '@mui/icons-material/List';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useSearchProductsQuery } from '../search.api';
import ProductCard from '@/features/products/components/ProductCard';
import ProductFilterBar, { type ProductFilterValues } from '@/features/categories/components/ProductFilterBar';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';

const SORT_VALUES = ['newest', 'price_asc', 'price_desc', 'rating'] as const;

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const { t } = useTranslation('search');
  const { t: tCat } = useTranslation('categories');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<ProductFilterValues>({});

  const { data, isLoading } = useSearchProductsQuery(
    {
      q: query,
      page,
      per_page: 24,
      sort,
      ...(filters.brand_id ? { brand_id: filters.brand_id } : {}),
      ...(filters.min_price ? { min_price: filters.min_price } : {}),
      ...(filters.max_price ? { max_price: filters.max_price } : {}),
      ...(filters.on_sale ? { on_sale: true } : {}),
      ...(filters.sustainable ? { sustainable: true } : {}),
      ...(filters.speed ? { speed: filters.speed } : {}),
    },
    { skip: !query },
  );
  // TODO: Implement search result caching for identical queries

  const handleFilterChange = useCallback((newFilters: ProductFilterValues) => {
    setFilters(newFilters);
    setPage(1);
  }, []);

  const handleClearFilter = useCallback((key: keyof ProductFilterValues) => {
    setFilters((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setPage(1);
  }, []);

  if (!query) return <EmptyState title={t('start_typing')} sx={{ mt: 8 }} />;
  if (isLoading) return <LoadingSpinner fullPage />;

  const products = data?.data ?? [];
  const totalPages = data ? data.pagination.total_pages : 1;
  const totalItems = data?.pagination.total ?? 0;

  // Active filter chips
  const activeChips: { key: keyof ProductFilterValues; label: string }[] = [];
  if (filters.brand_id) activeChips.push({ key: 'brand_id', label: tCat('filters.brands') });
  if (filters.min_price || filters.max_price) {
    const parts: string[] = [];
    if (filters.min_price) parts.push(`≥ CHF ${filters.min_price}`);
    if (filters.max_price) parts.push(`≤ CHF ${filters.max_price}`);
    activeChips.push({ key: 'min_price', label: parts.join(' – ') });
  }
  if (filters.on_sale) activeChips.push({ key: 'on_sale', label: tCat('filters.promotions') });
  if (filters.sustainable) activeChips.push({ key: 'sustainable', label: tCat('filters.sustainable') });
  if (filters.speed) activeChips.push({ key: 'speed', label: tCat('filters.fast_delivery') });

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        {t('results', { count: totalItems, query })}
      </Typography>

      {/* Filter bar */}
      <ProductFilterBar
        filters={filters}
        onChange={handleFilterChange}
        totalProducts={totalItems}
      />

      {/* Active filter chips */}
      {activeChips.length > 0 && (
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 1.5 }}>
          {activeChips.map((chip) => (
            <Chip
              key={chip.key}
              label={chip.label}
              size="small"
              onDelete={() => handleClearFilter(chip.key)}
              deleteIcon={<CloseIcon sx={{ fontSize: '0.875rem !important' }} />}
              sx={{
                borderRadius: '4px',
                backgroundColor: 'rgba(211,47,47,0.08)',
                color: 'primary.main',
                fontWeight: 500,
                fontSize: '0.75rem',
              }}
            />
          ))}
          <Chip
            label={tCat('filters.reset')}
            size="small"
            clickable
            onClick={() => handleFilterChange({})}
            sx={{ borderRadius: '4px', fontSize: '0.75rem', fontWeight: 500 }}
          />
        </Box>
      )}

      {/* Sort + view */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1, mb: 2 }}>
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <Select
            value={sort}
            onChange={(e) => { setSort(e.target.value); setPage(1); }}
            displayEmpty
            renderValue={(val) => `${tCat('filters.sort_label')}: ${tCat(`sort.${val}`)}`}
          >
            {SORT_VALUES.map((v) => (
              <MenuItem key={v} value={v}>{tCat(`sort.${v}`)}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <ToggleButtonGroup value={viewMode} exclusive size="small" onChange={(_, v) => v && setViewMode(v)}>
          <ToggleButton value="grid" aria-label="grid view"><GridViewIcon fontSize="small" /></ToggleButton>
          <ToggleButton value="list" aria-label="list view"><ListIcon fontSize="small" /></ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {products.length === 0 ? (
        <EmptyState title={t('no_results', { query })} />
      ) : (
        <>
          <Grid container spacing={2}>
            {products.map((p) => (
              <Grid
                item
                key={p._id}
                xs={viewMode === 'list' ? 12 : 6}
                sm={viewMode === 'list' ? 12 : 4}
                md={viewMode === 'list' ? 12 : 3}
              >
                <ProductCard product={p} />
              </Grid>
            ))}
          </Grid>
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination count={totalPages} page={page} onChange={(_, p) => setPage(p)} color="primary" />
            </Box>
          )}
        </>
      )}
    </Container>
  );
}
