import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/useCart.js";
import Quantity from "../../ui/Quantity/Quantity.jsx";
import ProductRating from "../ProductRating/ProductRating.jsx";
import "./ProductSummary.scss";

export default function ProductSummary({ product, onReviewsClick }) {
  const { addItem, removeItem, contains } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [hovered, setHovered] = useState(false);
  const inCart = contains(product.id);
  const label = inCart ? (hovered ? "Remove From Cart" : "Added To Cart") : "Add To Cart";

  const onCart = () => {
    if (inCart) {
      removeItem(product.id);
      return;
    }

    addItem(product, quantity);
  };

  return (
    <div className="product-summary">
      <h1 className="product-summary__name">{product.name}</h1>
      <p className="product-summary__prices">
        <span className="product-summary__price">{product.price}</span>
        {product.oldPrice && (
          <span className="product-summary__old-price">{product.oldPrice}</span>
        )}
      </p>
      <ProductRating product={product} divided onClick={onReviewsClick} />
      <p className="product-summary__description">{product.description}</p>
      <div className="product-summary__actions">
        <Quantity value={quantity} onChange={setQuantity} />
        <button
          className={`product-summary__cart${inCart ? " product-summary__cart--added" : ""}`}
          type="button"
          aria-label={inCart ? "Remove from cart" : "Add to cart"}
          onClick={onCart}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <span className="product-summary__cart-label" key={label}>
            {label}
          </span>
        </button>
        {/* <Link className="product-summary__compare" to="/comparison">
          + Compare
        </Link> */}
      </div>
    </div>
  );
}
