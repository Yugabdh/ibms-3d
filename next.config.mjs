/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.0.247"],
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  images: {
    loader: "custom",
    loaderFile: "./app/lib/cloudinary-loader.js",
  },
  experimental: {
    agentUpgrade: "security",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
