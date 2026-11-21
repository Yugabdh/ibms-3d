// Served at /manifest.webmanifest; Next.js adds the <link rel="manifest"> tag.
// Icons generated with favicon.io; the PNGs live in public/.
export default function manifest() {
  return {
    name: "IBMS3D",
    short_name: "IBMS3D",
    description: "3D BMS graphics and live 3D monitoring for system integrators and OEMs.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b1a1d",
    theme_color: "#0b1a1d",
    icons: [
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
