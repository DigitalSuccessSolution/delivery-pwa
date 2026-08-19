import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @ts-ignore
   allowedDevOrigins: ["192.168.29.250"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
