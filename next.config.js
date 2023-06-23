/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {},
  experimental: {
    instrumentationHook: true,
    serverActions: true,
  },
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      bufferutil: 'commonjs bufferutil',
    });
    return config;
  },
};

module.exports = nextConfig;
