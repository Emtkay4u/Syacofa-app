import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

// Initialize the PWA with a simpler configuration
const withPWA = withPWAInit({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
  // Temporarily removing complex caching to resolve the client-side error.
  // A basic cache will still be generated automatically.
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default withPWA(nextConfig);
