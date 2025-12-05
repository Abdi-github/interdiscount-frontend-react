import { useState, useRef, useEffect, useMemo } from 'react';
import {
  Box,
  Button,
  Popover,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
  Slider,
  Switch,
  InputAdornment,
  Divider,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  FormGroup,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useGetBrandsQuery } from '@/features/brands/brands.api';
import type { Brand } from '@/features/brands/brands.types';

export interface ProductFilterValues {
  brand_id?: string;
  min_price?: number;
  max_price?: number;
  on_sale?: boolean;
  sustainable?: boolean;
  speed?: string;
}

interface ProductFilterBarProps {
  filters: ProductFilterValues;
  onChange: (filters: ProductFilterValues) => void;
  totalProducts?: number;
}

const PRICE_MAX = 10000;
const PRICE_STEP = 10;

export default function ProductFilterBar({
  filters,
  onChange,
  totalProducts,
}: ProductFilterBarProps) {
  const { t } = useTranslation('categories');

  // ── Active filter count ──
  const activeCount = useMemo(() => {
    let count = 0;
    if (filters.brand_id) count++;
    if (filters.min_price || filters.max_price) count++;
    if (filters.on_sale || filters.sustainable) count++;
    if (filters.speed) count++;
    return count;
  }, [filters]);

  return (
    <Box sx={{ mb: 2 }}>
      {/* Filter buttons row */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          flexWrap: 'wrap',
          mb: 1.5,
        }}
      >
        <BrandsFilter
          value={filters.brand_id}
          onChange={(brand_id) => onChange({ ...filters, brand_id })}
          label={t('filters.brands')}
        />
        <PriceFilter
          minPrice={filters.min_price}
          maxPrice={filters.max_price}
          onChange={(min_price, max_price) => onChange({ ...filters, min_price, max_price })}
          label={t('filters.price')}
        />
        <OffersFilter
          onSale={filters.on_sale}
          sustainable={filters.sustainable}
          onChange={(on_sale, sustainable) => onChange({ ...filters, on_sale, sustainable })}
          label={t('filters.offers')}
        />
        <FastDeliveryFilter
          value={!!filters.speed}
          onChange={(enabled) => onChange({ ...filters, speed: enabled ? 'fast' : undefined })}
          label={t('filters.fast_delivery')}
        />
        <MoreFiltersButton
          filters={filters}
          onChange={onChange}
          activeCount={activeCount}
          totalProducts={totalProducts}
        />
      </Box>
    </Box>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   Filter button base – shared styling for filter dropdown triggers
   ═════════════════════════════════════════════════════════════════════ */
function FilterButton({
  label,
  active,
  onClick,
  anchorRef,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  anchorRef?: React.Ref<HTMLButtonElement>;
}) {
  return (
    <Button
      ref={anchorRef}
      variant="outlined"
      size="small"
      onClick={onClick}
      endIcon={<KeyboardArrowDownIcon />}
      sx={{
        borderColor: active ? 'primary.main' : '#bdbdbd',
        color: active ? 'primary.main' : 'text.primary',
        fontWeight: active ? 600 : 400,
        textTransform: 'none',
        borderRadius: '20px',
        px: 2,
        py: 0.6,
        fontSize: '0.8125rem',
        whiteSpace: 'nowrap',
        '&:hover': {
          borderColor: active ? 'primary.dark' : '#9e9e9e',
          backgroundColor: active ? 'rgba(211,47,47,0.04)' : 'rgba(0,0,0,0.04)',
        },
      }}
    >
      {label}
    </Button>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   Brands filter – searchable checkbox list
   ═════════════════════════════════════════════════════════════════════ */
function BrandsFilter({
  value,
  onChange,
  label,
}: {
  value?: string;
  onChange: (brand_id?: string) => void;
  label: string;
}) {
  const { t } = useTranslation('categories');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [search, setSearch] = useState('');
  const btnRef = useRef<HTMLButtonElement>(null);

  const { data: brandsData } = useGetBrandsQuery({ limit: 1000 });
  const brands: Brand[] = brandsData?.data ?? [];

  const filtered = useMemo(
    () =>
      search
        ? brands.filter((b) => b.name.toLowerCase().includes(search.toLowerCase()))
        : brands,
    [brands, search],
  );

  const handleToggle = (brandId: string) => {
    onChange(value === brandId ? undefined : brandId);
  };

  return (
    <>
      <FilterButton
        label={label}
        active={!!value}
        onClick={() => setAnchorEl(btnRef.current)}
        anchorRef={btnRef}
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
          setSearch('');
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { sx: { width: 300, maxHeight: 400, mt: 0.5 } } }}
      >
        <Box sx={{ p: 1.5, pb: 1 }}>
          <TextField
            size="small"
            fullWidth
            placeholder={label}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
        <Box sx={{ maxHeight: 280, overflowY: 'auto', px: 1.5, pb: 1 }}>
          {filtered.slice(0, 50).map((brand) => (
            <FormControlLabel
              key={brand._id}
              control={
                <Checkbox
                  size="small"
                  checked={value === brand._id}
                  onChange={() => handleToggle(brand._id)}
                />
              }
              label={
                <Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>
                  {brand.name}
                  {brand.product_count != null && (
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                      sx={{ ml: 0.5, fontSize: '0.75rem' }}
                    >
                      ({brand.product_count})
                    </Typography>
                  )}
                </Typography>
              }
              sx={{ display: 'flex', mx: 0, py: 0.2 }}
            />
          ))}
          {filtered.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
              {search ? t('filters.no_results_for', { search }) : t('filters.no_brands')}
            </Typography>
          )}
        </Box>
      </Popover>
    </>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   Price filter – range slider + min/max inputs
   ═════════════════════════════════════════════════════════════════════ */
function PriceFilter({
  minPrice,
  maxPrice,
  onChange,
  label,
}: {
  minPrice?: number;
  maxPrice?: number;
  onChange: (min?: number, max?: number) => void;
  label: string;
}) {
  const { t } = useTranslation('categories');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [range, setRange] = useState<number[]>([minPrice ?? 0, maxPrice ?? PRICE_MAX]);

  // Sync external changes
  useEffect(() => {
    setRange([minPrice ?? 0, maxPrice ?? PRICE_MAX]);
  }, [minPrice, maxPrice]);

  const handleCommit = () => {
    const min = range[0] > 0 ? range[0] : undefined;
    const max = range[1] < PRICE_MAX ? range[1] : undefined;
    onChange(min, max);
  };

  const active = !!(minPrice || maxPrice);

  return (
    <>
      <FilterButton
        label={label}
        active={active}
        onClick={() => setAnchorEl(btnRef.current)}
        anchorRef={btnRef}
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
          handleCommit();
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { sx: { width: 320, p: 2, mt: 0.5 } } }}
      >
        <Typography variant="body2" fontWeight={600} sx={{ mb: 1.5 }}>
          {t('filters.price_range')}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
          <TextField
            size="small"
            label={t('filters.price_from')}
            type="number"
            value={range[0] || ''}
            onChange={(e) => setRange([Number(e.target.value) || 0, range[1]])}
            slotProps={{ input: { startAdornment: <InputAdornment position="start">CHF</InputAdornment> } }}
            sx={{ flex: 1 }}
          />
          <TextField
            size="small"
            label={t('filters.price_to')}
            type="number"
            value={range[1] >= PRICE_MAX ? '' : range[1]}
            onChange={(e) => setRange([range[0], Number(e.target.value) || PRICE_MAX])}
            slotProps={{ input: { startAdornment: <InputAdornment position="start">CHF</InputAdornment> } }}
            sx={{ flex: 1 }}
          />
        </Box>

        <Slider
          value={range}
          onChange={(_, v) => setRange(v as number[])}
          onChangeCommitted={() => handleCommit()}
          min={0}
          max={PRICE_MAX}
          step={PRICE_STEP}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `CHF ${v}`}
          sx={{ mx: 1 }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
          <Typography variant="caption" color="text.secondary">
            CHF 0
          </Typography>
          <Typography variant="caption" color="text.secondary">
            CHF {PRICE_MAX.toLocaleString('de-CH')}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              handleCommit();
              setAnchorEl(null);
            }}
          >
            {t('filters.apply')}
          </Button>
        </Box>
      </Popover>
    </>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   Offers filter – checkboxes for on_sale, sustainable
   ═════════════════════════════════════════════════════════════════════ */
