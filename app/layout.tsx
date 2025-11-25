/**
 * @module app/layout
 * @fileoverview
 * RootLayout - Layout Raiz da Aplicação Next.js
 *
 * Este componente define o layout global de toda a aplicação Next.js,
 * envolvendo todas as páginas e providenciando:
 *   - Estrutura básica HTML (<html> e <body>)
 *   - Configuração global de fontes otimizadas (next/font)
 *   - Metadados para SEO, redes sociais e PWA (via `metadata`)
 *   - Configuração de viewport universal (via `viewport`)
 *   - Providers de contexto (ThemeProvider, MatrixProvider, AuthProvider)
 *   - Layout fixo com Navbar (sticky), Footer (fixo) e área principal responsiva
 *   - Banner e inicializador de cookies para LGPD/GDPR
 *   - Prompts e notificações PWA (instalação, atualização)
 *   - Toast global para notificações do usuário
 *   - Integração com Analytics e Speed Insights Vercel
 *
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * Renderização automática pelo Next.js App Router:
 * <html>
 *   <body>
 *     <ThemeProvider>
 *       <MatrixProvider>
 *         <AuthProvider>
 *           <AppWrapper>
 *              ...UI & children...
 *           </AppWrapper>
 *         </AuthProvider>
 *       </MatrixProvider>
 *     </ThemeProvider>
 *     <Toaster />
 *     <Analytics />
 *     <SpeedInsights />
 *   </body>
 * </html>
 */

import type { Metadata, Viewport } from 'next';

import './globals.css';

import { Inter, Orbitron, Rajdhani } from 'next/font/google';

import { AuthProvider } from '@/components/providers/auth-provider';
import { MatrixProvider } from '@/components/providers/matrix-context-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { AppWrapper } from '@/components/layout/app-wrapper';
import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { CookieInitializer } from '@/components/cookies/cookie-initializer';
import {
  CookieBanner,
  InstallPrompt,
  StarsBackground,
  Toaster,
  UpdateNotification,
} from '@rainersoft/ui';
import { DESENVOLVEDOR, PALAVRAS_CHAVE, SITE_CONFIG } from '@/constants';
import { darkThemeColors, lightThemeColors } from '@rainersoft/design-tokens';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

/**
 * Configuração da fonte principal Inter.
 * Fonte sans-serif moderna utilizada no corpo de texto da aplicação.
 *
 * @constant {NextFont}
 * @property {string[]} subsets - Subconjuntos de caracteres (latino)
 * @property {string} display - Estratégia de exibição (swap para evitar FOIT)
 * @property {string} variable - Variável CSS customizada (--font-inter)
 */
const fontInter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

/**
 * Configuração da fonte Orbitron.
 * Fonte secundária com estilo futurista/cyberpunk para títulos e elementos destacados.
 *
 * @constant {NextFont}
 * @property {string[]} subsets - Subconjuntos de caracteres (latino)
 * @property {string} display - Estratégia de exibição (swap)
 * @property {string} variable - Variável CSS customizada (--font-orbitron)
 * @property {string[]} weight - Pesos de fonte disponíveis (400-900)
 */
const fontOrbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron',
  weight: ['400', '500', '600', '700', '800', '900'],
});

/**
 * Configuração da fonte Rajdhani.
 * Fonte técnica complementar para subtítulos e elementos secundários.
 *
 * @constant {NextFont}
 * @property {string[]} subsets - Subconjuntos de caracteres (latino)
 * @property {string} display - Estratégia de exibição (swap)
 * @property {string} variable - Variável CSS customizada (--font-rajdhani)
 * @property {string[]} weight - Pesos de fonte disponíveis (300-700)
 */
const fontRajdhani = Rajdhani({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rajdhani',
  weight: ['300', '400', '500', '600', '700'],
});

