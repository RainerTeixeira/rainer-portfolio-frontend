import fs from 'fs';
import path from 'path';

/**
 * Carrega variáveis de ambiente do arquivo .env.local
 * 
 * Esta função lê o arquivo .env.local na raiz do projeto e
 * adiciona as variáveis ao process.env se ainda não existirem.
 * 
 * @returns {void}
 */
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
      
      if (key && process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  } catch {
    // Ignora erros em desenvolvimento
  }
}

loadEnvLocal();

/**
 * Configuração do Next.js
 * 
 * Define todas as configurações do framework Next.js incluindo:
 * - Configurações principais (reactStrictMode, compress, etc.)
 * - Otimizações de build
 * - Configurações de TypeScript
 * - Recursos experimentais
 * - Configurações de imagens
 * - Otimização de pacotes
 * - Configuração do Webpack
 * - Headers de segurança
 * - Redirecionamentos e rewrites
 * 
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Configurações principais
  reactStrictMode: false,
  poweredByHeader: false,
  compress: true,
  typedRoutes: true,
  
  // Forçar tudo a ser client-side
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  
  // Desabilitar prerendering para evitar erros de SSR
  experimental: {
    ssr: false,
  },
  
  // Otimização de build
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // TypeScript
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Desenvolvimento
  allowedDevOrigins: ['192.168.56.1'],
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  
  // Recursos experimentais
  experimental: {
    scrollRestoration: true,
    serverActions: { bodySizeLimit: '2mb' },
  },
  
  // Imagens
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'rainersoft.com.br', pathname: '/**' },
      { protocol: 'https', hostname: 'rainer-portfolio.vercel.app', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'via.placeholder.com', pathname: '/**' },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Otimização de pacotes
  transpilePackages: ['@rainersoft/design-tokens', '@rainersoft/ui', '@rainersoft/utils'],
  modularizeImports: {
    '@heroicons/react': { transform: '@heroicons/react/24/outline/{{member}}' },
    'lucide-react': { transform: 'lucide-react/dist/esm/icons/{{member}}' },
  },
  
  /**
   * Configuração do Webpack
   * 
   * Personaliza a configuração do Webpack para adicionar aliases,
   * suporte a symlinks, extensões e otimizações de produção.
   * 
   * @param {object} config - Configuração atual do Webpack
   * @param {object} options - Opções do contexto de build
   * @param {boolean} options.isServer - Indica se é build do servidor
   * @param {boolean} options.dev - Indica se está em modo desenvolvimento
   * @returns {object} Configuração modificada do Webpack
   */
  webpack: (config, { isServer, dev }) => {
    // Aliases de caminho
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
    
    // Symlinks
    config.resolve.symlinks = true;
    
    // Aliases de extensão
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
      '.jsx': ['.jsx', '.tsx'],
    };
    
    // Polyfills do lado do servidor
    if (!isServer) {
      config.resolve.fallback = { fs: false, net: false, tls: false };
    }
    
    // Otimizações de produção
    if (!dev) {
      config.experiments = {
        ...config.experiments,
        asyncWebAssembly: true,
        layers: true,
      };
    }
    
    return config;
  },
  
  /**
   * Configuração de headers HTTP
   * 
   * Define headers de cache e segurança para diferentes rotas.
   * Inclui proteções contra XSS, clickjacking e outras vulnerabilidades.
   * 
   * @returns {Promise<Array>} Array de configurações de headers
   */
  async headers() {
    return [
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
  
  /**
   * Configuração de redirecionamentos
   * 
   * Define redirecionamentos permanentes e temporários.
   * 
   * @returns {Promise<Array>} Array de configurações de redirect
   */
  async redirects() {
    return [{ source: '/home', destination: '/', permanent: true }];
  },
  
  /**
   * Configuração de rewrites
   * 
   * Define rewrites de URL para proxy de API em desenvolvimento.
   * Permite redirecionar chamadas /api/* para o backend configurado.
   * 
   * @returns {Promise<Array>} Array de configurações de rewrite
   */
  async rewrites() {
    if (process.env.NODE_ENV !== 'development') return [];
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return [];
    return [{ source: '/api/:path*', destination: `${apiUrl}/:path*` }];
  },
};

/**
 * Gera um ID único para cada build
 * 
 * Utiliza timestamp para garantir unicidade entre builds.
 * 
 * @returns {Promise<string>} ID único do build
 */
nextConfig.generateBuildId = async () => `build-${Date.now()}`;

export default nextConfig;