import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { cartAmount } from "../../../data/cart.js";
import { useCart } from "../../../context/useCart.js";
import { formatPrice } from "../../../utils/price.js";
import Icon from "../../ui/Icon/Icon.jsx";
import ScrollLink from "../../ui/ScrollLink/ScrollLink.jsx";
import "./CartSidebar.scss";

export default function CartSidebar() {
  const { items, isDrawerOpen, closeDrawer, removeItem, clear } = useCart();
  const location = useLocation();
  const closeRef = useRef(closeDrawer);
  const subtotal = formatPrice(cartAmount(items));

  closeRef.current = closeDrawer;

  useEffect(() => {
    closeRef.current();
  }, [location.key]);

  useEffect(() => {
    if (!isDrawerOpen) {
      return undefined;
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [isDrawerOpen]);

  return (
    <>
      <button
        className={`cart-overlay${isDrawerOpen ? " cart-overlay--open" : ""}`}
        type="button"
        aria-label="Close cart"
        tabIndex={isDrawerOpen ? 0 : -1}
        disabled={!isDrawerOpen}
        onClick={closeDrawer}
      />
      <aside
        className={`cart-sidebar${isDrawerOpen ? " cart-sidebar--open" : ""}`}
        aria-hidden={!isDrawerOpen}
        aria-label="Shopping cart"
      >
        <header className="cart-sidebar__header">
          <h2 className="cart-sidebar__title">Shopping Cart</h2>
          <div className="cart-sidebar__tools">
            <button className="cart-sidebar__clear" type="button" aria-label="Clear cart" onClick={clear}>
              <Icon name="cartSidebarClear" size={22} />
              <Icon className="cart-sidebar__clear-mark" name="close" size={11} />
            </button>
            <button className="cart-sidebar__dismiss" type="button" aria-label="Close cart" onClick={closeDrawer}>
              <Icon name="close" size={16} />
            </button>
          </div>
        </header>
        <ul className="cart-sidebar__items">
          {items.map((item) => (
            <li className="cart-sidebar__item" key={item.id}>
              <img className="cart-sidebar__image" src={item.image} alt="" />
              <div className="cart-sidebar__info">
                <p className="cart-sidebar__name">{item.name}</p>
                <p className="cart-sidebar__meta">
                  <span>{item.quantity}</span>
                  <span> x </span>
                  <span className="cart-sidebar__price">{item.price}</span>
                </p>
              </div>
              <button
                className="cart-sidebar__remove"
                type="button"
                aria-label={`Remove ${item.name}`}
                onClick={() => removeItem(item.id)}
              >
                <Icon name="cartSidebarRemove" size={20} />
              </button>
            </li>
          ))}
        </ul>
        <p className="cart-sidebar__subtotal">
          <span>Subtotal</span>
          <strong>{subtotal}</strong>
        </p>
        <div className="cart-sidebar__actions">
          <ScrollLink className="cart-sidebar__action cart-sidebar__action--cart" to="/cart" onClick={closeDrawer}>
            Cart
          </ScrollLink>
          {items.length === 0 ? (
            <button className="cart-sidebar__action cart-sidebar__action--checkout" type="button" disabled>
              Checkout
            </button>
          ) : (
            <ScrollLink
              className="cart-sidebar__action cart-sidebar__action--checkout"
              to="/checkout"
              onClick={closeDrawer}
            >
              Checkout
            </ScrollLink>
          )}
          {/* <ScrollLink
            className="cart-sidebar__action cart-sidebar__action--comparison"
            to="/comparison"
            onClick={closeDrawer}
          >
            Comparison
          </ScrollLink> */}
        </div>
      </aside>
    </>
  );
}
