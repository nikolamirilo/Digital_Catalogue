import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.logotypes101.com',
      },
      {
        protocol: 'https',
        hostname: 'st.depositphotos.com',
      },
    ],
  }
};

export default nextConfig;
