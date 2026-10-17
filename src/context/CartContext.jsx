import { useEffect, useMemo, useState } from "react";
import {
  addToCart,
  clearCart,
  getCartItems,
  removeFromCart,
  setCartQuantity,
  subscribeCart,
} from "../data/cart.js";
import { CartContext } from "./cart-store.js";

export function CartProvider({ children }) {
  const [items, setItems] = useState(getCartItems);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => subscribeCart(setItems), []);

  const value = useMemo(
    () => ({
      items,
      isDrawerOpen,
      openDrawer() {
        setIsDrawerOpen(true);
      },
      closeDrawer() {
        setIsDrawerOpen(false);
      },
      addItem(product, quantity = 1) {
        addToCart(product, quantity);
      },
      removeItem(id) {
        removeFromCart(id);
      },
      updateQuantity(id, quantity) {
        setCartQuantity(id, quantity);
      },
      clear() {
        clearCart();
      },
      contains(id) {
        return items.some((item) => item.id === id);
      },
    }),
    [items, isDrawerOpen],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
