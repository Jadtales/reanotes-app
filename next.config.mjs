/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.gr-assets.com', 'images-na.ssl-images-amazon.com'],
  },

  async redirects() {
    return [
      {
        source: '/home',
        destination: '/home/all',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
