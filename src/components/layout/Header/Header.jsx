import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { useCart } from "../../../context/useCart.js";
import { isPlainClick, useScrollPlace } from "../../ui/ScrollLink/ScrollLink.jsx";
import Icon from "../../ui/Icon/Icon.jsx";
import "./Header.scss";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/shop", label: "Shop" },
  // { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const MOBILE_QUERY = "(max-width: 1024px)";

export default function Header() {
  const { items, openDrawer } = useCart();
  const goTo = useScrollPlace();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.key]);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const onChange = () => {
      if (!media.matches) {
        setMenuOpen(false);
      }
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const onKey = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`header${menuOpen ? " header--open" : ""}`}>
      <div className="header__inner">
        <button
          className="header__burger"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="header-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className="header__menu" id="header-menu">
          <div className="header__menu-inner">
            <Link className="header__logo" to="/" onClick={closeMenu}>
              <img className="header__mark" src={logo} alt="" />
              <span className="header__name">Furniture</span>
            </Link>

            <nav className="header__nav" aria-label="Main">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    isActive ? "header__link header__link--active" : "header__link"
                  }
                  onClick={(event) => {
                    closeMenu();

                    if (!isPlainClick(event)) {
                      return;
                    }

                    event.preventDefault();
                    goTo(link.to);
                  }}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        <div className="header__actions">
          {/* <button className="header__action" type="button" aria-label="Account">
            <Icon name="account" size={28} />
          </button> */}
          {/* <button className="header__action" type="button" aria-label="Search">
            <Icon name="search" size={28} />
          </button> */}
          {/* <button className="header__action" type="button" aria-label="Wishlist">
            <Icon name="heart" size={28} />
          </button> */}
          <button
            className="header__action header__action--cart"
            type="button"
            aria-label={count ? `Cart, ${count} items` : "Cart"}
            onClick={() => {
              closeMenu();
              openDrawer();
            }}
          >
            <Icon name="cart" size={28} />
            {count > 0 && (
              <span className={`header__badge${count > 99 ? " header__badge--dot" : ""}`}>
                {count <= 99 ? count : null}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
