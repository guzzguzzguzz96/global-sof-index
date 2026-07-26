"use client";

import { useEffect, useRef } from "react";
import { useCompare } from "./CompareProvider";

// Adopts the slugs from a shared /compare URL into the live selection, so the
// dock reflects what the visitor is actually looking at.
//
// Synchronisation is one-time per normalized URL signature, enforced by an
// explicit ref rather than by dependency identity alone. That matters because
// `replace` is derived from the `refs` prop, which crosses the RSC boundary: if
// that prop is ever re-serialized with a new identity, the effect would re-run
// and silently restore slugs the visitor had just removed or cleared. The ref
// makes "apply each URL once" independent of any dependency's stability.
//
// Nothing here navigates, so no redirect loop is possible; and an empty
// signature is ignored, so opening /compare with no parameters never wipes an
// existing selection.
export default function CompareSync({ slugs }) {
  const { replace, hydrated } = useCompare();
  const key = (Array.isArray(slugs) ? slugs : []).join(",");
  const appliedKey = useRef(null);

  useEffect(() => {
    // Checked before the signature is recorded, so a pre-hydration pass cannot
    // consume the URL and leave it unapplied.
    if (!hydrated || !key) return;
    if (appliedKey.current === key) return;
    appliedKey.current = key;
    replace(key.split(","));
  }, [hydrated, key, replace]);

  return null;
}
