/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "darkturquoise-koala-648403.hostingersite.com",
        pathname: "/**",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/legacy-services",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/old-contact",
        destination: "/contact",
        permanent: false,
      },
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;