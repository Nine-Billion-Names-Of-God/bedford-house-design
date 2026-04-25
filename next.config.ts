import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        destination: "/garden/front/:path*",
        permanent: true,
        source: "/front/:path*",
      },
      {
        destination: "/garden/back/:path*",
        permanent: true,
        source: "/back/:path*",
      },
      {
        destination: "/garden/flower-bed/:path*",
        permanent: true,
        source: "/flower-bed/:path*",
      },
    ];
  },
};

export default nextConfig;
