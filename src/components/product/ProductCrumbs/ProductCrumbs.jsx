import Container from "../../layout/Container/Container.jsx";
import Icon from "../../ui/Icon/Icon.jsx";
import ScrollLink from "../../ui/ScrollLink/ScrollLink.jsx";
import "./ProductCrumbs.scss";

export default function ProductCrumbs({ name }) {
  return (
    <div className="product-crumbs">
      <Container>
        <nav aria-label="Breadcrumb">
          <ol className="product-crumbs__list">
            <li className="product-crumbs__item">
              <ScrollLink className="product-crumbs__link" to="/">
                Home
              </ScrollLink>
            </li>
            <li className="product-crumbs__item">
              <Icon name="chevron" size={16} />
              <ScrollLink className="product-crumbs__link" to="/shop">
                Shop
              </ScrollLink>
            </li>
            <li className="product-crumbs__item">
              <Icon name="chevron" size={16} />
              <span className="product-crumbs__current" aria-current="page">
                {name}
              </span>
            </li>
          </ol>
        </nav>
      </Container>
    </div>
  );
}
