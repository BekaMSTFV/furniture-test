import Rating from "../../ui/Rating/Rating.jsx";
import "./ProductDetails.scss";

export default function ProductDetails({ product, tab, onTab, sectionRef }) {
  const paragraphs = product.fullDescription.split("\n\n");

  return (
    <section className="product-details" ref={sectionRef} aria-label="Product details">
      <div className="product-details__tabs" role="tablist">
        <button
          className={`product-details__tab${tab === "description" ? " product-details__tab--active" : ""}`}
          type="button"
          role="tab"
          aria-selected={tab === "description"}
          onClick={() => onTab("description")}
        >
          Description
        </button>
        <button
          className={`product-details__tab${tab === "reviews" ? " product-details__tab--active" : ""}`}
          type="button"
          role="tab"
          aria-selected={tab === "reviews"}
          onClick={() => onTab("reviews")}
        >
          Reviews
        </button>
      </div>
      <div className="product-details__panels">
        <div
          className={`product-details__panel${
            tab === "description" ? " product-details__panel--active" : ""
          }`}
          role="tabpanel"
        >
          <div className="product-details__text">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div
          className={`product-details__panel${
            tab === "reviews" ? " product-details__panel--active" : ""
          }`}
          role="tabpanel"
        >
          <ul className="product-details__reviews">
            {product.reviews.map((review) => (
              <li className="product-details__review" key={`${review.author}-${review.message}`}>
                <div className="product-details__review-top">
                  <p className="product-details__author">{review.author}</p>
                  <Rating value={review.rating} />
                </div>
                <p className="product-details__message">{review.message}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
