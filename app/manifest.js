import { siteConfig } from "@/lib/siteConfig";

export default function manifest() {
  return {
    name: siteConfig.name,
    short_name: "SOF Index",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    // Existing brand colors (globals.css: --bg / --green).
    background_color: "#05080a",
    theme_color: "#9af560",
    lang: siteConfig.language,
    icons: [
      {
        // Served by the App Router icon file convention (app/icon.png, 512x512).
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
