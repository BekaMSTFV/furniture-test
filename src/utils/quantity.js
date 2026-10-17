export const QUANTITY_MIN = 1;
export const QUANTITY_MAX = 10;

export function clampQuantity(value, min = QUANTITY_MIN, max = QUANTITY_MAX) {
  const number = Math.trunc(Number(value));

  if (!Number.isFinite(number)) {
    return min;
  }

  return Math.min(max, Math.max(min, number));
}
