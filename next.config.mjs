/**
 * @file next.config.mjs
 * @description Configuração avançada do Next.js 16 para performance, segurança
 * e integração com Vercel. Define otimizações de bundle, manipulação de imports,
 * transpile de workspaces, configurações de imagens, headers de segurança,
 * redirecionamentos e fallback de Webpack.
 * 
 * @module next.config
 * @version 2.0.0
 * @author Rainer Teixeira
 * @since 1.0.0
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Opções experimentais do Next.js 16:
   * - optimizePackageImports: Reduz o bundle transferindo apenas ícones realmente usados.
   */
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
    // Performance otimizações
    scrollRestoration: true,
    serverActions: {
      bodySizeLimit: '2mb',
    },
    typedRoutes: true,
  },

  /**
   * Origens permitidas para desenvolvimento (resolve warning de CORS).
   * Permite acesso de outras interfaces de rede durante desenvolvimento.
   */
  allowedDevOrigins: ['192.168.56.1'],

  /**
   * Lista de workspaces a serem transpilados (monorepo support).
   */
  transpilePackages: ['@rainersoft/design-tokens', '@rainersoft/ui'],

  /**
   * Configurações avançadas de imagens (domínios autorizados, formatos, tamanhos).
   */
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'rainersoft.com.br', pathname: '/**' },
      {
        protocol: 'https',
        hostname: 'rainer-portfolio.vercel.app',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname:
          'rainer-portfolio-i4pf4a37z-rainerteixeiras-projects.vercel.app',
        pathname: '/**',
      },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'via.placeholder.com', pathname: '/**' },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  /**
   * Opções do compilador Next.js.
   * - removeConsole: Remove todos os consoles na build production.
   */
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  /**
   * Configurações de performance
   */
  reactStrictMode: false, // Desativa re-renderização dupla em dev (economiza recursos)
  poweredByHeader: false, // Remove header X-Powered-By (segurança e tamanho)
  compress: true, // Habilita compressão gzip
  productionBrowserSourceMaps: false, // Desabilita sourcemaps em produção
  cacheComponents: true, // Substitui experimental.ppr para habilitar Partial Prerendering
  
  // Otimizações adicionais
  output: 'standalone', // Para deploy otimizado
  generateBuildId: async () => {
    return `build-${Date.now()}`; // ID único para cada build
  },
  
  // Configurações de bundle
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  
  // Otimização de módulos
  modularizeImports: {
    '@heroicons/react': {
      transform: '@heroicons/react/24/outline/{{member}}',
    },
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{member}}',
    },
  },

  /**
   * Headers HTTP para reforçar segurança e cache.
   * @returns {Promise<Array<{source: string, headers: Array<{key: string, value: string}>}>>}
   */
  async headers() {
    return [
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
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source:
          '/:all*(svg|jpg|jpeg|png|gif|webp|ico|ttf|otf|woff|woff2|mp4|webm|json)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  /**
   * Redirecionamentos permanentes customizados.
   * @returns {Promise<Array<{source: string, destination: string, permanent: boolean}>>}
   */
  async redirects() {
    return [{ source: '/home', destination: '/', permanent: true }];
  },

  /**
   * Customização do Webpack.
   * - Garante resolução de symlinks correta (workspaces).
   * - Fornece fallback seguro para fs, net, tls no client-side.
   * - Configura tratamento especial para @rainersoft/design-tokens.
   */
  webpack: (config, { isServer }) => {
    config.resolve.symlinks = true;
    if (!isServer) {
      config.resolve.fallback = { fs: false, net: false, tls: false };
    }
    
    // Configuração especial para evitar problemas com dynamic imports
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
      '.jsx': ['.jsx', '.tsx'],
    };
    
    // Garantir que módulos client-side sejam tratados corretamente
    if (!isServer) {
      // Manter otimizações padrão, mas garantir resolução correta
      config.resolve.alias = {
        ...config.resolve.alias,
      };
    }
    
    return config;
  },

  /**
   * Configuração do Turbopack (vazio para silenciar erro quando webpack está configurado).
   * Next.js 16 usa Turbopack por padrão, mas temos configuração webpack customizada.
   * Esta configuração vazia permite usar --webpack explicitamente.
   */
  turbopack: {},
};

export default nextConfig;

