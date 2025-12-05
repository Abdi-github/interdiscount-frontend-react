import { Breadcrumbs, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LocaleLink from '@/shared/components/LocaleLink';
import { useTranslation } from 'react-i18next';
import type { Category } from '../categories.types';
import { localizeField } from '../../../shared/utils/localizeField';

interface CategoryBreadcrumbProps {
  category: Category;
  ancestors?: Category[];
}

export function CategoryBreadcrumb({ category, ancestors = [] }: CategoryBreadcrumbProps) {
  const { i18n } = useTranslation();
  const locale = (i18n.language?.slice(0, 2) || 'de') as 'de' | 'en' | 'fr' | 'it';
  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 2 }}>
      <Link component={LocaleLink} to="/" color="inherit" underline="hover">
        Startseite
      </Link>
      {ancestors.map((a) => (
        <Link
          key={a._id}
          component={LocaleLink}
          to={`/categories/${a.slug}`}
          color="inherit"
          underline="hover"
        >
          {localizeField(a.name, locale)}
        </Link>
      ))}
      <Typography color="text.primary">{localizeField(category.name, locale)}</Typography>
    </Breadcrumbs>
  );
}
