import Button from "../../ui/Button/Button.jsx";
import "./CartSummary.scss";

export default function CartSummary({ subtotal = "Rs. 0.00", total = "Rs. 0.00" }) {
  return (
    <aside className="cart-summary">
      <h2 className="cart-summary__title">Cart Totals</h2>
      <p className="cart-summary__row">
        <span>Subtotal</span>
        <span>{subtotal}</span>
      </p>
      <p className="cart-summary__row cart-summary__row--total">
        <span>Total</span>
        <strong>{total}</strong>
      </p>
      <Button variant="outline" to="/checkout" scroll>
        Check Out
      </Button>
    </aside>
  );
}
