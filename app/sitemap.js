import { siteUrl } from "./config/site";
import { destinationPages } from "./config/navigation";

// Served at /sitemap.xml. Lists only public, indexable pages:
// - /portfolio and /portfolio/* are left out: proxy.js redirects visitors
//   without the access cookie (including crawlers) to the email gate.
// - /portfolio-access is noindex.
// New pages added to destinationPages in navigation.js appear here automatically.
//
// lastModified, changeFrequency and priority are left out on purpose: Google
// ignores changefreq and priority, and only trusts lastmod when it is accurate.
// A build-time date on every URL would not be.
export default function sitemap() {
  const paths = Object.keys(destinationPages).filter((path) => path !== "portfolio" && !path.startsWith("portfolio/"));

  return ["", ...paths].map((path) => ({ url: `${siteUrl}/${path}` }));
}
