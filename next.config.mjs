/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["mongoose"],
  // standalone output → small production Docker image (Coolify / Docker)
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "image.p9x9.com" },
      { protocol: "https", hostname: "i.postimg.cc" },
      { protocol: "http", hostname: "image.p9x9.com" }
    ]
  }
};

export default nextConfig;
