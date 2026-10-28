/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // www.pizhama.kz duplicates the main mirror; send it there permanently
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.pizhama.kz" }],
        destination: "https://pizhama.kz/:path*",
        statusCode: 301,
      },
    ]
  },
}

export default nextConfig