/**
 * Metadados globais da aplicação.
 * Configurações de SEO, OpenGraph, Twitter Cards, PWA e otimizações de compartilhamento.
 * Utilizados diretamente pelo Next.js para geração automática de meta tags.
 *
 * @type {Metadata}
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
  category: 'technology',
  classification:
    'Software Development Company, Web Development, Enterprise Solutions',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    alternateLocale: ['en_US'],
    url: SITE_CONFIG.url,
    title: `${SITE_CONFIG.name} - Desenvolvedor Full-Stack`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${SITE_CONFIG.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Empresa de Desenvolvimento Full-Stack`,
      },
    ],
  },
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
  verification: {
    // google: 'seu-codigo-aqui',
    // yandex: 'seu-codigo-aqui',
    // bing: 'seu-codigo-aqui',
  },
  alternates: {
    canonical: SITE_CONFIG.url,
    languages: {
      'pt-BR': SITE_CONFIG.url,
      'en-US': `${SITE_CONFIG.url}/en`,
    },
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: `${SITE_CONFIG.name}`,
    startupImage: [
      { url: '/splash-screens/iphone5.png', media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)' },
      { url: '/splash-screens/iphone6.png', media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)' },
      { url: '/splash-screens/iphone6plus.png', media: '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)' },
      { url: '/splash-screens/iphonex.png', media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)' },
      { url: '/splash-screens/iphonexr.png', media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)' },
      { url: '/splash-screens/iphonexsmax.png', media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)' },
      { url: '/splash-screens/iphone12.png', media: '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)' },
      { url: '/splash-screens/iphone12promax.png', media: '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3)' },
      { url: '/splash-screens/iphone14pro.png', media: '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3)' },
      { url: '/splash-screens/iphone14promax.png', media: '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)' },
      { url: '/splash-screens/ipad.png', media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)' },
      { url: '/splash-screens/ipadpro10.png', media: '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)' },
      { url: '/splash-screens/ipadpro11.png', media: '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)' },
      { url: '/splash-screens/ipadpro12.png', media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)' },
    ],
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
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

/**
 * Configuração universal da viewport.
 * Otimizações para máxima compatibilidade cross-device, suporte a notch,
 * zoom controlado, fullscreen PWA e adaptação automática da barra de status
 * conforme o tema do sistema operacional.
 *
 * @type {Viewport}
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
    { media: '(prefers-color-scheme: light)', color: lightThemeColors.primitive.neutral[50] },
    { media: '(prefers-color-scheme: dark)', color: darkThemeColors.primitive.neutral[950] },
  ],
};

/**
 * Propriedades do componente RootLayout.
 *
 * @interface RootLayoutProps
 */
interface RootLayoutProps {
  /** Conteúdo das páginas filhas renderizadas pelo Next.js App Router */
  readonly children: React.ReactNode;
}

/**
 * Componente raiz do layout da aplicação Next.js.
 *
 * Estrutura toda a aplicação na camada mais alta, englobando:
 * - Providers de contexto (Theme, Matrix, Auth)
 * - Layout fixo com Navbar, Main e Footer
 * - Componentes globais (Cookies, PWA, Background)
 * - Integrações de Analytics e Performance
 *
 * @param {RootLayoutProps} props - Propriedades do layout raiz
 * @returns {JSX.Element} Estrutura HTML global da aplicação
 *
 * @example
 * ```tsx
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
        className={`${fontInter.variable} text-foreground antialiased min-h-screen smooth-scroll font-sans`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MatrixProvider>
            <AuthProvider>
              <AppWrapper>
                <StarsBackground />

                {/* Layout principal da aplicação */}
                {/* Estrutura com header fixo, área de conteúdo e footer */}
                <div className="flex flex-col min-h-screen visible">
                  {/* Cabeçalho fixo no topo com navbar */}
                  <header className="sticky top-0 z-50 will-change-transform">
                    <Navbar />
                  </header>
                  {/* Área principal de conteúdo das páginas */}
                  <main className="flex-1 relative" role="main">
                    {children}
                  </main>
                  {/* Rodapé da aplicação */}
                  <Footer />
                </div>

                <CookieBanner />
                <CookieInitializer />
                <InstallPrompt />
                <UpdateNotification />
              </AppWrapper>
            </AuthProvider>
          </MatrixProvider>
        </ThemeProvider>

        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
