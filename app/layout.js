import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { siteUrl } from "./config/site";
import { jsonLdScript, pageMetadata, siteDescription, siteJsonLd, siteName, siteTitle } from "./lib/seo";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

// Site-wide defaults. Each page overrides title, description, canonical and
// social tags through pageMetadata() in app/lib/seo.js.
export const metadata = {
  // Resolves relative metadata URLs (Open Graph images, canonicals) to absolute ones.
  metadataBase: new URL(siteUrl),
  ...pageMetadata({ title: siteTitle, absolute: true, description: siteDescription }),
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // Stop iOS turning numbers such as "441 live points" into phone links.
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1a1d",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-GB"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full scroll-smooth antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col font-body">
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(siteJsonLd)} />
        {children}
      </body>
    </html>
  );
}
