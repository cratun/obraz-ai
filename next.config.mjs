import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'replicate.com',
      },
      {
        protocol: 'https',
        hostname: 'replicate.delivery',
      },
      {
        protocol: 'https',
        hostname: 'obraz-ai-bucket.s3.eu-central-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'obraz-ai-bucket-dev.s3.eu-central-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'public-portrait-templates.s3.eu-central-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'obrazai-portrait-images-dev.s3.eu-central-1.amazonaws.com',
      },
    ],
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
