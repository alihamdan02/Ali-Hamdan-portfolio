import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  ...(process.env.STATIC_EXPORT ? { output: "export" as const, trailingSlash: true } : {}),
};

export default nextConfig;
