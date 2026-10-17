import { Link } from "react-router-dom";
import Icon from "../Icon/Icon.jsx";
import "./Breadcrumbs.scss";

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li className="breadcrumbs__item" key={`${item.label}-${index}`}>
              {index > 0 && <Icon name="chevron" size={20} />}
              {item.to && !isLast ? (
                <Link to={item.to}>{item.label}</Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
