import { useEffect, useState } from "react";
import { QUANTITY_MAX, QUANTITY_MIN, clampQuantity } from "../../../utils/quantity.js";
import "./Quantity.scss";

export default function Quantity({
  value = 1,
  min = QUANTITY_MIN,
  max = QUANTITY_MAX,
  variant = "stepper",
  onChange,
}) {
  const [draft, setDraft] = useState(String(value));

  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  const commit = (next) => {
    const quantity = clampQuantity(next, min, max);
    setDraft(String(quantity));

    if (quantity !== value) {
      onChange?.(quantity);
    }
  };

  const onInput = (event) => {
    const next = event.target.value.replace(/\D/g, "").slice(0, 2);
    setDraft(next);

    if (next === "") {
      return;
    }

    const number = Number(next);

    if (number > max) {
      commit(max);
      return;
    }

    if (number >= min) {
      onChange?.(number);
    }
  };

  const field = (
    <input
      className={variant === "field" ? "quantity quantity--field" : "quantity__value"}
      type="text"
      inputMode="numeric"
      aria-label="Quantity"
      value={draft}
      onChange={onInput}
      onBlur={() => commit(draft === "" ? min : draft)}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.currentTarget.blur();
        }
      }}
    />
  );

  if (variant === "field") {
    return field;
  }

  return (
    <div className="quantity">
      <button
        className="quantity__button"
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => commit(value - 1)}
      >
        -
      </button>
      {field}
      <button
        className="quantity__button"
        type="button"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => commit(value + 1)}
      >
        +
      </button>
    </div>
  );
}
