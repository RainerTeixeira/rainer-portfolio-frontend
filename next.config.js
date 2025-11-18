/**
 * @file next.config.js
 * @description Configuração avançada do Next.js para performance, segurança
 * e integração com Vercel. Define otimizações de bundle, manipulação de imports,
 * transpile de workspaces, configurações de imagens, headers de segurança,
 * redirecionamentos e fallback de Webpack.
 * @type {import('next').NextConfig}
 * @author Rainer
 */
const nextConfig = {
  /**
   * Opções experimentais do Next.js:
   * - optimizePackageImports: Reduz o bundle transferindo apenas ícones realmente usados.
   */
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

  /**
   * Lista de workspaces a serem transpilados (monorepo support).
   */
  transpilePackages: ['@rainersoft/design-tokens'],

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
   */
  webpack: (config, { isServer }) => {
    config.resolve.symlinks = true;
    if (!isServer) {
      config.resolve.fallback = { fs: false, net: false, tls: false };
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
