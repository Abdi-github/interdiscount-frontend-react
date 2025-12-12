export type DayHours = { open: string; close: string } | null;
export type OpeningHours = Record<string, DayHours>;

export interface Store {
  _id: string;
  name: string;
  slug: string;
  store_id: string;
  street: string;
  street_number: string;
  postal_code: string;
  city: string;
  city_id: string;
  canton: string;
  canton_id: string;
  phone: string;
  email: string;
  latitude: number;
  longitude: number;
  format: 'standard' | 'xxl' | 'compact';
  opening_hours: OpeningHours;
  is_active: boolean;
}
