import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { siteUrl } from "./config/site";

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

export const metadata = {
  // Resolves relative metadata URLs (Open Graph images, canonicals) to absolute ones.
  metadataBase: new URL(siteUrl),
  title: "IBMS3D | 3D BMS graphics for system integrators and OEMs",
  description:
    "Send us your AutoCAD drawings. We return 3D floor plans, equipment and critical-room graphics, layered, named to your points list and ready to bind in your BMS.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1a1d",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full scroll-smooth antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col font-body">{children}</body>
    </html>
  );
}
