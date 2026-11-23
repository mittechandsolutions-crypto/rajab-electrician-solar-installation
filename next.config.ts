import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentUpgrade: "security",
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
