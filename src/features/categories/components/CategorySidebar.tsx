import { Box, List, ListItemButton, ListItemText, Divider, Skeleton, Typography } from '@mui/material';
import LocaleLink from '@/shared/components/LocaleLink';
import { useTranslation } from 'react-i18next';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import type { Category } from '../categories.types';
import { useGetCategoriesQuery, useGetCategoryProductCountsQuery } from '../categories.api';
import { localizeField } from '../../../shared/utils/localizeField';
import type { LocalizableField } from '../../../shared/utils/localizeField';

interface ActiveCategoryInfo {
  _id: string;
  name: LocalizableField;
  slug: string;
  parent_id?: string | null;
}

interface CategorySidebarProps {
  /** Category-page context: shows back-link + current bold + subcategories.
   *  Omit for homepage mode: shows all root categories. */
  activeCategory?: ActiveCategoryInfo;
}

export function CategorySidebar({ activeCategory }: CategorySidebarProps) {
  const { t, i18n } = useTranslation('categories');
  const locale = (i18n.language?.slice(0, 2) || 'de') as 'de' | 'en' | 'fr' | 'it';
  const { data: allCategories = [], isLoading } = useGetCategoriesQuery();
  const { data: productCounts } = useGetCategoryProductCountsQuery();

  if (isLoading) {
    return (
      <Box>
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} height={32} sx={{ mb: 0.25 }} />
        ))}
      </Box>
    );
  }

  /* ── Homepage mode: all root-level categories + extra links ── */
  if (!activeCategory) {
    const rootCats = (allCategories as Category[])
      .filter((c) => !c.parent_id)
      .filter((c) => !productCounts || (productCounts[c._id] ?? 0) > 0);
    return (
      <Box
        component="nav"
        aria-label="Category navigation"
        sx={{ borderRight: { md: '1px solid #eee' }, pr: { md: 1 } }}
      >
        <List dense disablePadding>
          {rootCats.map((cat) => (
            <ListItemButton
              key={cat._id}
              component={LocaleLink}
              to={`/categories/${cat.slug}`}
              sx={{
                py: 0.75,
                px: 1.5,
                borderRadius: 0,
                borderLeft: '3px solid transparent',
                '&:hover': { color: 'primary.main', borderLeftColor: 'primary.main', bgcolor: '#fff5f5' },
              }}
            >
              <ListItemText
                primary={localizeField(cat.name, locale)}
                primaryTypographyProps={{ fontSize: '0.88rem', fontWeight: 500 }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
    );
  }

  /* ── Category-page mode: back-link + current (bold) + children ── */
  const parentCat = activeCategory.parent_id
    ? (allCategories as Category[]).find((c) => c._id === activeCategory.parent_id)
    : null;
  const childCats = (allCategories as Category[]).filter(
    (c) => c.parent_id === activeCategory._id
  );

  return (
    <Box component="nav" aria-label="Category navigation" sx={{ borderRight: { md: '1px solid #eee' }, pr: { md: 1 } }}>
      {/* Back link */}
      <ListItemButton
        component={LocaleLink}
        to={parentCat ? `/categories/${parentCat.slug}` : '/'}
        sx={{ py: 0.75, px: 1.5, color: 'text.secondary', borderRadius: 0 }}
      >
        <KeyboardArrowLeftIcon fontSize="small" sx={{ mr: 0.5, flexShrink: 0 }} />
        <ListItemText
          primary={parentCat ? localizeField(parentCat.name, locale) : t('all_products')}
          primaryTypographyProps={{ fontSize: '0.88rem' }}
        />
      </ListItemButton>

      {/* Current category — bold with left border */}
      <Box
        sx={{
          px: 1.5,
          py: 0.75,
          fontWeight: 700,
          fontSize: '0.9rem',
          borderLeft: '3px solid',
          borderLeftColor: 'text.primary',
        }}
      >
        {localizeField(activeCategory.name, locale)}
      </Box>

      {/* Child categories */}
      {childCats.length > 0 && (
        <List dense disablePadding>
          {childCats.map((child) => (
            <ListItemButton
              key={child._id}
              component={LocaleLink}
              to={`/categories/${child.slug}`}
              sx={{
                py: 0.75,
                px: 1.5,
                borderRadius: 0,
                borderLeft: '3px solid transparent',
                '&:hover': { color: 'primary.main', borderLeftColor: 'primary.main', bgcolor: '#fff5f5' },
              }}
            >
              <ListItemText
                primary={localizeField(child.name, locale)}
                primaryTypographyProps={{ fontSize: '0.88rem', color: 'text.secondary' }}
              />
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  );
}
