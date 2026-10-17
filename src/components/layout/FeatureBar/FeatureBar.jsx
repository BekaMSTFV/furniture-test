import Icon from "../../ui/Icon/Icon.jsx";
import Container from "../Container/Container.jsx";
import "./FeatureBar.scss";

const FEATURES = [
  {
    icon: "trophy",
    title: "High Quality",
    text: "crafted from top materials",
  },
  {
    icon: "guarantee",
    title: "Warranty Protection",
    text: "Over 2 years",
  },
  {
    icon: "shipping",
    title: "Free Shipping",
    text: "Order over 150 $",
  },
  {
    icon: "support",
    title: "24 / 7 Support",
    text: "Dedicated support",
  },
];

export default function FeatureBar() {
  return (
    <section className="feature-bar" aria-label="Store benefits">
      <Container>
        <ul className="feature-bar__list">
          {FEATURES.map((feature) => (
            <li className="feature-bar__item" key={feature.title}>
              <Icon name={feature.icon} size={60} />
              <div>
                <p className="feature-bar__title">{feature.title}</p>
                <p className="feature-bar__text">{feature.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
