import LocaleLink from '@/shared/components/LocaleLink';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import { useTranslation } from 'react-i18next';
import { useGetCategoriesQuery } from '@/features/categories/categories.api';
import type { Category } from '@/features/categories/categories.types';
import { localizeField } from '@/shared/utils/localizeField';

const EMOJI_MAP: [string, string][] = [
  ['unterhaltung', '📺'], ['consumer', '📺'], ['électronique', '📺'],
  ['mobil', '📱'], ['smartphone', '📱'], ['phone', '📱'],
  ['computer', '💻'], ['laptop', '💻'], ['gaming', '🎮'],
  ['haushalt', '🏠'], ['home', '🏠'], ['heim', '🏠'],
  ['foto', '📷'], ['kamera', '📷'], ['photo', '📷'],
  ['audio', '🎧'], ['musik', '🎵'],
  ['sport', '⚽'], ['freizeit', '🏋️'],
  ['beauty', '💄'], ['gesundheit', '💊'], ['baby', '🍼'],
  ['wearable', '⌚'], ['smartwatch', '⌚'], ['tablet', '📲'],
];

function getEmoji(name: string): string {
  const lower = name.toLowerCase();
  for (const [key, emoji] of EMOJI_MAP) {
    if (lower.includes(key)) return emoji;
  }
  return '🛒';
}

export default function CategoryGrid({ inline = false }: { inline?: boolean }) {
  const { t, i18n } = useTranslation('home');
  const locale = (i18n.language?.slice(0, 2) || 'de') as 'de' | 'en' | 'fr' | 'it';
  const { data: allCategories = [], isLoading } = useGetCategoriesQuery();
  const rootCategories = (allCategories as Category[]).filter((c) => !c.parent_id).slice(0, 8);

  const inner = (
    <Box sx={{ py: inline ? 2 : 4 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        {t('sections.categories')}
      </Typography>
      {isLoading ? (
        <Grid container spacing={2}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Grid item key={i} xs={6} sm={4} md={3} lg={1.5}>
              <Skeleton variant="rounded" height={110} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {rootCategories.map((cat) => {
            const label = localizeField(cat.name, locale);
            return (
              <Grid item key={cat._id} xs={6} sm={4} md={3} lg={1.5}>
                <Paper
                  component={LocaleLink}
                  to={`/categories/${cat.slug}`}
                  elevation={0}
                  variant="outlined"
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textDecoration: 'none',
                    color: 'text.primary',
                    borderRadius: 2,
                    transition: 'all 0.2s',
                    '&:hover': { borderColor: 'primary.main', bgcolor: '#fff5f5', color: 'primary.main' },
                  }}
                >
                  <Typography variant="h4" component="span" sx={{ mb: 1 }}>
                    {getEmoji(label)}
                  </Typography>
                  <Typography variant="body2" fontWeight={600} textAlign="center">
                    {label}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );

  return inline ? inner : <Container maxWidth="lg">{inner}</Container>;
}
