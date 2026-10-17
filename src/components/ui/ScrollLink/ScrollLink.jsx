import { Link, useLocation, useNavigate } from "react-router-dom";
import { scrollToPlace } from "../../../utils/scrollTo.js";

export function useScrollPlace() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (nextPath, target = "top") => {
    scrollToPlace({
      pathname: nextPath,
      target,
      navigate,
      pathnameNow: pathname,
    });
  };
}

export function isPlainClick(event) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

export default function ScrollLink({ to, target = "top", onClick, children, ...props }) {
  const goTo = useScrollPlace();

  return (
    <Link
      to={to}
      {...props}
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented || !isPlainClick(event)) {
          return;
        }

        event.preventDefault();
        goTo(to, target);
      }}
    >
      {children}
    </Link>
  );
}
