import "./Badge.scss";

export default function Badge({ children, variant = "discount" }) {
  return <span className={`badge badge--${variant}`}>{children}</span>;
}
