export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isEmail(value) {
  return EMAIL_PATTERN.test(String(value ?? "").trim());
}
