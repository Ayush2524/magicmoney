/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        // The wallet is a separately-deployed Vite app (Vercel "multi-zone"
        // pattern), proxied here so it appears under this domain at /wallet.
        source: "/wallet/:path*",
        destination: "https://wallet-hazel-nine.vercel.app/:path*",
      },
    ];
  },
};
export default nextConfig;
