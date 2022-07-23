/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // if (process.env.NODE_ENV !== "production") {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
    // }
  },
  reactStrictMode: false,
  swcMinify: true,
};

module.exports = nextConfig;
