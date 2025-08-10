import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // não falha o build por erros de ESLint
  },
};

export default nextConfig;
