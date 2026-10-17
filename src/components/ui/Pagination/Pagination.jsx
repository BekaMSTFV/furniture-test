import "./Pagination.scss";

export default function Pagination({ page = 1, pages = 1, onChange }) {
  const items = Array.from({ length: pages }, (_, index) => index + 1);

  const showPrev = page > 1;
  const showNext = page < pages;

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        type="button"
        className={`pagination__item pagination__item--prev${showPrev ? "" : " pagination__item--hidden"}`}
        aria-hidden={showPrev ? undefined : true}
        tabIndex={showPrev ? undefined : -1}
        onClick={() => showPrev && onChange?.(page - 1)}
      >
        Prev
      </button>
      <div className="pagination__items">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            className={`pagination__item${item === page ? " pagination__item--active" : ""}`}
            aria-current={item === page ? "page" : undefined}
            onClick={() => onChange?.(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <button
        type="button"
        className={`pagination__item pagination__item--next${showNext ? "" : " pagination__item--hidden"}`}
        aria-hidden={showNext ? undefined : true}
        tabIndex={showNext ? undefined : -1}
        onClick={() => showNext && onChange?.(page + 1)}
      >
        Next
      </button>
    </nav>
  );
}
