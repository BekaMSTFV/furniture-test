import ScrollLink from "../../ui/ScrollLink/ScrollLink.jsx";
import "./CategoryCard.scss";

export default function CategoryCard({ title, image, to = "/shop" }) {
  return (
    <ScrollLink className="category-card" to={to}>
      <span className="category-card__media">
        {image ? <img src={image} alt="" /> : <span className="category-card__placeholder" />}
      </span>
      <span className="category-card__title">{title}</span>
    </ScrollLink>
  );
}
