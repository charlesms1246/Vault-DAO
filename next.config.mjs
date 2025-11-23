/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Fix for wagmi/viem
    config.resolve.fallback = { 
      ...config.resolve.fallback,
      fs: false, 
      net: false, 
      tls: false,
      encoding: false,
    };
    
    // Ignore React Native modules
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    
    // Fix for @metamask/sdk React Native dependencies
    config.resolve.alias = {
      ...config.resolve.alias,
      '@react-native-async-storage/async-storage': false,
      'react-native': false,
    };

    // Suppress the warnings
    config.ignoreWarnings = [
      { module: /node_modules\/@metamask\/sdk/ },
      /Critical dependency: the request of a dependency is an expression/,
    ];
    
    return config;
  },
};

export default nextConfig;