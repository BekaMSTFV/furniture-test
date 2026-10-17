import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import OurProducts from "../components/home/OurProducts/OurProducts.jsx";
import ProductCrumbs from "../components/product/ProductCrumbs/ProductCrumbs.jsx";
import ProductDetails from "../components/product/ProductDetails/ProductDetails.jsx";
import ProductGallery from "../components/product/ProductGallery/ProductGallery.jsx";
import ProductSummary from "../components/product/ProductSummary/ProductSummary.jsx";
import { products } from "../data/products.js";
import { scrollToTarget } from "../utils/scrollTo.js";
import "./Product.scss";

export default function Product() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  const detailsRef = useRef(null);
  const [tab, setTab] = useState("description");

  useEffect(() => {
    setTab("description");
  }, [product?.id]);

  const showReviews = () => {
    setTab("reviews");
    scrollToTarget(detailsRef.current);
  };

  if (!product) {
    return (
      <section className="product-page" aria-label="Product">
        <ProductCrumbs name="Product" />
        <p className="product-page__missing">Product not found.</p>
      </section>
    );
  }

  return (
    <article className="product-page">
      <ProductCrumbs name={product.name} />
      <div className="product-page__main">
        <ProductGallery product={product} />
        <ProductSummary key={product.id} product={product} onReviewsClick={showReviews} />
      </div>
      <ProductDetails
        product={product}
        tab={tab}
        onTab={setTab}
        sectionRef={detailsRef}
      />
      <OurProducts title="Related Products" limit={4} excludeId={product.id} divided />
    </article>
  );
}