function OffersFilter({
  onSale,
  sustainable,
  onChange,
  label,
}: {
  onSale?: boolean;
  sustainable?: boolean;
  onChange: (onSale?: boolean, sustainable?: boolean) => void;
  label: string;
}) {
  const { t } = useTranslation('categories');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const active = !!onSale || !!sustainable;

  return (
    <>
      <FilterButton
        label={label}
        active={active}
        onClick={() => setAnchorEl(btnRef.current)}
        anchorRef={btnRef}
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { sx: { width: 280, p: 2, mt: 0.5 } } }}
      >
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={!!onSale}
                onChange={(e) => onChange(e.target.checked || undefined, sustainable)}
              />
            }
            label={
              <Typography variant="body2">{t('filters.promotions')}</Typography>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={!!sustainable}
                onChange={(e) => onChange(onSale, e.target.checked || undefined)}
              />
            }
            label={
              <Typography variant="body2">{t('filters.sustainable')}</Typography>
            }
          />
        </FormGroup>
      </Popover>
    </>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   Fast delivery filter – toggle switch
   ═════════════════════════════════════════════════════════════════════ */
function FastDeliveryFilter({
  value,
  onChange,
  label,
}: {
  value: boolean;
  onChange: (enabled: boolean) => void;
  label: string;
}) {
  const { t } = useTranslation('categories');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <FilterButton
        label={label}
        active={value}
        onClick={() => setAnchorEl(btnRef.current)}
        anchorRef={btnRef}
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{ paper: { sx: { width: 320, p: 2, mt: 0.5 } } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body2" fontWeight={600}>
              {label}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {t('filters.fast_delivery_desc')}
            </Typography>
          </Box>
          <Switch
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            color="primary"
          />
        </Box>
      </Popover>
    </>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   More Filters modal – combines all filters
   ═════════════════════════════════════════════════════════════════════ */
function MoreFiltersButton({
  filters,
  onChange,
  activeCount,
  totalProducts,
}: {
  filters: ProductFilterValues;
  onChange: (filters: ProductFilterValues) => void;
  activeCount: number;
  totalProducts?: number;
}) {
  const { t } = useTranslation('categories');
  const [open, setOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<ProductFilterValues>(filters);
  const [brandSearch, setBrandSearch] = useState('');
  const [priceRange, setPriceRange] = useState<number[]>([
    filters.min_price ?? 0,
    filters.max_price ?? PRICE_MAX,
  ]);

  const { data: brandsData } = useGetBrandsQuery({ limit: 1000 });
  const brands: Brand[] = brandsData?.data ?? [];

  const filteredBrands = useMemo(
    () =>
      brandSearch
        ? brands.filter((b) => b.name.toLowerCase().includes(brandSearch.toLowerCase()))
        : brands,
    [brands, brandSearch],
  );

  const handleOpen = () => {
    setLocalFilters(filters);
    setPriceRange([filters.min_price ?? 0, filters.max_price ?? PRICE_MAX]);
    setBrandSearch('');
    setOpen(true);
  };

  const handleApply = () => {
    const min = priceRange[0] > 0 ? priceRange[0] : undefined;
    const max = priceRange[1] < PRICE_MAX ? priceRange[1] : undefined;
    onChange({ ...localFilters, min_price: min, max_price: max });
    setOpen(false);
  };

  const handleReset = () => {
    setLocalFilters({});
    setPriceRange([0, PRICE_MAX]);
  };

  return (
    <>
      <Badge
        badgeContent={activeCount}
        color="primary"
        invisible={activeCount === 0}
        sx={{ '& .MuiBadge-badge': { fontSize: '0.7rem', height: 18, minWidth: 18 } }}
      >
        <Button
          variant="outlined"
          size="small"
          onClick={handleOpen}
          startIcon={<TuneIcon />}
          sx={{
            borderColor: activeCount > 0 ? 'primary.main' : '#bdbdbd',
            color: activeCount > 0 ? 'primary.main' : 'text.primary',
            fontWeight: activeCount > 0 ? 600 : 400,
            textTransform: 'none',
            borderRadius: '20px',
            px: 2,
            py: 0.6,
            fontSize: '0.8125rem',
            whiteSpace: 'nowrap',
          }}
        >
          {t('filters.more_filters')}
        </Button>
      </Badge>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight={700}>
            {t('filters.all_filters')}
          </Typography>
          <IconButton onClick={() => setOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ maxHeight: '60vh' }}>
          {/* ── Brands ── */}
          <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
            {t('filters.brands')}
          </Typography>
          <TextField
            size="small"
            fullWidth
            placeholder={t('filters.search_brand')}
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ mb: 1 }}
          />
          <Box sx={{ maxHeight: 180, overflowY: 'auto', mb: 2 }}>
            <FormGroup>
              {filteredBrands.slice(0, 50).map((brand) => (
                <FormControlLabel
                  key={brand._id}
                  control={
                    <Checkbox
                      size="small"
                      checked={localFilters.brand_id === brand._id}
                      onChange={() =>
                        setLocalFilters((f) => ({
                          ...f,
                          brand_id: f.brand_id === brand._id ? undefined : brand._id,
                        }))
                      }
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>
                      {brand.name}
                      {brand.product_count != null && (
                        <Typography
                          component="span"
                          color="text.secondary"
                          sx={{ ml: 0.5, fontSize: '0.75rem' }}
                        >
                          ({brand.product_count})
                        </Typography>
                      )}
                    </Typography>
                  }
                  sx={{ mx: 0, py: 0.1 }}
                />
              ))}
            </FormGroup>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* ── Price ── */}
          <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
            {t('filters.price')}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            {t('filters.price_range')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, mb: 1.5 }}>
            <TextField
              size="small"
              label={t('filters.price_from')}
              type="number"
              value={priceRange[0] || ''}
              onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
              slotProps={{
                input: { startAdornment: <InputAdornment position="start">CHF</InputAdornment> },
              }}
              sx={{ flex: 1 }}
            />
            <TextField
              size="small"
              label={t('filters.price_to')}
              type="number"
              value={priceRange[1] >= PRICE_MAX ? '' : priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || PRICE_MAX])}
              slotProps={{
                input: { startAdornment: <InputAdornment position="start">CHF</InputAdornment> },
              }}
              sx={{ flex: 1 }}
            />
          </Box>
          <Slider
            value={priceRange}
            onChange={(_, v) => setPriceRange(v as number[])}
            min={0}
            max={PRICE_MAX}
            step={PRICE_STEP}
            valueLabelDisplay="auto"
            valueLabelFormat={(v) => `CHF ${v}`}
            sx={{ mx: 1, mb: 2 }}
          />

          <Divider sx={{ my: 2 }} />

          {/* ── Offers ── */}
          <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
            {t('filters.offers')}
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={!!localFilters.on_sale}
                  onChange={(e) =>
                    setLocalFilters((f) => ({ ...f, on_sale: e.target.checked || undefined }))
                  }
                />
              }
              label={<Typography variant="body2">{t('filters.promotions')}</Typography>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={!!localFilters.sustainable}
                  onChange={(e) =>
                    setLocalFilters((f) => ({ ...f, sustainable: e.target.checked || undefined }))
                  }
                />
              }
              label={<Typography variant="body2">{t('filters.sustainable')}</Typography>}
            />
          </FormGroup>

          <Divider sx={{ my: 2 }} />

          {/* ── Fast Delivery ── */}
          <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
            {t('filters.fast_delivery')}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              {t('filters.fast_delivery_desc')}
            </Typography>
            <Switch
              checked={!!localFilters.speed}
              onChange={(e) =>
                setLocalFilters((f) => ({ ...f, speed: e.target.checked ? 'fast' : undefined }))
              }
              color="primary"
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'space-between', px: 3, py: 2 }}>
          <Button onClick={handleReset} color="inherit" sx={{ textTransform: 'none' }}>
            {t('filters.reset')}
          </Button>
          <Button variant="contained" onClick={handleApply} sx={{ textTransform: 'none', minWidth: 140 }}>
            {totalProducts != null
              ? t('filters.show_results', { count: totalProducts })
              : t('filters.apply')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
