import { cartAmount } from "../data/cart.js";
import { useCart } from "../context/useCart.js";
import CartLine from "../components/cart/CartLine/CartLine.jsx";
import CartSummary from "../components/cart/CartSummary/CartSummary.jsx";
import EmptyState from "../components/ui/EmptyState/EmptyState.jsx";
import FeatureBar from "../components/layout/FeatureBar/FeatureBar.jsx";
import PageBanner from "../components/layout/PageBanner/PageBanner.jsx";
import { formatPrice } from "../utils/price.js";
import "./Cart.scss";

export default function Cart() {
  const { items, updateQuantity, removeItem } = useCart();
  const total = formatPrice(cartAmount(items));

  return (
    <>
      <PageBanner
        title="Cart"
        items={[
          { label: "Home", to: "/" },
          { label: "Cart" },
        ]}
      />
      {items.length === 0 ? (
        <EmptyState title="Your shopping cart is empty" />
      ) : (
        <section className="cart-page" aria-label="Cart">
          <div className="cart-page__layout">
            <div className="cart-table">
              <div className="cart-table__head">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Subtotal</span>
              </div>
              <div className="cart-table__body">
                {items.map((item) => (
                  <CartLine
                    key={item.id}
                    item={item}
                    onQuantityChange={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            </div>
            <CartSummary subtotal={total} total={total} />
          </div>
        </section>
      )}
      <FeatureBar />
    </>
  );
}
