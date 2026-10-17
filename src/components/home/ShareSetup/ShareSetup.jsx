import shareA from "../../../assets/images/home/share-a.png";
import shareB from "../../../assets/images/home/share-b.png";
import shareC from "../../../assets/images/home/share-c.png";
import shareD from "../../../assets/images/home/share-d.png";
import shareE from "../../../assets/images/home/share-e.png";
import shareF from "../../../assets/images/home/share-f.png";
import shareG from "../../../assets/images/home/share-g.png";
import shareH from "../../../assets/images/home/share-h.png";
import shareI from "../../../assets/images/home/share-i.png";
import "./ShareSetup.scss";

const TILES = [
  { id: "a", src: shareA },
  { id: "b", src: shareB },
  { id: "c", src: shareC },
  { id: "d", src: shareD },
  { id: "e", src: shareE },
  { id: "f", src: shareF },
  { id: "g", src: shareG },
  { id: "h", src: shareH },
  { id: "i", src: shareI },
];

export default function ShareSetup() {
  return (
    <section className="share">
      <div className="share__heading">
        <p className="share__label">Share your setup with</p>
        <h2 className="share__title">#Furniture</h2>
      </div>
      <div className="share__collage" aria-hidden="true">
        {TILES.map((tile) => (
          <span key={tile.id} className={`share__item share__item--${tile.id}`}>
            <img className="share__image" src={tile.src} alt="" />
          </span>
        ))}
      </div>
    </section>
  );
}
