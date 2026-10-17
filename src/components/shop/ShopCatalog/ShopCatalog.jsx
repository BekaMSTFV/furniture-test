import { useEffect, useMemo, useRef, useState } from "react";
import ProductGrid from "../../product/ProductGrid/ProductGrid.jsx";
import Pagination from "../../ui/Pagination/Pagination.jsx";
import { useScrollPlace } from "../../ui/ScrollLink/ScrollLink.jsx";
import ShopBar from "../ShopBar/ShopBar.jsx";
import { products } from "../../../data/products.js";
import { scrollToTarget } from "../../../utils/scrollTo.js";
import "./ShopCatalog.scss";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "discount", label: "Discount" },
  { id: "new", label: "New" },
];

const SORTS = [
  { id: "default", label: "Default" },
  { id: "price-asc", label: "Price low to high" },
  { id: "price-desc", label: "Price high to low" },
  { id: "name-asc", label: "Name A-Z" },
  { id: "name-desc", label: "Name Z-A" },
];

const PAGE_SIZES = [16, 24, 32, 64].map((size) => ({ id: size, label: String(size) }));

const SHOP_STORAGE_KEY = "furniro-shop";

const readShopState = () => {
  const fallback = {
    filter: "all",
    sort: "default",
    view: "grid",
    pageSize: 16,
    page: 1,
  };

  try {
    const raw = sessionStorage.getItem(SHOP_STORAGE_KEY);
    if (!raw) {
      return fallback;
    }

    const data = JSON.parse(raw);
    return {
      filter: FILTERS.some((item) => item.id === data.filter) ? data.filter : fallback.filter,
      sort: SORTS.some((item) => item.id === data.sort) ? data.sort : fallback.sort,
      view: data.view === "list" ? "list" : fallback.view,
      pageSize: PAGE_SIZES.some((item) => item.id === data.pageSize) ? data.pageSize : fallback.pageSize,
      page: Number.isInteger(data.page) && data.page >= 1 ? data.page : fallback.page,
    };
  } catch {
    return fallback;
  }
};

const priceValue = (price) => Number(String(price).replace(/[^\d]/g, "")) || 0;

const matchesFilter = (product, filter) => {
  if (filter === "discount") {
    return product.badge?.type === "discount" || Boolean(product.oldPrice);
  }

  if (filter === "new") {
    return product.badge?.type === "new";
  }

  return true;
};

const compareProducts = (sort) => (left, right) => {
  if (sort === "price-asc") {
    return priceValue(left.price) - priceValue(right.price);
  }

  if (sort === "price-desc") {
    return priceValue(right.price) - priceValue(left.price);
  }

  if (sort === "name-asc") {
    return left.name.localeCompare(right.name);
  }

  if (sort === "name-desc") {
    return right.name.localeCompare(left.name);
  }

  return 0;
};

const STICKY_BAR_QUERY = "(max-width: 1024px)";

export default function ShopCatalog() {
  const barRef = useRef(null);
  const catalogRef = useRef(null);
  const goTo = useScrollPlace();
  const [initialShop] = useState(readShopState);
  const [filter, setFilter] = useState(initialShop.filter);
  const [sort, setSort] = useState(initialShop.sort);
  const [view, setView] = useState(initialShop.view);
  const [pageSize, setPageSize] = useState(initialShop.pageSize);
  const [page, setPage] = useState(initialShop.page);
  const [menu, setMenu] = useState(null);
  const [away, setAway] = useState(false);

  const found = useMemo(() => {
    const filtered = products.filter((product) => matchesFilter(product, filter));

    if (sort === "default") {
      return filtered;
    }

    return [...filtered].sort(compareProducts(sort));
  }, [filter, sort]);

  const pageCount = Math.max(1, Math.ceil(found.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const startIndex = (currentPage - 1) * pageSize;
  const visible = found.slice(startIndex, startIndex + pageSize);
  const rangeStart = found.length === 0 ? 0 : startIndex + 1;
  const rangeEnd = found.length === 0 ? 0 : startIndex + visible.length;
  const resultsLabel =
    found.length === 0
      ? "Showing 0 of 0 results"
      : `Showing ${rangeStart}–${rangeEnd} of ${found.length} results`;

  useEffect(() => {
    if (page > pageCount) {
      setPage(pageCount);
    }
  }, [page, pageCount]);

  useEffect(() => {
    const saved = { filter, sort, view, pageSize, page: Math.min(page, pageCount) };

    try {
      sessionStorage.setItem(SHOP_STORAGE_KEY, JSON.stringify(saved));
    } catch {
      // The catalog still works when the browser blocks storage.
    }
  }, [filter, sort, view, pageSize, page, pageCount]);

  const closeMenu = () => {
    setMenu(null);
  };

  const toggleMenu = (name) => {
    setMenu((current) => (current === name ? null : name));
  };

  const alignBar = () => {
    if (!window.matchMedia(STICKY_BAR_QUERY).matches) {
      return;
    }

    scrollToTarget(barRef.current);
  };

  const chooseFilter = (nextFilter) => {
    setFilter(nextFilter);
    setPage(1);
    setMenu(null);
    alignBar();
  };

  const chooseSort = (nextSort) => {
    setSort(nextSort);
    setPage(1);
    setMenu(null);
    alignBar();
  };

  const choosePageSize = (nextSize) => {
    setPageSize(nextSize);
    setPage(1);
    setMenu(null);
    alignBar();
  };

  const chooseView = (nextView) => {
    setView(nextView);
    alignBar();
  };

  const changePage = (nextPage) => {
    if (nextPage === currentPage) {
      return;
    }

    setPage(nextPage);
    goTo("/shop", ".shop-bar");
  };

  useEffect(() => {
    const media = window.matchMedia(STICKY_BAR_QUERY);

    const update = () => {
      const bar = barRef.current;
      const pagination = catalogRef.current?.querySelector(".pagination");

      if (!media.matches || !bar || !pagination) {
        setAway(false);
        return;
      }

      const limit = 64 + bar.getBoundingClientRect().height;
      const nextAway = pagination.getBoundingClientRect().bottom <= limit;
      setAway(nextAway);

      if (nextAway) {
        setMenu(null);
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    media.addEventListener("change", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      media.removeEventListener("change", update);
    };
  }, [pageCount, view, found.length]);

  return (
    <div className="shop-layout">
      <div
        className={`shop-overlay${menu ? " shop-overlay--open" : ""}`}
        onClick={closeMenu}
      />
      <ShopBar
        barRef={barRef}
        filters={FILTERS}
        filter={filter}
        sorts={SORTS}
        sort={sort}
        pageSizes={PAGE_SIZES}
        pageSize={pageSize}
        view={view}
        resultsLabel={resultsLabel}
        menu={menu}
        away={away}
        onToggleMenu={toggleMenu}
        onFilter={chooseFilter}
        onSort={chooseSort}
        onPageSize={choosePageSize}
        onView={chooseView}
      />
      <section className="shop-catalog" aria-label="Shop" ref={catalogRef}>
        <ProductGrid products={visible} layout={view} />
        <Pagination page={currentPage} pages={pageCount} onChange={changePage} />
      </section>
    </div>
  );
}
