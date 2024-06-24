/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
  // ビルドしてもソースマップが表示されるようにする
  productionBrowserSourceMaps: true,
};

export default nextConfig;
