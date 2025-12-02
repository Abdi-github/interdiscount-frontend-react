import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import LocaleLink from '@/shared/components/LocaleLink';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useGetCategoriesQuery, useGetCategoryProductCountsQuery } from '@/features/categories/categories.api';
import type { Category } from '@/features/categories/categories.types';
import { localizeField } from '@/shared/utils/localizeField';
import { useTranslation } from 'react-i18next';

const TOP_NAV = [
  { key: 'sortiment', href: '/', hasMega: true },
  { key: 'aktionen', href: '/aktionen', badge: null },
  { key: 'service', href: '/service' },
  { key: 'support', href: '/support' },
  { key: 'unternehmen', href: '/unternehmen' },
];

export default function CategoryNav() {
  const location = useLocation();
  const { t, i18n } = useTranslation('common');
  const locale = (i18n.language?.slice(0, 2) || 'de') as 'de' | 'en' | 'fr' | 'it';
  const [megaAnchor, setMegaAnchor] = useState<HTMLElement | null>(null);
  const { data: allCategories = [] } = useGetCategoriesQuery();
  const { data: productCounts } = useGetCategoryProductCountsQuery();
  const rootCategories = (allCategories as Category[])
    .filter((c) => !c.parent_id)
    .filter((c) => !productCounts || (productCounts[c._id] ?? 0) > 0);

  return (
    <Box
      sx={{
        bgcolor: 'white',
        borderBottom: '1px solid #e0e0e0',
        display: { xs: 'none', md: 'block' },
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
          {TOP_NAV.map((item) => {
            const isActive = location.pathname === item.href || (item.href === '/' && location.pathname === '/');
            return (
              <Box key={item.key} sx={{ position: 'relative' }}>
                <Button
                  component={item.hasMega ? 'button' : LocaleLink}
                  to={!item.hasMega ? item.href : undefined}
                  onClick={item.hasMega ? (e: React.MouseEvent<HTMLButtonElement>) => setMegaAnchor(e.currentTarget) : undefined}
                  size="small"
                  sx={{
                    color: isActive ? 'primary.main' : 'text.primary',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.875rem',
                    px: 2,
                    py: 1.5,
                    borderRadius: 0,
                    borderBottom: isActive ? '2px solid' : '2px solid transparent',
                    borderBottomColor: isActive ? 'primary.main' : 'transparent',
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: 'transparent',
                      borderBottomColor: 'primary.main',
                    },
                    gap: 0.75,
                  }}
                >
                  {t(`nav.${item.key}`)}
                  {item.key === 'aktionen' && (
                    <Chip
                      label="9+"
                      size="small"
                      color="error"
                      sx={{ height: 18, fontSize: '0.65rem', fontWeight: 700, px: 0.25 }}
                    />
                  )}
                </Button>
              </Box>
            );
          })}
        </Box>
      </Container>

      {/* Sortiment Mega-Menu */}
      <Popover
        open={Boolean(megaAnchor)}
        anchorEl={megaAnchor}
        onClose={() => setMegaAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: {
            width: 220,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            border: '1px solid #e0e0e0',
            mt: 0.5,
          },
        }}
      >
        <Box sx={{ p: 1 }}>
          <Typography variant="caption" sx={{ px: 1.5, py: 0.5, display: 'block', color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {t('nav.product_categories')}
          </Typography>
          <List dense disablePadding>
            {rootCategories.map((cat) => (
              <ListItemButton
                key={cat._id}
                component={LocaleLink}
                to={`/categories/${cat.slug}`}
                onClick={() => setMegaAnchor(null)}
                sx={{ borderRadius: 1, py: 0.5, px: 1.5 }}
              >
                <ListItemText
                  primary={localizeField(cat.name, locale)}
                  primaryTypographyProps={{ fontSize: '0.875rem' }}
                />
              </ListItemButton>
            ))}
            <ListItemButton
              component={LocaleLink}
              to="/categories"
              onClick={() => setMegaAnchor(null)}
              sx={{ borderRadius: 1, py: 0.5, px: 1.5 }}
            >
              <ListItemText
                primary={`${t('nav.all_categories')} →`}
                primaryTypographyProps={{ fontSize: '0.875rem', color: 'primary.main', fontWeight: 600 }}
              />
            </ListItemButton>
          </List>
        </Box>
      </Popover>
    </Box>
  );
}

