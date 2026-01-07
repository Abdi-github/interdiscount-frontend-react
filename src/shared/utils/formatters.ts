/**
 * Format a price in Interdiscount style: "799.-" for whole numbers, "1'299.95" for decimals
 */
export function formatPriceShort(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  const intPart = Math.floor(rounded);
  const decPart = Math.round((rounded - intPart) * 100);
  if (decPart === 0) {
    return `${intPart.toLocaleString('de-CH')}.–`;
  }
  return amount.toLocaleString('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * Format a price in Swiss format: CHF 1'299.00
 */
export function formatPrice(amount: number, currency = 'CHF'): string {
  const formatted = amount.toLocaleString('de-CH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${currency} ${formatted}`;
}

/**
 * Calculate discount percentage
 */
export function formatDiscount(original: number, current: number): number {
  if (original <= 0 || current >= original) return 0;
  return Math.round(((original - current) / original) * 100);
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Format a date for display (e.g. 12. März 2026)
 */
export function formatDate(dateStr: string, locale = 'de-CH'): string {
  return new Date(dateStr).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Format a short date (12.03.2026)
 */
export function formatShortDate(dateStr: string, locale = 'de-CH'): string {
  return new Date(dateStr).toLocaleDateString(locale);
}

/**
 * Slug from text
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .trim();
}

/**
 * Get image URL with fallback
 */
export function getImageUrl(url?: string, fallback = '/placeholder.png'): string {
  if (!url) return fallback;
  if (url.startsWith('http')) return url;
  return `${import.meta.env.VITE_API_URL?.replace('/api/v1', '') || ''}${url}`;
}
