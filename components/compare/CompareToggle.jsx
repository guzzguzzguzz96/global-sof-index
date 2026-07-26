"use client";

import { Check, Scale } from "lucide-react";
import { useCompare } from "./CompareProvider";
import { MAX_COMPARE } from "@/lib/compare";

// Compact selection control used on unit cards and once on the unit detail
// page. It is always rendered as a sibling of the card link — never nested
// inside it — so the markup stays free of nested interactive elements.
export default function CompareToggle({ slug, code, name, variant = "card" }) {
  const { isSelected, toggle, isFull, hydrated } = useCompare();
  const selected = isSelected(slug);
  const atLimit = !selected && isFull;
  const label = name ? `${code} — ${name}` : code;

  function handleClick(event) {
    // The control sits visually on top of a card-sized link. Stopping the event
    // here keeps a compare click from ever reaching card navigation, including
    // in any future layout where the button is moved inside the link.
    event.preventDefault();
    event.stopPropagation();
    if (atLimit) return;
    toggle(slug);
  }

  const accessibleLabel = selected
    ? `Remove ${label} from comparison`
    : atLimit
    ? `Cannot add ${label}, comparison already holds ${MAX_COMPARE} units`
    : `Add ${label} to comparison`;

  return (
    <button
      type="button"
      className={`compare-toggle compare-toggle--${variant}${selected ? " is-selected" : ""}`}
      onClick={handleClick}
      aria-pressed={selected}
      aria-label={accessibleLabel}
      title={atLimit ? `Comparison is full — ${MAX_COMPARE} units maximum` : undefined}
      // Disabled until hydration so a click cannot register against an empty
      // pre-hydration selection and clobber what is stored.
      disabled={!hydrated || atLimit}
    >
      {selected
        ? <Check size={13} strokeWidth={2.6} aria-hidden="true" />
        : <Scale size={13} strokeWidth={2.2} aria-hidden="true" />}
      <span className="compare-toggle__text">{selected ? "Selected" : "Compare"}</span>
    </button>
  );
}
