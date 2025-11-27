/**
 * @module app/layout
 * @fileoverview Layout Raiz da Aplicação Next.js
 * 
 * Componente de layout raiz que define a estrutura global da aplicação,
 * incluindo providers de contexto, configurações de tema, metadados SEO,
 * e integrações com sistemas de analytics e performance.
 * 
 * Este layout serve como wrapper global para todas as páginas da aplicação,
 * garantindo consistência visual e funcional em toda a experiência do usuário.
 * 
 * @author Rainer Teixeira
 * @version 3.0.0
 * @since 1.0.0
 * 
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/layout
 */

import type { Metadata, Viewport } from 'next';

// ============================================================================
// Importações de Estilos e Configurações Base
// ============================================================================

import './globals.css';

// ============================================================================
// Importações de Fontes Otimizadas (next/font)
// ============================================================================

import { Inter, Orbitron, Rajdhani } from 'next/font/google';

// ============================================================================
// Importações de Providers de Contexto
// ============================================================================

import AuthProvider from '@/components/providers/auth-context-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { AppWrapper } from '@/components/layout/app-wrapper';

// ============================================================================
// Importações de Componentes de Layout
// ============================================================================

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CookieInitializer } from '@/components/cookies/cookie-initializer';

// ============================================================================
// Importações da Biblioteca UI (@rainersoft/ui)
// ============================================================================

import {
  CookieBanner,
  InstallPrompt,
  StarsBackground,
  Toaster,
  UpdateNotification,
} from '@rainersoft/ui';

// ============================================================================
// Importações de Design Tokens
// ============================================================================

import {
  lightThemeColors,
  darkThemeColors,
  Z_INDEX,
  RESPONSIVE,
} from '@rainersoft/design-tokens';

// ============================================================================
// Importações de Analytics e Performance
// ============================================================================

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

// ============================================================================
// Importações de Constantes e Configurações
// ============================================================================

import {
  DESENVOLVEDOR,
  PALAVRAS_CHAVE,
  SITE_CONFIG,
  OPEN_GRAPH,
  SEO_CONFIG,
  OPEN_GRAPH_IMAGE_ALT,
} from '@/constants';

// ============================================================================
// Configuração de Fontes
// ============================================================================

/**
 * Configuração da fonte Inter para texto corporativo.
 * 
 * @type {NextFont}
 * @property {string[]} subsets - Subconjuntos de caracteres ('latin')
 * @property {string} display - Estratégia de exibição ('swap')
 * @property {string} variable - Variável CSS personalizada ('--font-inter')
 * 
 * @example
 * Aplicação no CSS: `font-family: var(--font-inter)`
 */
const fontInter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

/**
 * Configuração da fonte Orbitron para elementos futuristas.
 * 
 * @type {NextFont}
 * @property {string[]} subsets - Subconjuntos de caracteres ('latin')
 * @property {string} display - Estratégia de exibição ('swap')
 * @property {string} variable - Variável CSS personalizada ('--font-orbitron')
 * @property {string[]} weight - Pesos de fonte disponíveis
 * 
 * @example
 * Aplicação no CSS: `font-family: var(--font-orbitron)`
 */
const fontOrbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron',
  weight: ['400', '500', '600', '700', '800', '900'],
});

/**
 * Configuração da fonte Rajdhani para elementos técnicos.
 * 
 * @type {NextFont}
 * @property {string[]} subsets - Subconjuntos de caracteres ('latin')
 * @property {string} display - Estratégia de exibição ('swap')
 * @property {string} variable - Variável CSS personalizada ('--font-rajdhani')
 * @property {string[]} weight - Pesos de fonte disponíveis
 * 
 * @example
 * Aplicação no CSS: `font-family: var(--font-rajdhani)`
 */
const fontRajdhani = Rajdhani({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rajdhani',
  weight: ['300', '400', '500', '600', '700'],
});

// ============================================================================
// Metadados da Aplicação
// ============================================================================

/**
 * Metadados globais para SEO, OpenGraph, Twitter Cards e PWA.
 * 
 * @type {Metadata}
 * 
 * @property {Object} title - Configurações de título
 * @property {string} title.default - Título padrão da aplicação
 * @property {string} title.template - Template para títulos de páginas
 * @property {string} description - Descrição meta para SEO
 * @property {string[]} keywords - Palavras-chave para SEO
 * @property {Object[]} authors - Informações do autor/desenvolvedor
 * @property {string} creator - Criador do conteúdo
 * @property {string} publisher - Publicador da aplicação
 * @property {string} applicationName - Nome da aplicação PWA
 * @property {string} category - Categoria da aplicação
 * @property {string} classification - Classificação para SEO
 * 
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} - Desenvolvedor Full-Stack | Empresa de Desenvolvimento`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    ...PALAVRAS_CHAVE.principais,
    ...PALAVRAS_CHAVE.secundarias,
    ...PALAVRAS_CHAVE.longas
  ],
  authors: [{ name: DESENVOLVEDOR.nome, url: SITE_CONFIG.url }],
  creator: DESENVOLVEDOR.nome,
  publisher: SITE_CONFIG.name,
  applicationName: SITE_CONFIG.name,
  category: SEO_CONFIG.category,
  classification: SEO_CONFIG.classification,
  
  /**
   * Configurações OpenGraph para redes sociais.
   */
  openGraph: {
    type: OPEN_GRAPH.tipo,
    locale: OPEN_GRAPH.idioma,
    alternateLocale: ['en_US'],
    url: SITE_CONFIG.url,
    title: OPEN_GRAPH.siteName,
    description: SITE_CONFIG.description,
    siteName: OPEN_GRAPH.siteName,
    images: [
      {
        url: `${SITE_CONFIG.url}${OPEN_GRAPH.imagem}`,
        width: 1200,
        height: 630,
        alt: OPEN_GRAPH_IMAGE_ALT,
      },
    ],
  },
  
  /**
   * Configurações para robôs de busca.
   */
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  /**
   * URLs alternativas e canonical para SEO.
   */
  alternates: {
    canonical: SITE_CONFIG.url,
    languages: {
      'pt-BR': SITE_CONFIG.url,
      'en-US': `${SITE_CONFIG.url}/en`,
    },
  },
  
  /**
   * Configurações PWA (Progressive Web App).
   */
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: `${SITE_CONFIG.name}`,
    startupImage: [
      // Nota: Adicione aqui suas splash screens específicas por dispositivo
    ],
  },
  
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  
  /**
   * Ícones para vários dispositivos e contextos.
   */
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  
  /**
   * Metadados adicionais para compatibilidade cross-browser.
   */
  other: {
    'mobile-web-app-capable': 'yes',
    'application-name': SITE_CONFIG.name,
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': SITE_CONFIG.name,
    'format-detection': 'telephone=no, date=no, email=no, address=no',
    'theme-color': lightThemeColors.primitive.neutral[950],
    'mobile-web-app-status-bar-style': 'black-translucent',
    'msapplication-TileColor': lightThemeColors.primitive.neutral[950],
    'msapplication-navbutton-color': lightThemeColors.primitive.neutral[950],
    'msapplication-starturl': '/',
    'msapplication-tap-highlight': 'no',
    HandheldFriendly: 'true',
    MobileOptimized: '375',
    referrer: 'origin-when-cross-origin',
  },
};

