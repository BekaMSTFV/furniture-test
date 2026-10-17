import { useEffect, useId } from "react";
import Button from "../../ui/Button/Button.jsx";
import { useScrollPlace } from "../../ui/ScrollLink/ScrollLink.jsx";
import "./OrderPopup.scss";

export default function OrderPopup({
  title = "Your order is placed successfully!",
  shopLabel = "Continue Shopping",
}) {
  const titleId = useId();
  const goTo = useScrollPlace();

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <div className="order-popup">
      <button
        className="order-popup__backdrop"
        type="button"
        aria-label="Go home"
        onClick={() => goTo("/")}
      />
      <div className="order-popup__dialog" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <p className="order-popup__title" id={titleId}>
          {title}
        </p>
        <div className="order-popup__actions">
          <Button className="order-popup__action" variant="outline" to="/shop" scroll>
            {shopLabel}
          </Button>
          <Button className="order-popup__action" variant="outline" to="/" scroll>
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
