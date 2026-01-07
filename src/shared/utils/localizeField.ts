/**
 * Utility to safely extract a localized string from either a plain string
 * or a multilingual object returned by the API (e.g. { en, fr, de, it }).
 */

export type MultilingualText = {
  en: string;
  fr: string;
  de: string;
  it: string;
};

export type LocalizableField = string | MultilingualText | null | undefined;

type Locale = 'de' | 'en' | 'fr' | 'it';

/**
 * Returns the localized string for the given locale.
 * Falls back to 'de', then 'en', then any available value.
 */
export function localizeField(field: LocalizableField, locale: Locale = 'de'): string {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return (
    field[locale] ||
    field.de ||
    field.en ||
    (Object.values(field).find(Boolean) as string) ||
    ''
  );
}
