// Canonical origin for absolute URLs (sitemap, robots, metadataBase).
// Set NEXT_PUBLIC_SITE_URL to override it, e.g. for a staging domain. No trailing slash.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ibms3d.com").replace(/\/+$/, "");
