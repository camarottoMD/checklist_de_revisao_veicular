import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Libera o acesso ao servidor de desenvolvimento pelo celular na rede local
  allowedDevOrigins: ["192.168.*.*"],
  cacheComponents: true,
  partialPrefetching: true,
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
