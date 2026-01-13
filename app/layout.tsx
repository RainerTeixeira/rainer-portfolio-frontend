import type { Metadata, Viewport } from 'next';
import { Inter, Orbitron, Rajdhani } from 'next/font/google';
import dynamic from 'next/dynamic';

import './globals.css';

import AuthProvider from '@/components/providers/auth-context-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { AppWrapper } from '@/components/layout/app-wrapper';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CookieInitializer } from '@/components/cookies/cookie-initializer';
import { zIndexPrimitive } from '@rainersoft/design-tokens';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import {
  DESENVOLVEDOR,
  PALAVRAS_CHAVE,
  SITE_CONFIG,
  OPEN_GRAPH,
  SEO_CONFIG,
  OPEN_GRAPH_IMAGE_ALT,
} from '@/constants';

/**
 * Configuração da fonte Inter
 *
 * @constant
 */
const fontInter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

/**
 * Configuração da fonte Orbitron
 *
 * @constant
 */
const fontOrbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron',
  weight: ['400', '500', '600', '700', '800', '900'],
});

/**
 * Configuração da fonte Rajdhani
 *
 * @constant
 */
const fontRajdhani = Rajdhani({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rajdhani',
  weight: ['300', '400', '500', '600', '700'],
});

/**
 * Metadados globais de SEO da aplicação.
 *
 * Inclui:
 * - Título padrão e template
 * - Descrição
 * - Palavras‑chave
 * - Open Graph para compartilhamento em redes sociais
 * - Configurações de robôs de busca
 * - Alternates (canonical e idiomas)
 * - Manifesto PWA e Apple Web App
 * - Ícones da aplicação
 * - Metatags adicionais para navegadores e PWA
 *
 * @type {Metadata}
 */
export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} - Desenvolvedor Full-Stack`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    ...PALAVRAS_CHAVE.principais,
    ...PALAVRAS_CHAVE.secundarias,
    ...PALAVRAS_CHAVE.longas,
  ],
  authors: [{ name: DESENVOLVEDOR.nome, url: SITE_CONFIG.url }],
  creator: DESENVOLVEDOR.nome,
  publisher: SITE_CONFIG.name,
  applicationName: SITE_CONFIG.name,
  category: SEO_CONFIG.category,
  classification: SEO_CONFIG.classification,

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
    'theme-color': '#0a0e27',
    'msapplication-TileColor': '#0a0e27',
    'msapplication-navbutton-color': '#0a0e27',
    'msapplication-starturl': '/',
    referrer: 'origin-when-cross-origin',
  },
};

/**
 * Configuração global da viewport.
 *
 * Controla escala inicial, limites de zoom, comportamento responsivo
 * e cores do tema com base no esquema de cores preferido do usuário.
 *
 * @type {Viewport}
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
      color: '#f9fafb',
    },
    {
      media: '(prefers-color-scheme: dark)',
      color: '#0a0e27',
    },
  ],
};

/**
 * Propriedades do componente RootLayout.
 *
 * @interface RootLayoutProps
 * @property {React.ReactNode} children - Conteúdo da página atual.
 */
interface RootLayoutProps {
  readonly children: React.ReactNode;
}

/**
 * Componente assíncrono de fundo estrelado.
 *
 * Carregado apenas no cliente.
 *
 * @constant
 */
const StarsBackground = dynamic(() => import('@rainersoft/ui').then((mod) => mod.StarsBackground));

/**
 * Componente de notificações (toasts).
 *
 * Carregado dinamicamente apenas no cliente.
 *
 * @constant
 */
const Toaster = dynamic(() => import('@rainersoft/ui').then((mod) => mod.Toaster));

/**
 * Banner de cookies para consentimento LGPD/GDPR.
 *
 * Carregado dinamicamente apenas no cliente.
 *
 * @constant
 */
const CookieBanner = dynamic(() => import('@rainersoft/ui').then((mod) => mod.CookieBanner));

/**
 * Componente de prompt de instalação (PWA).
 *
 * Carregado dinamicamente apenas no cliente.
 *
 * @constant
 */
const InstallPrompt = dynamic(() => import('@rainersoft/ui').then((mod) => mod.InstallPrompt));

/**
 * Componente de notificação de atualização da aplicação (PWA).
 *
 * Carregado dinamicamente apenas no cliente.
 *
 * @constant
 */
const UpdateNotification = dynamic(() => import('@rainersoft/ui').then((mod) => mod.UpdateNotification));

/**
 * RootLayout
 *
 * Layout raiz da aplicação Next.js (App Router).
 * Responsável por:
 * - Definir a estrutura HTML básica (`<html>` e `<body>`);
 * - Aplicar fontes globais e tema (dark/light) via ThemeProvider;
 * - Injetar o contexto de autenticação via AuthProvider;
 * - Renderizar a estrutura principal com Navbar, Footer e conteúdo da página;
 * - Inicializar cookies, fundos animados e notificações;
 * - Integrar com Analytics e SpeedInsights da Vercel.
 *
 * @param {RootLayoutProps} props - Propriedades do layout.
 * @param {React.ReactNode} props.children - Conteúdo da rota atual.
 * @returns {JSX.Element} Estrutura HTML raiz da aplicação.
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${fontInter.variable} ${fontOrbitron.variable} ${fontRajdhani.variable}`}
    >
      <body
        className="min-h-screen antialiased smooth-scroll bg-background text-foreground"
        style={{ fontFamily: 'var(--font-inter)' }}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <AppWrapper>
              <div className="flex flex-col min-h-screen">
                <header
                  className="sticky top-0 will-change-transform"
                  style={{ zIndex: zIndexPrimitive.dropdown }}
                >
                  <Navbar />
                </header>

                <main className="flex-1 relative">{children}</main>

                <Footer />
              </div>

              <CookieInitializer />
              <StarsBackground />
              <Toaster />
              <CookieBanner />
              <InstallPrompt />
              <UpdateNotification />
            </AppWrapper>
          </AuthProvider>
        </ThemeProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}