import Icon from "../Icon/Icon.jsx";
import "./Rating.scss";

const STAR_SIZE = 18;

export default function Rating({ value = 0, max = 5, className = "" }) {
  const stars = [];

  for (let index = 0; index < max; index += 1) {
    const fill = Math.min(Math.max(value - index, 0), 1);

    if (fill <= 0) {
      break;
    }

    stars.push(fill);
  }

  const label = Number.isInteger(value) ? String(value) : value.toFixed(1);

  return (
    <div className={`rating ${className}`.trim()} aria-label={`Rating ${label} out of ${max}`}>
      {stars.map((fill, index) => (
        <span className="rating__star" key={index}>
          <span className="rating__part" style={{ width: `${fill * 100}%` }}>
            <Icon name="star" size={STAR_SIZE} />
          </span>
        </span>
      ))}
    </div>
  );
}
