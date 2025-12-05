import { Box, FormControl, InputLabel, Select, MenuItem, type SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';

const SORT_KEYS = ['popular', 'newest', 'price_asc', 'price_desc', 'rating'] as const;

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
  total?: number;
}

export function SortSelect({ value, onChange, total }: SortSelectProps) {
  const { t } = useTranslation('categories');
  const handleChange = (e: SelectChangeEvent) => onChange(e.target.value);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      {total !== undefined && (
        <span style={{ fontSize: '0.875rem', color: '#616161' }}>
          {t('products_count', { count: total })}
        </span>
      )}
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>{t('filters.sort_label')}</InputLabel>
        <Select value={value || 'popular'} label={t('filters.sort_label')} onChange={handleChange}>
          {SORT_KEYS.map((key) => (
            <MenuItem key={key} value={key}>{t(`sort.${key}`)}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
