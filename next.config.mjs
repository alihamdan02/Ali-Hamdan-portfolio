const isProd = process.env.NODE_ENV === "production";

const basePath = "";

const nextConfig = {
  basePath,
  // Only apply assetPrefix if basePath is a non-empty string, avoiding validation warnings
  ...(basePath ? { assetPrefix: basePath } : {}),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;