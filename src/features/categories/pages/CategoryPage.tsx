import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import GridViewIcon from '@mui/icons-material/GridView';
import ListIcon from '@mui/icons-material/List';
import CloseIcon from '@mui/icons-material/Close';
import LocaleLink from '@/shared/components/LocaleLink';
import { useTranslation } from 'react-i18next';
import { useGetCategoryBySlugQuery, useGetCategoryProductsQuery } from '../categories.api';
import { CategorySidebar } from '../components/CategorySidebar';
import ProductFilterBar, { type ProductFilterValues } from '../components/ProductFilterBar';
import ProductCard from '@/features/products/components/ProductCard';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import EmptyState from '@/shared/components/EmptyState';
import { useAppSelector } from '@/app/hooks';
import { selectLanguage } from '@/shared/state/uiSlice';
import { localizeField } from '@/shared/utils/localizeField';

const SORT_VALUES = ['newest', 'price_asc', 'price_desc', 'rating'] as const;

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation('categories');
  const locale = useAppSelector(selectLanguage);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<ProductFilterValues>({});

  const { data: category, isLoading: catLoading } = useGetCategoryBySlugQuery(slug!);
  // TODO: Add breadcrumb trail caching for quick navigation

  // Build query params from filters
  const queryParams = {
    category_id: category?._id,
    page,
    limit: 24,
    sort,
    ...(filters.brand_id ? { brand_id: filters.brand_id } : {}),
    ...(filters.min_price ? { min_price: filters.min_price } : {}),
    ...(filters.max_price ? { max_price: filters.max_price } : {}),
    ...(filters.on_sale ? { on_sale: true } : {}),
    ...(filters.sustainable ? { sustainable: true } : {}),
    ...(filters.speed ? { speed: filters.speed } : {}),
  };

  const { data: productsData, isLoading: productsLoading } = useGetCategoryProductsQuery(
    queryParams,
    { skip: !category?._id }
  );
  
  /* console.log('Applied filters count:', Object.keys(filters).length); */

  const handleFilterChange = useCallback(
    (newFilters: ProductFilterValues) => {
      setFilters(newFilters);
      setPage(1);
    },
    [],
  );

  const handleClearFilter = useCallback(
    (key: keyof ProductFilterValues) => {
      setFilters((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      setPage(1);
    },
    [],
  );

  if (catLoading) return <LoadingSpinner fullPage />;

  const products = productsData?.data ?? [];
  const totalPages = productsData?.pagination.total_pages ?? 1;
  const totalItems = productsData?.pagination.total ?? 0;
  const categoryName = localizeField(category?.name, locale) || slug || '';

  // Build active filter chips
  const activeChips: { key: keyof ProductFilterValues; label: string }[] = [];
  if (filters.brand_id) activeChips.push({ key: 'brand_id', label: t('filters.brands') });
  if (filters.min_price || filters.max_price) {
    const parts: string[] = [];
    if (filters.min_price) parts.push(`≥ CHF ${filters.min_price}`);
    if (filters.max_price) parts.push(`≤ CHF ${filters.max_price}`);
    activeChips.push({ key: 'min_price', label: parts.join(' – ') });
  }
  if (filters.on_sale) activeChips.push({ key: 'on_sale', label: t('filters.promotions') });
  if (filters.sustainable) activeChips.push({ key: 'sustainable', label: t('filters.sustainable') });
  if (filters.speed) activeChips.push({ key: 'speed', label: t('filters.fast_delivery') });

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link component={LocaleLink} to="/" underline="hover" color="primary">
          Home
        </Link>
        <Typography color="text.primary" fontWeight={500}>
          {categoryName}
        </Typography>
      </Breadcrumbs>

      {/* Full-width category title above sidebar */}
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
        {categoryName}
      </Typography>

      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Left sidebar */}
        <Box sx={{ width: 230, flexShrink: 0, display: { xs: 'none', md: 'block' } }}>
          <CategorySidebar activeCategory={category ?? undefined} />
        </Box>

        {/* Main content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* "Produkte" heading + count */}
          <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
            {t('products_heading')}
          </Typography>
          {totalItems > 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              <strong>1 &ndash; {Math.min(24, totalItems)}</strong>{' '}
              {t('products_of_total', { total: totalItems.toLocaleString() })}
            </Typography>
          )}

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
                label={t('filters.reset')}
                size="small"
                clickable
                onClick={() => handleFilterChange({})}
                sx={{
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                }}
              />
            </Box>
          )}

          {/* Sort + view controls */}
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
            <Box />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FormControl size="small" sx={{ minWidth: 180 }}>
                <Select
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    setPage(1);
                  }}
                  displayEmpty
                  renderValue={(val) =>
                    `${t('filters.sort_label')}: ${t(`sort.${val}`)}`
                  }
                >
                  {SORT_VALUES.map((v) => (
                    <MenuItem key={v} value={v}>
                      {t(`sort.${v}`)}
                    </MenuItem>
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

          <Divider sx={{ mb: 2 }} />

          {productsLoading ? (
            <LoadingSpinner />
          ) : products.length === 0 ? (
            <EmptyState title={t('empty.title')} subtitle={t('empty.subtitle')} />
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
                    lg={viewMode === 'list' ? 12 : 4}
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
        </Box>
      </Box>
    </Container>
  );
}
