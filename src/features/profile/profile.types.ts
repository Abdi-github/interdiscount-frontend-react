export interface Address {
  _id: string;
  label: string;
  first_name: string;
  last_name: string;
  street: string;
  street_number: string;
  postal_code: string;
  city: string;
  canton: string;
  country: string;
  phone?: string;
  is_default: boolean;
}

export interface UpdateProfilePayload {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  preferred_language?: 'de' | 'en' | 'fr' | 'it';
}

export interface ChangePasswordPayload {
  current_password: string;
  new_password: string;
}

export interface AddressPayload {
  label: string;
  first_name: string;
  last_name: string;
  street: string;
  street_number: string;
  postal_code: string;
  city: string;
  canton: string;
  country: string;
  phone?: string;
  is_default?: boolean;
}
