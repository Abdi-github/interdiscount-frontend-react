import { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Pagination from '@mui/material/Pagination';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import GridViewIcon from '@mui/icons-material/GridView';
import ListIcon from '@mui/icons-material/List';
import LocaleLink from '@/shared/components/LocaleLink';
import { useTranslation } from 'react-i18next';
import { useGetCategoryProductsQuery } from '@/features/categories/categories.api';
import ProductCard from '@/features/products/components/ProductCard';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';

const SORT_VALUES = ['newest', 'price_asc', 'price_desc', 'rating'] as const;

export default function AktionenPage() {
  const { t } = useTranslation('common');
  const { t: tCat } = useTranslation('categories');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { data: productsData, isLoading } = useGetCategoryProductsQuery({
    page,
    limit: 24,
    sort,
    on_sale: true,
  });

  const products = productsData?.data ?? [];
  const totalPages = productsData?.pagination.total_pages ?? 1;
  const totalItems = productsData?.pagination.total ?? 0;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link component={LocaleLink} to="/" underline="hover" color="primary">Home</Link>
        <Typography color="text.primary" fontWeight={500}>{t('nav.aktionen')}</Typography>
      </Breadcrumbs>

      <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
        {t('pages.aktionen.title')}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {t('pages.aktionen.description')}
      </Typography>

      {/* Controls row */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        {totalItems > 0 && (
          <Typography variant="body2" color="text.secondary">
            <strong>1 &ndash; {Math.min(24, totalItems)}</strong> {t('of')}{' '}
            {totalItems.toLocaleString('de-CH')} {t('products_label')}
          </Typography>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <Select
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
            >
              {SORT_VALUES.map((v) => (
                <MenuItem key={v} value={v}>{tCat(`sort.${v}`)}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            size="small"
            onChange={(_, v) => v && setViewMode(v)}
          >
            <ToggleButton value="grid" aria-label="grid view">
              <GridViewIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view">
              <ListIcon fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {isLoading ? (
        <LoadingSpinner />
      ) : products.length === 0 ? (
        <EmptyState
          title={t('pages.aktionen.empty_title')}
          subtitle={t('pages.aktionen.empty_subtitle')}
        />
      ) : (
        <>
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid
                item
                key={product._id}
                xs={viewMode === 'list' ? 12 : 6}
                sm={viewMode === 'list' ? 12 : 4}
                md={viewMode === 'list' ? 12 : 4}
                lg={viewMode === 'list' ? 12 : 3}
              >
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, p) => setPage(p)}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
}
