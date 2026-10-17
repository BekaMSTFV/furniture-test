import banner from "../../../assets/images/page-banner.png";
import Breadcrumbs from "../../ui/Breadcrumbs/Breadcrumbs.jsx";
import "./PageBanner.scss";

export default function PageBanner({ title, items = [] }) {
  return (
    <section className="page-banner" style={{ backgroundImage: `url("${banner}")` }}>
      <h1 className="page-banner__title">{title}</h1>
      {items.length > 0 && <Breadcrumbs items={items} />}
    </section>
  );
}
