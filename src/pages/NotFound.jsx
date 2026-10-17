import Button from "../components/ui/Button/Button.jsx";
import "./NotFound.scss";

export default function NotFound() {
  return (
    <section className="not-found" aria-labelledby="not-found-title">
      <h1 className="not-found__title" id="not-found-title">
        Error 404!
      </h1>
      <p className="not-found__text">This page does not exists</p>
      <Button className="not-found__home" variant="outline" to="/" scroll>
        Go Home
      </Button>
    </section>
  );
}
