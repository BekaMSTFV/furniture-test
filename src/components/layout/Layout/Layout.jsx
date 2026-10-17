import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { scrollToTarget } from "../../../utils/scrollTo.js";
import CartSidebar from "../../cart/CartSidebar/CartSidebar.jsx";
import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import "./Layout.scss";

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    const target = location.state?.scrollTo;

    if (!target) {
      return undefined;
    }

    const frame = requestAnimationFrame(() => {
      scrollToTarget(target);
    });

    return () => cancelAnimationFrame(frame);
  }, [location.key, location.state]);

  return (
    <div className="layout">
      <Header />
      <main className="layout__main">
        <Outlet />
      </main>
      <Footer />
      <CartSidebar />
    </div>
  );
}