// ============================================================================
// Configuração da Viewport
// ============================================================================

/**
 * Configurações da viewport para responsividade e PWA.
 * 
 * @type {Viewport}
 * 
 * @property {string} width - Largura da viewport
 * @property {number} initialScale - Zoom inicial
 * @property {number} minimumScale - Zoom mínimo permitido
 * @property {number} maximumScale - Zoom máximo permitido
 * @property {boolean} userScalable - Permite zoom do usuário
 * @property {string} viewportFit - Comportamento em dispositivos com notch
 * @property {Object[]} themeColor - Cores do tema por preferência do sistema
 * 
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: [
    { 
      media: '(prefers-color-scheme: light)', 
      color: lightThemeColors.primitive.neutral[50] 
    },
    { 
      media: '(prefers-color-scheme: dark)', 
      color: darkThemeColors.primitive.neutral[950] 
    },
  ],
};

// ============================================================================
// Interface das Props do Layout Raiz
// ============================================================================

/**
 * Propriedades do componente RootLayout.
 * 
 * @interface RootLayoutProps
 * @property {React.ReactNode} children - Conteúdo das páginas filhas
 */
interface RootLayoutProps {
  readonly children: React.ReactNode;
}

// ============================================================================
// Componente Principal do Layout Raiz
// ============================================================================

/**
 * Componente RootLayout - Layout Raiz da Aplicação
 * 
 * Este componente define a estrutura HTML base e engloba toda a aplicação
 * com providers de contexto, configurações de tema e componentes globais.
 * 
 * @param {RootLayoutProps} props - Propriedades do layout raiz
 * @param {React.ReactNode} props.children - Conteúdo das páginas filhas
 * 
 * @returns {JSX.Element} Estrutura HTML completa da aplicação
 * 
 * @example
 * ```tsx
 * // Renderizado automaticamente pelo Next.js App Router
 * <RootLayout>
 *   <PageContent />
 * </RootLayout>
 * ```
 */
export default function RootLayout({ children }: RootLayoutProps) {

  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${fontInter.variable} ${fontOrbitron.variable} ${fontRajdhani.variable}`}
    >
      <body
        className="min-h-screen antialiased smooth-scroll font-sans bg-background text-foreground"
        style={{
          /**
           * Fonte principal vinda da variável configurada pelo next/font
           */
          fontFamily: 'var(--font-inter)',
        }}
        suppressHydrationWarning
      >
        {/**
         * Provider de tema com suporte a sistema, claro e escuro
         */}
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem
        >
          {/**
           * Provider de autenticação para gestão de estado do usuário
           */}
          <AuthProvider>
            {/**
             * Wrapper principal da aplicação
             */}
            <AppWrapper>
              {/**
               * Fundo estelar decorativo (modo dark)
               */}
              <StarsBackground />

              {/**
               * Estrutura principal do layout
               * - Header fixo no topo
               * - Conteúdo principal flexível
               * - Footer no final
               */}
              <div className="flex flex-col min-h-screen">
                {/**
                 * Cabeçalho fixo com navegação principal
                 */}
                <header
                  className={`sticky top-0 will-change-transform ${Z_INDEX.STICKY}`}
                >
                  <Navbar />
                </header>

                {/**
                 * Área de conteúdo principal das páginas
                 */}
                <main
                  className={`flex-1 relative ${RESPONSIVE.SPACING.RESPONSIVE_Y}`}
                  role="main"
                >
                  {children}
                </main>

                {/**
                 * Rodapé da aplicação
                 */}
                <Footer />
              </div>

              {/**
               * Componentes globais de UI
               * - Banner de cookies (LGPD/GDPR)
               * - Inicializador de cookies
               * - Prompt de instalação PWA
               * - Notificação de atualização
               */}
              <CookieBanner />
              <CookieInitializer />
              <InstallPrompt />
              <UpdateNotification />
            </AppWrapper>
          </AuthProvider>
        </ThemeProvider>

        {/**
         * Utilitários globais
         * - Sistema de toasts/notificações
         * - Analytics da Vercel
         * - Insights de performance
         */}
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}