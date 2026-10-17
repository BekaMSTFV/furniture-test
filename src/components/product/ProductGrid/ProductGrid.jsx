import ProductCard from "../ProductCard/ProductCard.jsx";
import "./ProductGrid.scss";

export default function ProductGrid({ products = [], layout = "grid" }) {
  const className = layout === "list" ? "product-grid product-grid--list" : "product-grid";

  return (
    <div className={className}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} layout={layout} />
      ))}
    </div>
  );
}
