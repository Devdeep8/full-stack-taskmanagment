/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "daracasino.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.daracasino.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "wbgame.daracasino.com", // Specific subdomain (optional if using wildcard)
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
