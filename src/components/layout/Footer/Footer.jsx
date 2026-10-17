import { useEffect, useRef, useState } from "react";
import { isEmail } from "../../../utils/email.js";
import ScrollLink from "../../ui/ScrollLink/ScrollLink.jsx";
import "./Footer.scss";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  // { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  function handleEmailChange(event) {
    setEmail(event.target.value);
    setStatus(null);
    clearTimeout(timer.current);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!isEmail(email)) {
      setStatus("error");
      clearTimeout(timer.current);
      document.getElementById("footer-email")?.focus();
      return;
    }

    setStatus("success");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(null), 5000);
  }

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand-block">
            <p className="footer__brand">Furniture</p>
            <p className="footer__address">
              400 University Drive Suite 200 Coral Gables,
              <br />
              FL 33134 USA
            </p>
          </div>

          <nav aria-label="Links">
            <p className="footer__heading">Links</p>
            <ul className="footer__list">
              {LINKS.map((item) => (
                <li key={item.label}>
                  <ScrollLink className="footer__link" to={item.to}>
                    {item.label}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="footer__heading">Newsletter</p>
            <form className="footer__form" noValidate onSubmit={handleSubmit}>
              <input
                className={`footer__email${status === "error" ? " footer__email--invalid" : ""}`}
                id="footer-email"
                type="email"
                name="email"
                placeholder="Enter Your Email Address"
                aria-label="Email address"
                aria-invalid={status === "error" || undefined}
                value={email}
                onChange={handleEmailChange}
              />
              <button className="footer__subscribe" type="submit">
                SUBSCRIBE
              </button>
            </form>
            <div
              className={`footer__note${status ? " is-visible" : ""}${status === "error" ? " footer__note--error" : ""}`}
              aria-live="polite"
              aria-hidden={status ? undefined : true}
            >
              <div className="footer__note-inner">
                <p>{status === "error" ? "Please change your email address" : "You are now subscribed!"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>2023 Furnino. All rights reverved</p>
        </div>
      </div>
    </footer>
  );
}
