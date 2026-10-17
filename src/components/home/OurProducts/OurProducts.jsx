import { useMemo } from "react";
import ProductGrid from "../../product/ProductGrid/ProductGrid.jsx";
import Button from "../../ui/Button/Button.jsx";
import { products as catalog } from "../../../data/products.js";
import { pickRandom } from "../../../utils/pickRandom.js";
import "./OurProducts.scss";

export default function OurProducts({
  title = "Our Products",
  items = catalog,
  limit,
  excludeId,
  divided = false,
}) {
  const visible = useMemo(() => {
    const pool = excludeId ? items.filter((item) => item.id !== excludeId) : items;

    if (!limit || limit >= pool.length) {
      return pool;
    }

    return pickRandom(pool, limit);
  }, [items, limit, excludeId]);

  const className = divided ? "products products--divided" : "products";

  return (
    <section className={className}>
      <h2 className="products__title">{title}</h2>
      <ProductGrid products={visible} />
      <Button className="products__more" variant="outline" to="/shop" scroll>
        Show More
      </Button>
    </section>
  );
}
