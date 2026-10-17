export function parsePrice(value) {
  const digits = String(value ?? "").replace(/[^\d]/g, "");
  return digits ? Number(digits) : 0;
}

export function formatPrice(amount) {
  const formatted = Math.max(0, Math.round(amount))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `Rp ${formatted}`;
}
