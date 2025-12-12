import { Box, Typography, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { OpeningHours } from '../stores.types';

type DayKey = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
const DAYS: DayKey[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

interface StoreHoursProps {
  hours: OpeningHours;
}

export function StoreHours({ hours }: StoreHoursProps) {
  const { t } = useTranslation('stores');
  const today = DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];

  return (
    <Box>
      {DAYS.map((day) => {
        const h = hours[day];
        const isToday = day === today;
        return (
          <Box
            key={day}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              py: 0.5,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: isToday ? 700 : 400, width: 100 }}>
                {t(`days.${day}`)}
              </Typography>
              {isToday && <Chip label={t('today')} size="small" color="primary" sx={{ height: 16 }} />}
            </Box>
            <Typography variant="body2" sx={{ fontWeight: isToday ? 700 : 400 }}>
              {h === null ? t('closed') : h ? `${h.open} – ${h.close}` : '–'}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
