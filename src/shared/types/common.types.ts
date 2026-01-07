export type AppLocale = 'de' | 'en' | 'fr' | 'it';

export interface SelectOption<T = string> {
  value: T;
  label: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface SortOption {
  value: string;
  label: string;
}
