/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["mongoose"],
  // standalone output → small production Docker image (Coolify / Docker)
  output: "standalone"
};

export default nextConfig;
