import fs from 'fs';
import path from 'path';

function loadEnvLocal() {
  try {
    const envPath = path.join(process.cwd(), '.env.local');
    if (!fs.existsSync(envPath)) return;

    const content = fs.readFileSync(envPath, 'utf8');
    for (const rawLine of content.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;
      const idx = line.indexOf('=');
      if (idx <= 0) continue;
      const key = line.slice(0, idx).trim();
      const value = line.slice(idx + 1).trim();
      if (!key) continue;
      if (process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  } catch {
    return;
  }
}

loadEnvLocal();

/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  typescript: {
    ignoreBuildErrors: true,
  },

  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-icons',
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-hover-card',
      '@radix-ui/react-label',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-progress',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slider',
      '@radix-ui/react-slot',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
      '@radix-ui/react-toggle',
      '@radix-ui/react-tooltip',
      'framer-motion',
      '@tanstack/react-query',
      '@rainersoft/ui',
      'class-variance-authority',
      'clsx',
      'tailwind-merge'
    ],
    scrollRestoration: true,
    serverActions: { bodySizeLimit: '2mb' },
  },

  allowedDevOrigins: ['192.168.56.1'],
  transpilePackages: ['@rainersoft/design-tokens', '@rainersoft/ui'],

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'rainersoft.com.br', pathname: '/**' },
      { protocol: 'https', hostname: 'rainer-portfolio.vercel.app', pathname: '/**' },
      { protocol: 'https', hostname: 'rainer-portfolio-i4pf4a37z-rainerteixeiras-projects.vercel.app', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'via.placeholder.com', pathname: '/**' },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  reactStrictMode: false,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  cacheComponents: true,
  generateBuildId: async () => `build-${Date.now()}`,

  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  modularizeImports: {
    '@heroicons/react': { transform: '@heroicons/react/24/outline/{{member}}' },
    'lucide-react': { transform: 'lucide-react/dist/esm/icons/{{member}}' },
  },

  async headers() {
    return [
      {
        source: '/_vercel/insights/script.js',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' }],
      },
      {
        source: '/_vercel/speed-insights/script.js',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' }],
      },
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|webp|ico|ttf|otf|woff|woff2|mp4|webm|json)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },

  async redirects() {
    return [{ source: '/home', destination: '/', permanent: true }];
  },

  async rewrites() {
    if (process.env.NODE_ENV !== 'development') return [];
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return [];
    return [{ source: '/api/:path*', destination: `${apiUrl}/:path*` }];
  },

  webpack: (config, { isServer, dev }) => {
    config.resolve.symlinks = true;
    
    // Add alias configuration for @ paths
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(process.cwd()),
      '@/components': path.resolve(process.cwd(), 'components'),
      '@/lib': path.resolve(process.cwd(), 'lib'),
      '@/hooks': path.resolve(process.cwd(), 'hooks'),
      '@/constants': path.resolve(process.cwd(), 'constants'),
      '@/app': path.resolve(process.cwd(), 'app'),
      '@/public': path.resolve(process.cwd(), 'public'),
    };
    
    if (!isServer) {
      config.resolve.fallback = { fs: false, net: false, tls: false };
    }

    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
      '.jsx': ['.jsx', '.tsx'],
    };

    if (!dev) {
      config.experiments = {
        ...config.experiments,
        asyncWebAssembly: true,
        layers: true,
      };
    }

    if (!config.module.rules) {
      config.module.rules = [];
    }

    config.module.rules.push({
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      include: [/node_modules\/@vercel\/analytics/, /node_modules\/@vercel\/speed-insights/],
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['next/babel'],
            cacheDirectory: true,
          },
        },
      ],
    });

    return config;
  },
};

nextConfig.turbopack = {};

export default nextConfig;
