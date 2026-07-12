import { ChevronLeft, ChevronRight } from "lucide-react";

function pageList(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [1];
  if (current > 3) pages.push("start-ellipsis");
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (current < total - 2) pages.push("end-ellipsis");
  pages.push(total);
  return pages;
}

export default function Pagination({ page, totalPages, totalItems, pageSize, onChange }) {
  if (totalPages <= 1) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);
  const pages = pageList(page, totalPages);

  return (
    <nav className="pagination" aria-label="Pagination">
      <p className="pagination__range">
        Showing <strong>{from}–{to}</strong> of <strong>{totalItems}</strong>
      </p>

      <div className="pagination__controls">
        <button
          type="button"
          className="pagination__btn pagination__nav"
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={15} aria-hidden="true" />
          <span className="pagination__nav-text">Previous</span>
        </button>

        <ul className="pagination__pages">
          {pages.map((p) =>
            typeof p === "string" ? (
              <li key={p} className="pagination__ellipsis" aria-hidden="true">…</li>
            ) : (
              <li key={p}>
                <button
                  type="button"
                  className={`pagination__btn pagination__page${p === page ? " is-active" : ""}`}
                  onClick={() => onChange(p)}
                  aria-label={`Page ${p}`}
                  aria-current={p === page ? "page" : undefined}
                >
                  {p}
                </button>
              </li>
            )
          )}
        </ul>

        <span className="pagination__mobile" aria-hidden="true">
          Page {page} / {totalPages}
        </span>

        <button
          type="button"
          className="pagination__btn pagination__nav"
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
        >
          <span className="pagination__nav-text">Next</span>
          <ChevronRight size={15} aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}
