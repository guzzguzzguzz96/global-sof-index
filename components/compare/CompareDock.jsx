"use client";

import { useEffect } from "react";
import Link from "next/link";
import { GitCompareArrows, Trash2, X } from "lucide-react";
import { useCompare } from "./CompareProvider";
import { buildCompareHref, MAX_COMPARE, MIN_COMPARE } from "@/lib/compare";

// Fixed selection dock. Mounted once at application level so it survives
// navigation between the explorer, unit detail pages and the compare page.
export default function CompareDock() {
  const { slugs, hydrated, refBySlug, remove, clear, count } = useCompare();
  const open = hydrated && count > 0;

  // Reserves bottom space on the document so the fixed dock never covers the
  // last row of content. Removed again when the dock hides or unmounts.
  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const { body } = document;
    if (open) body.setAttribute("data-compare-dock", "open");
    else body.removeAttribute("data-compare-dock");
    return () => body.removeAttribute("data-compare-dock");
  }, [open]);

  if (!open) return null;

  const ready = count >= MIN_COMPARE;
  const items = slugs.map((slug) => refBySlug.get(slug)).filter(Boolean);

  return (
    <aside className="compare-dock" aria-label="Unit comparison selection">
      <div className="compare-dock__inner">
        <div className="compare-dock__lead">
          <span className="compare-dock__kicker">COMPARE</span>
          <strong className="compare-dock__count">
            <span aria-hidden="true">{count}/{MAX_COMPARE}</span>
            <span className="sr-only" aria-live="polite">
              {count} of {MAX_COMPARE} units selected for comparison
            </span>
          </strong>
        </div>

        <ul className="compare-dock__chips">
          {items.map((item) => (
            <li key={item.slug} className="compare-chip">
              {item.iso2
                ? <span className={`compare-chip__flag fi fi-${item.iso2.toLowerCase()}`} aria-hidden="true" />
                : null}
              <span className="compare-chip__code">{item.code}</span>
              <span className="compare-chip__country">{item.country}</span>
              <button
                type="button"
                className="compare-chip__remove"
                onClick={() => remove(item.slug)}
                aria-label={`Remove ${item.code} — ${item.name} from comparison`}
              >
                <X size={12} strokeWidth={2.6} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>

        <div className="compare-dock__actions">
          <button type="button" className="compare-dock__clear" onClick={clear}>
            <Trash2 size={13} strokeWidth={2.1} aria-hidden="true" />
            <span>Clear</span>
          </button>

          {/* A link once the minimum is met, a disabled button before that —
              never a disabled anchor, which is not a real interactive state. */}
          {ready ? (
            <Link href={buildCompareHref(slugs)} className="compare-dock__go">
              <GitCompareArrows size={14} strokeWidth={2.2} aria-hidden="true" />
              <span>Compare Units</span>
            </Link>
          ) : (
            <button type="button" className="compare-dock__go" disabled aria-describedby="compare-dock-hint">
              <GitCompareArrows size={14} strokeWidth={2.2} aria-hidden="true" />
              <span>Compare Units</span>
            </button>
          )}
        </div>
      </div>

      {!ready ? (
        <p className="compare-dock__hint" id="compare-dock-hint">
          Select at least {MIN_COMPARE} units to begin a comparison.
        </p>
      ) : null}
    </aside>
  );
}
