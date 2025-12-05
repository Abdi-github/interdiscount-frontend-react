import { useState } from 'react';
import React from 'react';
import {
  Box, Typography, Slider, FormGroup, FormControlLabel, Checkbox,
  Divider, Button, Accordion, AccordionSummary, AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { formatPrice } from '@/shared/utils/formatters';
import { useTranslation } from 'react-i18next';

export interface ActiveFilters {
  min_price?: number;
  max_price?: number;
  availability?: string;
  in_store?: boolean;
}

interface FilterPanelProps {
  filters: ActiveFilters;
  onChange: (filters: ActiveFilters) => void;
}

const PRICE_MAX = 5000;

export function FilterPanel({ filters, onChange }: FilterPanelProps) {
  const { t } = useTranslation('categories');
  const [priceRange, setPriceRange] = useState<number[]>([
    filters.min_price ?? 0,
    filters.max_price ?? PRICE_MAX,
  ]);

  const handlePriceCommit = (_: Event | React.SyntheticEvent, val: number | number[]) => {
    const [min, max] = val as number[];
    onChange({ ...filters, min_price: min > 0 ? min : undefined, max_price: max < PRICE_MAX ? max : undefined });
  };

  const handleAvailability = (val: string, checked: boolean) => {
    onChange({ ...filters, availability: checked ? val : undefined });
  };

  const handleReset = () => {
    setPriceRange([0, PRICE_MAX]);
    onChange({});
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="subtitle2" fontWeight={700}>{t('filters.title')}</Typography>
        <Button size="small" onClick={handleReset} sx={{ fontSize: '0.75rem' }}>
          {t('filters.reset')}
        </Button>
      </Box>
      <Divider sx={{ mb: 1 }} />

      <Accordion defaultExpanded disableGutters elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
          <Typography variant="body2" fontWeight={600}>{t('filters.price')}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 1 }}>
          <Slider
            value={priceRange}
            onChange={(_, v) => setPriceRange(v as number[])}
            onChangeCommitted={handlePriceCommit}
            min={0}
            max={PRICE_MAX}
            step={50}
            valueLabelDisplay="auto"
            valueLabelFormat={(v) => formatPrice(v)}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption">{formatPrice(priceRange[0])}</Typography>
            <Typography variant="caption">{formatPrice(priceRange[1])}</Typography>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded disableGutters elevation={0}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
          <Typography variant="body2" fontWeight={600}>{t('filters.availability')}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0 }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={filters.availability === 'AVAILABLE'}
                  onChange={(e) => handleAvailability('AVAILABLE', e.target.checked)}
                />
              }
              label={<Typography variant="body2">{t('filters.in_stock')}</Typography>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={filters.in_store === true}
                  onChange={(e) => onChange({ ...filters, in_store: e.target.checked || undefined })}
                />
              }
              label={<Typography variant="body2">Click &amp; Collect</Typography>}
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
