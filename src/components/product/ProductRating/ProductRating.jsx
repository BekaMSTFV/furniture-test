import { getRatingSummary } from "../../../data/products.js";
import Rating from "../../ui/Rating/Rating.jsx";
import "./ProductRating.scss";

export default function ProductRating({ product, tone = "default", divided = false, onClick }) {
  const { value, count } = getRatingSummary(product);
  const className = [
    "product-rating",
    tone === "default" ? "" : `product-rating--${tone}`,
    onClick ? "product-rating--button" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <Rating value={value} />
      {divided && <span className="product-rating__divider" aria-hidden="true" />}
      <span className="product-rating__count">{count} Customer Review</span>
    </>
  );

  if (onClick) {
    return (
      <button className={className} type="button" onClick={onClick}>
        {content}
      </button>
    );
  }

  return <div className={className}>{content}</div>;
}
