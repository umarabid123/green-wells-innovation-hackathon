/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // ignoreBuildErrors: true,
  },
  webpack: (config, { dev, isServer }) => {
    // Fix for chunk loading issues
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 1,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
          }
        }
      };
    }
    
    // Add fallback for network errors
    config.output = {
      ...config.output,
      chunkLoadTimeout: 30000, // 30 seconds timeout
    };
    
    return config;
  },
  // Add experimental features to improve stability
  experimental: {
    optimizeCss: false,
  },
}

module.exports = nextConfig
