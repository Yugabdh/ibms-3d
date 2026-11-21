// Shared SEO helpers: page metadata (title, description, canonical, Open Graph,
// Twitter card) and JSON-LD. Use pageMetadata() in every page's `metadata` /
// generateMetadata so each page gets a full, consistent set of tags. Next.js
// replaces (does not merge) a parent's openGraph/twitter objects, which is why
// every page builds the complete set here.

import { siteUrl } from "../config/site";
import { images } from "../config/images";

export const siteName = "IBMS3D";
export const siteTitle = "IBMS3D | 3D BMS graphics for system integrators and OEMs";
export const siteDescription =
  "Send us your AutoCAD drawings. We return 3D floor plans, equipment and critical-room graphics, layered, named to your points list and ready to bind in your BMS.";
export const siteEmail = "sales@ibms3d.com";

// The site copy is written in British English.
const locale = "en_GB";

const CLOUDINARY_BASE = "https://res.cloudinary.com/tnmhyk4e/image/upload/";
const defaultImage = images.buildingContext;

// Social share image at the recommended 1200×630, cropped by Cloudinary.
// Local /public images are passed through (metadataBase makes them absolute).
function shareImage(image = defaultImage) {
  const url = image.src.startsWith("/")
    ? image.src
    : `${CLOUDINARY_BASE}c_fill,w_1200,h_630,f_jpg,q_auto/${image.src}`;

  return { url, width: 1200, height: 630, alt: image.alt };
}

/**
 * @param {object} options
 * @param {string} options.title        Page title without the brand; " | IBMS3D" is appended.
 * @param {boolean} [options.absolute]  Use the title as-is (it already names the brand).
 * @param {string} options.description  Meta description (aim for 120–160 characters).
 * @param {string} [options.path]       Path for the canonical URL and og:url, e.g. "/about".
 *                                      Leave it out for site-wide defaults (root layout), so
 *                                      pages that don't set their own don't inherit a wrong canonical.
 * @param {{src: string, alt: string}} [options.image] Entry from app/config/images.js.
 */
export function pageMetadata({ title, absolute = false, description, path, image }) {
  // Headline-style titles end in a full stop; drop it in the <title>.
  const cleanTitle = title.replace(/\.$/, "");
  const fullTitle = absolute ? cleanTitle : `${cleanTitle} | ${siteName}`;
  const ogImage = shareImage(image ?? defaultImage);

  return {
    title: { absolute: fullTitle },
    description,
    ...(path && { alternates: { canonical: path } }),
    openGraph: {
      type: "website",
      siteName,
      locale,
      ...(path && { url: path }),
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

// Organization + WebSite structured data, rendered once in the root layout.
export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/android-chrome-512x512.png`,
      email: siteEmail,
      description: siteDescription,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: siteEmail,
        url: `${siteUrl}/contact`,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: siteName,
      url: siteUrl,
      inLanguage: "en-GB",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

// Serialises JSON-LD for a <script> tag, escaping "<" so the payload can't close the tag.
export function jsonLdScript(data) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
