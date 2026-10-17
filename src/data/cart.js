import { parsePrice } from "../utils/price.js";
import { clampQuantity } from "../utils/quantity.js";

const STORAGE_KEY = "furniro-cart";

function isStoredItem(item) {
  return Boolean(item)
    && typeof item === "object"
    && typeof item.id === "string"
    && item.id
    && typeof item.name === "string"
    && typeof item.price === "string";
}

function normalizeItem(item) {
  return {
    id: item.id,
    slug: typeof item.slug === "string" && item.slug ? item.slug : item.id,
    name: item.name,
    price: item.price,
    oldPrice: typeof item.oldPrice === "string" ? item.oldPrice : null,
    image: typeof item.image === "string" ? item.image : "",
    quantity: clampQuantity(item.quantity),
  };
}

function readStoredItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isStoredItem).map(normalizeItem);
  } catch {
    return [];
  }
}

function writeStoredItems(next) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    return undefined;
  }
}

let items = readStoredItems();
const listeners = new Set();

function snapshot() {
  return items.map((item) => ({ ...item }));
}

function publish() {
  const next = snapshot();
  writeStoredItems(next);
  listeners.forEach((listener) => listener(next));
}

export function getCartItems() {
  return snapshot();
}

export function subscribeCart(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function addToCart(product, quantity = 1) {
  if (!product || items.some((item) => item.id === product.id)) {
    return;
  }

  items = [
    ...items,
    {
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      oldPrice: product.oldPrice ?? null,
      image: product.image,
      quantity: clampQuantity(quantity),
    },
  ];
  publish();
}

export function removeFromCart(id) {
  const next = items.filter((item) => item.id !== id);

  if (next.length === items.length) {
    return;
  }

  items = next;
  publish();
}

export function setCartQuantity(id, quantity) {
  const nextQuantity = clampQuantity(quantity);
  let changed = false;

  items = items.map((item) => {
    if (item.id !== id || item.quantity === nextQuantity) {
      return item;
    }

    changed = true;
    return { ...item, quantity: nextQuantity };
  });

  if (changed) {
    publish();
  }
}

export function clearCart() {
  if (items.length === 0) {
    return;
  }

  items = [];
  publish();
}

export function itemAmount(item) {
  return parsePrice(item.price) * item.quantity;
}

export function cartAmount(list = items) {
  return list.reduce((sum, item) => sum + itemAmount(item), 0);
}
