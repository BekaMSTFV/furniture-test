import { useEffect, useState } from "react";
import room1 from "../../../assets/images/home/room-1.png";
import room2 from "../../../assets/images/home/room-2.png";
import room3 from "../../../assets/images/home/room-3.png";
import Button from "../../ui/Button/Button.jsx";
import Icon from "../../ui/Icon/Icon.jsx";
import ScrollLink from "../../ui/ScrollLink/ScrollLink.jsx";
import "./Inspiration.scss";

const SLIDES = [
  { image: room1, code: "01", place: "Bed Room", title: "Inner Peace" },
  { image: room2, code: "02", place: "Dining", title: "Dining Room" },
  { image: room3, code: "03", place: "Living", title: "Living Room" },
];

const DESKTOP_SIZES = { active: 404, rest: 372, activeH: 582, restH: 486, gap: 24 };
const SIZE_STEPS = [
  { max: 320, active: 200, rest: 148, activeH: 280, restH: 230, gap: 10 },
  { max: 768, active: 250, rest: 190, activeH: 340, restH: 280, gap: 12 },
  { max: 1024, active: 320, rest: 250, activeH: 440, restH: 360, gap: 16 },
  { max: 1250, active: 360, rest: 280, activeH: 500, restH: 410, gap: 16 },
];
const OFFSETS = [-2, -1, 0, 1, 2, 3];

const readSizes = () => {
  const step = SIZE_STEPS.find((item) => window.matchMedia(`(max-width: ${item.max}px)`).matches);
  return step ?? DESKTOP_SIZES;
};

const normalize = (value) => {
  const length = SLIDES.length;
  return ((value % length) + length) % length;
};

const layoutFrames = (index, sizes) => {
  let cursor = OFFSETS.filter((offset) => offset < 0).length * -(sizes.rest + sizes.gap);

  return OFFSETS.map((offset) => {
    const active = offset === 0;
    const width = active ? sizes.active : sizes.rest;
    const left = cursor;
    cursor += width + sizes.gap;

    return {
      key: index + offset,
      slide: SLIDES[normalize(index + offset)],
      left,
      width,
      height: active ? sizes.activeH : sizes.restH,
      active,
    };
  });
};

export default function Inspiration() {
  const [index, setIndex] = useState(SLIDES.length);
  const [sizes, setSizes] = useState(readSizes);
  const activeSlide = normalize(index);
  const frames = layoutFrames(index, sizes);

  useEffect(() => {
    const queries = SIZE_STEPS.map((item) => window.matchMedia(`(max-width: ${item.max}px)`));
    const update = () => setSizes(readSizes());

    update();
    queries.forEach((query) => query.addEventListener("change", update));
    return () => queries.forEach((query) => query.removeEventListener("change", update));
  }, []);

  const showNext = () => {
    setIndex((current) => current + 1);
  };

  const showPrev = () => {
    setIndex((current) => current - 1);
  };

  const showSlide = (slide) => {
    setIndex((current) => current + (slide - normalize(current)));
  };

  return (
    <section className="inspiration">
      <div className="inspiration__layout">
        <div className="inspiration__content">
          <h2 className="inspiration__title">
            50+ Beautiful rooms
            <br />
            inspiration
          </h2>
          <p className="inspiration__text">
            Our designer already made a lot of beautiful prototipe of rooms that inspire you
          </p>
          <Button className="inspiration__action" variant="primary" to="/shop" scroll>
            Explore More
          </Button>
        </div>
        <div
          className="inspiration__stage"
          style={{
            "--slide-active": `${sizes.active}px`,
            "--slide-rest": `${sizes.rest}px`,
            "--slide-gap": `${sizes.gap}px`,
            "--slide-active-h": `${sizes.activeH}px`,
          }}
        >
          <button
            className="inspiration__nav inspiration__nav--prev"
            type="button"
            aria-label="Previous room"
            onClick={showPrev}
          >
            <Icon className="inspiration__nav-icon" name="chevron" size={18} />
          </button>
          <div className="inspiration__viewport">
            <div className="inspiration__track">
              {frames.map((frame) => (
                <article
                  key={frame.key}
                  className={`inspiration__slide${frame.active ? " inspiration__slide--active" : ""}`}
                  style={{
                    left: frame.left,
                    width: frame.width,
                    height: frame.height,
                  }}
                >
                  <img className="inspiration__photo" src={frame.slide.image} alt="" />
                  <ScrollLink className="inspiration__caption" to="/shop">
                    <p className="inspiration__meta">
                      <span>{frame.slide.code}</span>
                      <span className="inspiration__line" />
                      <span>{frame.slide.place}</span>
                    </p>
                    <p className="inspiration__name">{frame.slide.title}</p>
                  </ScrollLink>
                  {frame.active && (
                    <ScrollLink className="inspiration__link" to="/shop" aria-label="Shop">
                      <Icon name="arrow" size={22} />
                    </ScrollLink>
                  )}
                </article>
              ))}
            </div>
          </div>
          <button
            className="inspiration__nav inspiration__nav--next"
            type="button"
            aria-label="Next room"
            onClick={showNext}
          >
            <Icon name="chevron" size={18} />
          </button>
          <div className="inspiration__dots">
            {SLIDES.map((slide, slideIndex) => (
              <button
                key={slide.code}
                className={`inspiration__dot${
                  slideIndex === activeSlide ? " inspiration__dot--active" : ""
                }`}
                type="button"
                aria-label={`Slide ${slideIndex + 1}`}
                onClick={() => showSlide(slideIndex)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
