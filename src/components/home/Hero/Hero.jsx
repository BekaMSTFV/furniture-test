import hero from "../../../assets/images/home/hero.png";
import Button from "../../ui/Button/Button.jsx";
import "./Hero.scss";

export default function Hero() {
  return (
    <section className="hero">
      <img className="hero__photo" src={hero} alt="" />
      <div className="hero__content">
        <div className="hero__card">
          <p className="hero__label">New Arrival</p>
          <h1 className="hero__title">
            Discover Our
            <br />
            New Collection
          </h1>
          <p className="hero__text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
            ullamcorper mattis.
          </p>
          <Button className="hero__action" variant="primary" to="/shop" scroll>
            Buy Now
          </Button>
        </div>
      </div>
    </section>
  );
}
