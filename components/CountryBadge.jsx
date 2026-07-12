// Country presentation using real SVG flags (flag-icons):
//   [flag] Country Name · Continent [ISO2]
// The flag is decorative; the accessible label carries the country (and continent).
export default function CountryBadge({ country, size = "md", showContinent = false }) {
  if (!country) return null;
  const { name, iso2, continent } = country;
  const code = (iso2 || "").toLowerCase();
  const label = showContinent && continent ? `${name}, ${continent}` : name;

  return (
    <span className={`country-badge country-badge--${size}`} title={label} aria-label={label}>
      {code ? (
        <span className={`country-badge__flag fi fi-${code}`} aria-hidden="true" />
      ) : (
        <span className="country-badge__flag country-badge__flag--empty" aria-hidden="true" />
      )}
      <span className="country-badge__name">{name}</span>
      {showContinent && continent ? (
        <>
          <span className="country-badge__sep" aria-hidden="true">·</span>
          <span className="country-badge__continent">{continent}</span>
        </>
      ) : null}
      {iso2 ? <span className="country-badge__iso" aria-hidden="true">{iso2}</span> : null}
    </span>
  );
}
