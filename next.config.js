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
   */
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

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
        hostname: 'rainer-portfolio-i4pf4a37z-rainerteixeiras-projects.vercel.app',
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
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
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
};

module.exports = nextConfig;
