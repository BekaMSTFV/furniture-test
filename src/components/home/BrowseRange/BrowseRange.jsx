import bedroom from "../../../assets/images/home/bedroom.png";
import dining from "../../../assets/images/home/dining.png";
import living from "../../../assets/images/home/living.png";
import CategoryCard from "../../product/CategoryCard/CategoryCard.jsx";
import "./BrowseRange.scss";

const RANGES = [
  { title: "Dining", image: dining },
  { title: "Living", image: living },
  { title: "Bedroom", image: bedroom },
];

export default function BrowseRange() {
  return (
    <section className="browse">
      <h2 className="browse__title">Browse The Range</h2>
      <p className="browse__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <div className="browse__list">
        {RANGES.map((range) => (
          <CategoryCard key={range.title} title={range.title} image={range.image} to="/shop" />
        ))}
      </div>
    </section>
  );
}
