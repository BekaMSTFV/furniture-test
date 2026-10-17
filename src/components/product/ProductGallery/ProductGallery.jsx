import { useEffect, useRef, useState } from "react";
import Icon from "../../ui/Icon/Icon.jsx";
import "./ProductGallery.scss";

export default function ProductGallery({ product }) {
  const images = [product.image, ...product.otherImages];
  const [trackedId, setTrackedId] = useState(product.id);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [thumbStart, setThumbStart] = useState(0);
  const [layout, setLayout] = useState({ horizontal: false, step: 112, visible: 4 });
  const rootRef = useRef(null);
  const timer = useRef(null);
  const frame = useRef(0);
  const generation = useRef(0);
  const maxStart = Math.max(0, images.length - layout.visible);
  const start = Math.min(thumbStart, maxStart);
  const canScroll = maxStart > 0;

  if (trackedId !== product.id) {
    window.clearTimeout(timer.current);
    window.cancelAnimationFrame(frame.current);
    generation.current += 1;
    setTrackedId(product.id);
    setIndex(0);
    setThumbStart(0);
    setVisible(true);
  }

  useEffect(() => {
    generation.current += 1;
    window.clearTimeout(timer.current);
    window.cancelAnimationFrame(frame.current);
  }, [product.id]);

  useEffect(
    () => () => {
      window.clearTimeout(timer.current);
      window.cancelAnimationFrame(frame.current);
    },
    [],
  );

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return undefined;
    }

    const measure = () => {
      const viewport = root.querySelector(".product-gallery__viewport");
      const thumb = root.querySelector(".product-gallery__thumb");
      const track = root.querySelector(".product-gallery__track");

      if (!viewport || !thumb || !track) {
        return;
      }

      const trackStyle = getComputedStyle(track);
      const horizontal = trackStyle.flexDirection === "row";
      const thumbRect = thumb.getBoundingClientRect();
      const thumbSize = horizontal ? thumbRect.width : thumbRect.height;

      if (thumbSize < 1) {
        return;
      }

      const gap = Number.parseFloat(horizontal ? trackStyle.columnGap : trackStyle.rowGap) || 0;
      const step = Math.max(1, Math.round(thumbSize + gap));
      const viewSize = horizontal ? viewport.clientWidth : viewport.clientHeight;
      const nextVisible = Math.max(1, Math.floor((viewSize + gap) / step));

      setLayout((current) => {
        if (
          current.horizontal === horizontal &&
          current.step === step &&
          current.visible === nextVisible
        ) {
          return current;
        }

        return { horizontal, step, visible: nextVisible };
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    const viewport = root.querySelector(".product-gallery__viewport");
    observer.observe(root);

    if (viewport) {
      observer.observe(viewport);
    }

    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [product.id, images.length]);

  const showImage = (nextIndex) => {
    if (nextIndex === index) {
      return;
    }

    const token = generation.current;
    window.clearTimeout(timer.current);
    window.cancelAnimationFrame(frame.current);
    setVisible(false);
    timer.current = window.setTimeout(() => {
      if (token !== generation.current) {
        return;
      }

      setIndex(nextIndex);
      frame.current = window.requestAnimationFrame(() => {
        if (token !== generation.current) {
          return;
        }

        setVisible(true);
      });
    }, 250);
  };

  return (
    <div className="product-gallery" ref={rootRef}>
      <div className="product-gallery__thumbs">
        {canScroll && (
          <button
            className="product-gallery__nav product-gallery__nav--up"
            type="button"
            aria-label="Previous images"
            disabled={start === 0}
            onClick={() => setThumbStart((current) => Math.max(0, current - 1))}
          >
            <Icon className="product-gallery__icon" name="chevron" size={18} />
          </button>
        )}
        <div className="product-gallery__viewport">
          <div
            className="product-gallery__track"
            style={{
              transform: layout.horizontal
                ? `translateX(-${start * layout.step}px)`
                : `translateY(-${start * layout.step}px)`,
            }}
          >
            {images.map((image, imageIndex) => (
              <button
                key={`${product.id}-${imageIndex}`}
                className={`product-gallery__thumb${
                  imageIndex === index ? " product-gallery__thumb--active" : ""
                }`}
                type="button"
                aria-label={`${product.name} image ${imageIndex + 1}`}
                aria-current={imageIndex === index ? "true" : undefined}
                onClick={() => showImage(imageIndex)}
              >
                <img src={image} alt="" />
              </button>
            ))}
          </div>
        </div>
        {canScroll && (
          <button
            className="product-gallery__nav product-gallery__nav--down"
            type="button"
            aria-label="Next images"
            disabled={start === maxStart}
            onClick={() => setThumbStart((current) => Math.min(maxStart, current + 1))}
          >
            <Icon className="product-gallery__icon" name="chevron" size={18} />
          </button>
        )}
      </div>
      <div className={`product-gallery__stage${canScroll ? " product-gallery__stage--offset" : ""}`}>
        <img
          key={product.id}
          className={`product-gallery__image${visible ? "" : " product-gallery__image--hidden"}`}
          src={images[index] ?? product.image}
          alt={product.name}
        />
      </div>
    </div>
  );
}
