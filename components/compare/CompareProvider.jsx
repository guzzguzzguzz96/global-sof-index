"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { MAX_COMPARE, readStoredSlugs, sanitizeSlugs, writeStoredSlugs } from "@/lib/compare";

const CompareContext = createContext(null);

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) throw new Error("useCompare must be used inside <CompareProvider>");
  return context;
}

// Holds the comparison selection for the whole application. State is slugs
// only — full unit records are resolved at the page/component boundary so no
// dossier prose is carried in client state.
//
// `refs` is the identity-level unit index supplied by the server root layout
// (slug, code, name, country, iso2, continent, tier). It is what makes slug
// validation and dock chips possible without importing data/units.js into a
// client bundle.
export default function CompareProvider({ refs = [], children }) {
  const [slugs, setSlugs] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  const validSlugs = useMemo(() => new Set(refs.map((ref) => ref.slug)), [refs]);
  const refBySlug = useMemo(() => new Map(refs.map((ref) => [ref.slug, ref])), [refs]);

  // localStorage is read after mount only. The first client render must match
  // the server-rendered HTML exactly, so the selection starts empty and is
  // hydrated in an effect. Stored slugs are re-validated against the current
  // dataset, which silently drops any unit removed since the save.
  useEffect(() => {
    setSlugs(readStoredSlugs(validSlugs));
    setHydrated(true);
  }, [validSlugs]);

  // Persist only after hydration, otherwise the initial empty state would
  // immediately overwrite a stored selection.
  useEffect(() => {
    if (!hydrated) return;
    writeStoredSlugs(slugs);
  }, [hydrated, slugs]);

  const add = useCallback((slug) => {
    setSlugs((prev) => {
      if (!validSlugs.has(slug) || prev.includes(slug) || prev.length >= MAX_COMPARE) return prev;
      return [...prev, slug];
    });
  }, [validSlugs]);

  const remove = useCallback((slug) => {
    setSlugs((prev) => (prev.includes(slug) ? prev.filter((item) => item !== slug) : prev));
  }, []);

  const toggle = useCallback((slug) => {
    setSlugs((prev) => {
      if (prev.includes(slug)) return prev.filter((item) => item !== slug);
      if (!validSlugs.has(slug) || prev.length >= MAX_COMPARE) return prev;
      return [...prev, slug];
    });
  }, [validSlugs]);

  const clear = useCallback(() => {
    setSlugs((prev) => (prev.length ? [] : prev));
  }, []);

  // Used when a shared /compare URL should take over the selection. Returning
  // the previous array when nothing actually changed keeps the identity stable,
  // so a synchronising effect cannot drive an update loop.
  const replace = useCallback((next) => {
    setSlugs((prev) => {
      const cleaned = sanitizeSlugs(next, validSlugs);
      const same = cleaned.length === prev.length && cleaned.every((slug, i) => slug === prev[i]);
      return same ? prev : cleaned;
    });
  }, [validSlugs]);

  const value = useMemo(() => ({
    slugs,
    hydrated,
    count: slugs.length,
    max: MAX_COMPARE,
    isFull: slugs.length >= MAX_COMPARE,
    refBySlug,
    isSelected: (slug) => slugs.includes(slug),
    add,
    remove,
    toggle,
    clear,
    replace,
  }), [slugs, hydrated, refBySlug, add, remove, toggle, clear, replace]);

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}
