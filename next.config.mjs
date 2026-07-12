/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Cover imagery is served from Wikimedia Commons redirect URLs, which
    // resolve to the upload.wikimedia.org CDN. Only these specific hosts are
    // allowed — no unrestricted wildcard hostname.
    remotePatterns: [
      { protocol: "https", hostname: "commons.wikimedia.org", pathname: "/**" },
      { protocol: "https", hostname: "upload.wikimedia.org", pathname: "/**" },
    ],
  },
};

export default nextConfig;
