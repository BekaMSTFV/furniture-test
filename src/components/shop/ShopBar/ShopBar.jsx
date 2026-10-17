import Icon from "../../ui/Icon/Icon.jsx";
import "./ShopBar.scss";

function ShopMenu({ id, open, options, value, onSelect }) {
  return (
    <ul
      className={`shop-bar__menu${open ? " shop-bar__menu--open" : ""}`}
      id={id}
      role="listbox"
      aria-hidden={open ? undefined : true}
      inert={open ? undefined : true}
    >
      {options.map((option) => (
        <li key={option.id}>
          <button
            className={`shop-bar__option${option.id === value ? " shop-bar__option--active" : ""}`}
            type="button"
            role="option"
            aria-selected={option.id === value}
            onClick={() => onSelect(option.id)}
          >
            {option.label}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default function ShopBar({
  barRef,
  filters,
  filter,
  sorts,
  sort,
  pageSizes,
  pageSize,
  view,
  resultsLabel,
  menu,
  onToggleMenu,
  onFilter,
  onSort,
  onPageSize,
  onView,
  away = false,
}) {
  const filterOpen = menu === "filter";
  const sizeOpen = menu === "size";
  const sortOpen = menu === "sort";
  const sortLabel = sorts.find((item) => item.id === sort)?.label ?? "Default";
  const pageSizeLabel = pageSizes.find((item) => item.id === pageSize)?.label ?? "16";
  const className = ["shop-bar", menu ? "shop-bar--menu" : "", away ? "shop-bar--away" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className} ref={barRef} inert={away ? true : undefined}>
      <div className="shop-bar__content">
        <div className="shop-bar__side">
          <div className={`shop-bar__control${filterOpen ? " shop-bar__control--open" : ""}`}>
            <button
              className="shop-bar__filter"
              type="button"
              aria-expanded={filterOpen}
              aria-controls="shop-filter-menu"
              onClick={() => onToggleMenu("filter")}
            >
              <Icon name="filter" size={20} />
              <span>Filter</span>
            </button>
            <ShopMenu
              id="shop-filter-menu"
              open={filterOpen}
              options={filters}
              value={filter}
              onSelect={onFilter}
            />
          </div>
          <div className="shop-bar__views">
            <button
              className={`shop-bar__view${view === "grid" ? " shop-bar__view--active" : ""}`}
              type="button"
              aria-label="Grid view"
              aria-pressed={view === "grid"}
              onClick={() => onView("grid")}
            >
              <Icon name="grid" size={20} />
            </button>
            <button
              className={`shop-bar__view${view === "list" ? " shop-bar__view--active" : ""}`}
              type="button"
              aria-label="List view"
              aria-pressed={view === "list"}
              onClick={() => onView("list")}
            >
              <Icon name="list" size={21} />
            </button>
          </div>
          <span className="shop-bar__divider" aria-hidden="true" />
          <p className="shop-bar__results">{resultsLabel}</p>
        </div>
        <div className="shop-bar__side shop-bar__side--end">
          <span className="shop-bar__label" id="shop-page-size-label">
            Show
          </span>
          <div className={`shop-bar__control shop-bar__control--count${sizeOpen ? " shop-bar__control--open" : ""}`}>
            <button
              className="shop-bar__count"
              type="button"
              aria-expanded={sizeOpen}
              aria-controls="shop-size-menu"
              aria-labelledby="shop-page-size-label"
              onClick={() => onToggleMenu("size")}
            >
              {pageSizeLabel}
            </button>
            <ShopMenu
              id="shop-size-menu"
              open={sizeOpen}
              options={pageSizes}
              value={pageSize}
              onSelect={onPageSize}
            />
          </div>
          <span className="shop-bar__label shop-bar__label--sort">Sort by</span>
          <div
            className={`shop-bar__control shop-bar__control--sort${sortOpen ? " shop-bar__control--open" : ""}`}
          >
            <button
              className="shop-bar__sort"
              type="button"
              aria-expanded={sortOpen}
              aria-controls="shop-sort-menu"
              onClick={() => onToggleMenu("sort")}
            >
              {sortLabel}
            </button>
            <ShopMenu
              id="shop-sort-menu"
              open={sortOpen}
              options={sorts}
              value={sort}
              onSelect={onSort}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
