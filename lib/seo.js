import { siteConfig } from "./siteConfig";

// Default brand social images (resolved against metadataBase). Set explicitly
// because the file-based opengraph-image does not cascade to descendant routes
// once they define their own openGraph object.
export const DEFAULT_OG_IMAGE = { url: "/opengraph-image", alt: siteConfig.name };
export const DEFAULT_TWITTER_IMAGE = { url: "/twitter-image", alt: siteConfig.name };

// Builds a consistent Next.js metadata object for a static page (canonical +
// Open Graph + Twitter), using the central site configuration.
export function pageMetadata({ title, description, path, type = "website" }) {
  const url = `${siteConfig.url}${path}`;
  const ogTitle = `${title} | ${siteConfig.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: siteConfig.name,
      title: ogTitle,
      description,
      url,
      locale: siteConfig.locale,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [DEFAULT_TWITTER_IMAGE],
    },
  };
}
