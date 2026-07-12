import { ImageResponse } from "next/og";

// Shared brand Open Graph / Twitter image (1200x630), rendered with next/og
// (built into Next — no external dependency). Dark tactical archive look with a
// green accent, brand mark, and title. No unit photos, no affiliation claims.
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";
export const ogAlt =
  "Global SOF Index — Open-source Special Operations Intelligence Archive";

const GREEN = "#9af560";
const BG = "#05080a";

function CornerBracket({ pos }) {
  const base = { position: "absolute", width: 46, height: 46 };
  const styles = {
    tl: { top: 40, left: 40, borderTop: `2px solid ${GREEN}`, borderLeft: `2px solid ${GREEN}` },
    tr: { top: 40, right: 40, borderTop: `2px solid ${GREEN}`, borderRight: `2px solid ${GREEN}` },
    bl: { bottom: 40, left: 40, borderBottom: `2px solid ${GREEN}`, borderLeft: `2px solid ${GREEN}` },
    br: { bottom: 40, right: 40, borderBottom: `2px solid ${GREEN}`, borderRight: `2px solid ${GREEN}` },
  };
  return <div style={{ ...base, ...styles[pos], opacity: 0.5 }} />;
}

export function renderBrandOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          position: "relative",
          color: "#edf5f8",
          fontFamily: "sans-serif",
          background: `radial-gradient(900px 520px at 82% 16%, rgba(154,245,96,0.16), transparent 62%), ${BG}`,
        }}
      >
        <CornerBracket pos="tl" />
        <CornerBracket pos="tr" />
        <CornerBracket pos="bl" />
        <CornerBracket pos="br" />

        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 92,
              height: 92,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 22,
              border: `2px solid rgba(154,245,96,0.5)`,
              background: "rgba(154,245,96,0.08)",
              color: GREEN,
              fontSize: 42,
              fontWeight: 800,
            }}
          >
            GI
          </div>
          <div style={{ display: "flex", letterSpacing: 6, fontSize: 24, color: GREEN, fontWeight: 700 }}>
            OPEN-SOURCE INTELLIGENCE ARCHIVE
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 800, letterSpacing: -3, lineHeight: 1 }}>
            GLOBAL SOF INDEX
          </div>
          <div style={{ display: "flex", marginTop: 22, fontSize: 34, color: "#c2cdd5" }}>
            Open-source Special Operations Intelligence Archive
          </div>
          <div style={{ display: "flex", marginTop: 28, width: 132, height: 6, background: GREEN, borderRadius: 3 }} />
          <div style={{ display: "flex", marginTop: 24, fontSize: 22, letterSpacing: 3, color: "#74838e" }}>
            60 UNITS · 6 CONTINENTS · EDITORIAL ANALYTICAL MODEL
          </div>
        </div>
      </div>
    ),
    { ...ogSize }
  );
}
