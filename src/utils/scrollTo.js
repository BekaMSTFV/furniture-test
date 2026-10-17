export function scrollToTarget(target) {
  if (target == null || target === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const element = typeof target === "string" ? document.querySelector(target) : target;

  if (!element) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const styles = getComputedStyle(element);

  if (styles.position === "sticky") {
    const margin = Number.parseFloat(styles.scrollMarginTop) || 0;
    const previous = element.style.position;
    element.style.position = "static";
    const top = element.getBoundingClientRect().top + window.scrollY;
    element.style.position = previous;
    window.scrollTo({ top: Math.max(0, top - margin), behavior: "smooth" });
    return;
  }

  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function scrollToPlace({ pathname, target = "top", navigate, pathnameNow }) {
  if (!pathname || pathname === pathnameNow) {
    scrollToTarget(target);
    return;
  }

  navigate(pathname, { state: { scrollTo: target ?? "top" } });
}
