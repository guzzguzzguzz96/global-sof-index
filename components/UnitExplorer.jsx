"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Globe2, Shield, SlidersHorizontal, ArrowUpDown, RotateCcw, X } from "lucide-react";
import UnitCard from "./UnitCard";
import Pagination from "./Pagination";

const PAGE_SIZE = 12;
const TIER_RANK = { S: 0, A: 1, B: 2 };

const continents = [
  ["all", "ทุกทวีป"],
  ["North America", "อเมริกาเหนือ"],
  ["South America", "อเมริกาใต้"],
  ["Europe", "ยุโรป"],
  ["Asia", "เอเชีย"],
  ["Africa", "แอฟริกา"],
  ["Oceania", "โอเชียเนีย"],
];

const missions = ["all", "Counter Terror", "Maritime", "Recon", "Direct Action", "Hostage Rescue", "Jungle", "Mountain", "Urban"];

const sorts = [
  ["default", "ค่าเริ่มต้น"],
  ["selection", "Selection สูงสุด"],
  ["tier", "Tier (S→B)"],
  ["name", "ชื่อย่อ A→Z"],
];

export default function UnitExplorer({ units }) {
  const [search, setSearch] = useState("");
  const [continent, setContinent] = useState("all");
  const [tier, setTier] = useState("all");
  const [mission, setMission] = useState("all");
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);
  const sectionRef = useRef(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return units.filter((unit) => {
      const haystack = [unit.code, unit.name, unit.country, unit.iso2, unit.continent, unit.role, ...unit.tags]
        .join(" ")
        .toLowerCase();
      return (
        (!query || haystack.includes(query)) &&
        (continent === "all" || unit.continent === continent) &&
        (tier === "all" || unit.tier === tier) &&
        (mission === "all" || unit.tags.some((tag) => tag.includes(mission)) || unit.role.includes(mission))
      );
    });
  }, [units, search, continent, tier, mission]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === "selection") arr.sort((a, b) => b.scores.selection - a.scores.selection);
    else if (sort === "tier") arr.sort((a, b) => (TIER_RANK[a.tier] - TIER_RANK[b.tier]) || (b.scores.selection - a.scores.selection));
    else if (sort === "name") arr.sort((a, b) => a.code.localeCompare(b.code));
    return arr;
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Any filter/sort change returns to page 1 (covers the reset button too).
  useEffect(() => { setPage(1); }, [search, continent, tier, mission, sort]);

  function goToPage(next) {
    const clamped = Math.min(Math.max(1, next), totalPages);
    setPage(clamped);
    const el = sectionRef.current;
    if (el && typeof window !== "undefined") {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  }

  function reset() {
    setSearch("");
    setContinent("all");
    setTier("all");
    setMission("all");
    setSort("default");
  }

  const activeFilters = [];
  if (continent !== "all") activeFilters.push({ key: "continent", label: continent, clear: () => setContinent("all") });
  if (tier !== "all") activeFilters.push({ key: "tier", label: `${tier} Tier`, clear: () => setTier("all") });
  if (mission !== "all") activeFilters.push({ key: "mission", label: mission, clear: () => setMission("all") });
  if (search.trim()) activeFilters.push({ key: "search", label: `“${search.trim()}”`, clear: () => setSearch("") });

  return (
    <section className="database-section" id="database" ref={sectionRef}>
      <div className="section-heading">
        <div>
          <span className="section-kicker">GLOBAL ARCHIVE</span>
          <h2>UNIT DATABASE</h2>
          <p>ค้นหาหน่วยตามประเทศ ทวีป Tier หรือประเภทภารกิจ แล้วเปิด Intelligence Dossier รายหน่วย</p>
        </div>
        <span className="matched-count">{sorted.length} MATCHED</span>
      </div>

      <div className="filter-panel">
        <label className="search-field">
          <Search className="field-icon" size={16} aria-hidden="true" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="ค้นหาชื่อหน่วย ประเทศ ชื่อย่อ..."
            aria-label="ค้นหาหน่วย"
          />
        </label>

        <Filter value={continent} onChange={setContinent} label="CONTINENT" options={continents} Icon={Globe2} />
        <Filter value={tier} onChange={setTier} label="TIER" options={[["all", "ทุก Tier"], ["S", "S Tier"], ["A", "A Tier"], ["B", "B Tier"]]} Icon={Shield} />
        <Filter value={mission} onChange={setMission} label="MISSION" options={missions.map((item) => [item, item === "all" ? "ทุกภารกิจ" : item])} Icon={SlidersHorizontal} />
        <Filter value={sort} onChange={setSort} label="SORT" options={sorts} Icon={ArrowUpDown} />
        <button type="button" className="reset-button" onClick={reset}>
          <RotateCcw size={14} aria-hidden="true" /> RESET
        </button>
      </div>

      {activeFilters.length ? (
        <div className="active-filters" aria-label="Active filters">
          <span className="active-filters__label">Active filters:</span>
          {activeFilters.map((filter) => (
            <button
              type="button"
              key={filter.key}
              className="active-chip"
              onClick={filter.clear}
              aria-label={`Remove filter ${filter.label}`}
            >
              {filter.label} <X size={12} strokeWidth={2.4} aria-hidden="true" />
            </button>
          ))}
          <button type="button" className="active-filters__clear" onClick={reset}>Clear all</button>
        </div>
      ) : null}

      <div className="tier-legend">
        <span><i className="legend-s">S</i> World Class</span>
        <span><i className="legend-a">A</i> Regional Elite</span>
        <span><i className="legend-b">B</i> Specialized</span>
        <span className="legend-note">คะแนนเป็นโมเดลเชิงบรรณาธิการ ไม่ใช่การจัดอันดับทางการ</span>
      </div>

      <div className="unit-grid">
        {pageItems.length ? (
          pageItems.map((unit) => <UnitCard key={unit.id} unit={unit} />)
        ) : (
          <div className="empty-state"><strong>NO MATCHED UNITS</strong><span>ลองปรับคำค้นหาหรือตัวกรองอีกครั้ง</span></div>
        )}
      </div>

      <Pagination
        page={currentPage}
        totalPages={totalPages}
        totalItems={sorted.length}
        pageSize={PAGE_SIZE}
        onChange={goToPage}
      />
    </section>
  );
}

function Filter({ value, onChange, label, options, Icon }) {
  return (
    <label className="select-field">
      {Icon ? <Icon className="field-icon" size={15} aria-hidden="true" /> : null}
      <span className="field-body">
        <small>{label}</small>
        <select value={value} onChange={(event) => onChange(event.target.value)} aria-label={label}>
          {options.map(([optionValue, optionLabel]) => <option key={optionValue} value={optionValue}>{optionLabel}</option>)}
        </select>
      </span>
    </label>
  );
}
