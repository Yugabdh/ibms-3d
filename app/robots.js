import { siteUrl } from "./config/site";

// Served at /robots.txt. Everything stays crawlable: pages that must not be
// indexed (e.g. /portfolio-access) use a noindex robots meta tag instead, which
// crawlers can only see if they are allowed to fetch the page. Don't block
// /_next/ either; crawlers need its CSS and JS to render pages.
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
