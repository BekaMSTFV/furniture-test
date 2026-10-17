import Button from "../Button/Button.jsx";
import "./EmptyState.scss";

export default function EmptyState({ title, action = "Go to shop", to = "/shop" }) {
  return (
    <section className="empty-state">
      <h2 className="empty-state__title">{title}</h2>
      <Button className="empty-state__action" variant="outline" to={to} scroll>
        {action}
      </Button>
    </section>
  );
}
