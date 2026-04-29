/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "i.imgur.com" }],
  },
  transpilePackages: ["three"],
};

export default nextConfig;
