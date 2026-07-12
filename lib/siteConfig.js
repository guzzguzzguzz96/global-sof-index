// Single source of truth for site identity. Import from here rather than
// hardcoding the production domain across metadata, sitemap, robots, and JSON-LD.
export const siteConfig = {
  name: "Global SOF Index",
  shortName: "Global SOF Index",
  url: "https://www.globalsofindex.com",
  description:
    "Open-source special operations intelligence archive covering elite units, capabilities, history, equipment, uniforms, and editorial assessments.",
  email: "globalsofindex@gmail.com",
  locale: "en_US",
  language: "en",
  unitCount: 60,
};

export default siteConfig;
