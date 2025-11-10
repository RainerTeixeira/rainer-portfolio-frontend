/**
 * Configuração avançada do Next.js
 *
 * Este arquivo define configurações personalizadas para otimização,
 * segurança e funcionalidades específicas do projeto.
 *
 * @type {import('next').NextConfig}
 * @author Rainer Teixeira
 * @since 1.0.0
 */
const nextConfig = {
  /**
   * Configurações experimentais de performance
   *
   * Otimiza imports de pacotes específicos para reduzir
   * o tamanho do bundle e melhorar a performance.
   *
   * NOTA: Next.js 15 usa webpack por padrão, que resolve corretamente
   * pacotes locais instalados via file: protocol.
   */
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

  /**
   * Pacotes que devem ser transpilados pelo Next.js
   *
   * Necessário para pacotes locais ou pacotes que não são
   * pré-compilados para ESM/CommonJS.
   */
  transpilePackages: ['@rainer/design-tokens'],

  /**
   * Configurações de otimização de imagens
   *
   * Define domínios permitidos, formatos suportados e
   * tamanhos responsivos para otimização automática.
   */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rainersoft.com.br',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'rainer-portfolio.vercel.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname:
          'rainer-portfolio-i4pf4a37z-rainerteixeiras-projects.vercel.app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Configurações de compilação
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Headers de segurança
  async headers() {
    return [
      {
        // Segurança básica para todas as rotas
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
      {
        // Cache agressivo para assets gerados pelo Next
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache agressivo para arquivos estáticos comuns
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

  // Configurações de redirecionamento
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },

  /**
   * Webpack configuration
   *
   * Next.js 15 usa webpack por padrão, que resolve corretamente
   * pacotes locais instalados via file: protocol.
   *
   * Esta configuração garante que o webpack resolve corretamente:
   * - Pacotes locais (file: protocol)
   * - Symlinks
   * - Módulos do node_modules
   */
  webpack: (config, { isServer }) => {
    // Garante resolução correta de pacotes locais e symlinks
    config.resolve.symlinks = true;

    // Garante resolução correta de módulos ES
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },
};

export default nextConfig;
