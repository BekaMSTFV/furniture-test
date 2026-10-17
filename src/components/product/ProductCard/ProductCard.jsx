import { useState } from "react";
import { Link } from "react-router-dom";
import { productPath } from "../../../data/products.js";
import { useCart } from "../../../context/useCart.js";
import Badge from "../../ui/Badge/Badge.jsx";
import Button from "../../ui/Button/Button.jsx";
import Icon from "../../ui/Icon/Icon.jsx";
import ScrollLink from "../../ui/ScrollLink/ScrollLink.jsx";
import ProductRating from "../ProductRating/ProductRating.jsx";
import "./ProductCard.scss";

function ProductTools({ tone = "light" }) {
  const className = `product-card__tools${tone === "dark" ? " product-card__tools--dark" : ""}`;

  return (
    <div className={className}>
      {/* <button className="product-card__tool" type="button">
        <Icon className="product-card__tool-icon" name="share" size={16} />
        Share
      </button> */}
      {/* <Link className="product-card__tool" to="/comparison">
        <Icon className="product-card__tool-icon" name="compare" size={16} />
        Compare
      </Link> */}
      {/* <button className="product-card__tool" type="button">
        <Icon className="product-card__tool-icon" name="like" size={16} />
        Like
      </button> */}
    </div>
  );
}

function ProductInfo({ product, showBadge = false }) {
  return (
    <>
      <div className="product-card__heading">
        <h3 className="product-card__name">{product.name}</h3>
        {showBadge && product.badge && (
          <Badge variant={product.badge.type}>{product.badge.label}</Badge>
        )}
      </div>
      <p className="product-card__description">{product.description}</p>
      <p className="product-card__prices">
        <span className="product-card__price">{product.price}</span>
        {product.oldPrice && <span className="product-card__old-price">{product.oldPrice}</span>}
      </p>
    </>
  );
}

function ProductMedia({ product, showBadge = false }) {
  return (
    <ScrollLink className="product-card__media" to={productPath(product)}>
      {product.image ? (
        <img
          className="product-card__image"
          src={product.image}
          alt={product.name}
          width={285}
          height={301}
        />
      ) : (
        <span className="product-card__placeholder" />
      )}
      {showBadge && product.badge && (
        <span className="product-card__badge">
          <Badge variant={product.badge.type}>{product.badge.label}</Badge>
        </span>
      )}
    </ScrollLink>
  );
}

function AddToCartButton({ product, variant }) {
  const { addItem, removeItem, contains } = useCart();
  const [hovered, setHovered] = useState(false);
  const inCart = contains(product.id);
  const label = inCart ? (hovered ? "Remove from cart" : "Added to cart") : "Add to cart";
  const className = variant === "list" ? "product-card__add" : "product-card__cart";
  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onClick: () => {
      if (inCart) {
        removeItem(product.id);
        return;
      }

      addItem(product, 1);
    },
  };
  const text = (
    <span className="product-card__cart-label" key={label}>
      {label}
    </span>
  );

  if (variant === "list") {
    return (
      <Button
        className={`${className}${inCart ? ` ${className}--added` : ""}`}
        variant="outline"
        aria-label={inCart ? "Remove from cart" : "Add to cart"}
        {...handlers}
      >
        {text}
      </Button>
    );
  }

  return (
    <button
      className={`${className}${inCart ? ` ${className}--added` : ""}`}
      type="button"
      aria-label={inCart ? "Remove from cart" : "Add to cart"}
      {...handlers}
    >
      {text}
    </button>
  );
}

export default function ProductCard({ product, layout = "grid" }) {
  const isList = layout === "list";

  if (isList) {
    return (
      <article className="product-card product-card--list">
        <ProductMedia product={product} />
        <div className="product-card__content">
          <ScrollLink className="product-card__body" to={productPath(product)}>
            <ProductInfo product={product} showBadge />
            <ProductRating product={product} />
          </ScrollLink>
          <div className="product-card__actions">
            <AddToCartButton product={product} variant="list" />
            <ProductTools tone="dark" />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="product-card">
      <ProductMedia product={product} showBadge />
      <ScrollLink className="product-card__body" to={productPath(product)}>
        <ProductInfo product={product} />
      </ScrollLink>
      <div className="product-card__overlay">
        <div className="product-card__buy">
          <ProductRating product={product} tone="light" />
          <AddToCartButton product={product} variant="grid" />
        </div>
        <ProductTools />
      </div>
    </article>
  );
}
