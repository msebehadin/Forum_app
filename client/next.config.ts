import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Try placing it at the top level
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;