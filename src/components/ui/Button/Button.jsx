import { Link } from "react-router-dom";
import ScrollLink from "../ScrollLink/ScrollLink.jsx";
import "./Button.scss";

export default function Button({
  variant = "primary",
  to,
  href,
  children,
  className = "",
  type = "button",
  scroll = false,
  scrollTarget = "top",
  ...props
}) {
  const classes = `button button--${variant} ${className}`.trim();

  if (to && scroll) {
    return (
      <ScrollLink to={to} target={scrollTarget} className={classes} {...props}>
        {children}
      </ScrollLink>
    );
  }

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
