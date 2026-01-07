export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidSwissPhone(phone: string): boolean {
  return /^(\+41|0041|0)[0-9]{9,10}$/.test(phone.replace(/\s/g, ''));
}

export function isValidPostalCode(code: string): boolean {
  return /^\d{4}$/.test(code);
}
