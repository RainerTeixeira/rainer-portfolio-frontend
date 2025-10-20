/**
 * Root Layout Component
 * 
 * Layout raiz que envolve todas as páginas da aplicação Next.js.
 * Define estrutura HTML base, metadados, providers globais e layout fixo.
 * 
 * Características:
 * - Metadados completos para SEO e redes sociais
 * - Providers de tema e autenticação
 * - Navbar sticky e Footer fixo
 * - Fontes otimizadas com next/font
 * - PWA completo com manifesto
 * - Analytics e Speed Insights da Vercel
 * 
 * @fileoverview Root layout component - Base estrutural da aplicação
 * @author Rainer Teixeira
 * @version 1.0.0
 */

// ============================================================================
// Styles
// ============================================================================

import "./globals.css"

// ============================================================================
// Next.js Fonts
// ============================================================================

import { Inter, Orbitron, Rajdhani } from "next/font/google"

// ============================================================================
// Providers
// ============================================================================

import { AuthProvider } from "@/components/providers/auth-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"

// ============================================================================
// Layout Components
// ============================================================================

import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"

// ============================================================================
// UI Components
// ============================================================================

import { InstallPrompt, UpdateNotification } from "@/components/ui"

// ============================================================================
// Constants & Config
// ============================================================================

import { SITE_CONFIG } from "@/constants"

// ============================================================================
// Analytics
// ============================================================================

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

// ============================================================================
// Font Configuration
// ============================================================================

/**
 * Configuração de fontes otimizadas com next/font
 * 
 * Fontes auto-hospedadas para performance máxima:
 * - Zero requisições externas
 * - Subset latino reduzido
 * - Display swap (evita FOIT)
 * - Preload automático
 * - Zero layout shift
 * - Core Web Vitals otimizados
 */

/**
 * Inter - Fonte principal (corpo de texto)
 * Sans-serif moderna e altamente legível
 */
const fontInter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

/**
 * Orbitron - Fonte futurista (títulos holográficos)
 * Design cyberpunk e sci-fi
 */
const fontOrbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron',
  weight: ['400', '500', '600', '700', '800', '900'],
})

/**
 * Rajdhani - Fonte complementar (subtítulos)
 * Estilo tech com boa legibilidade
 */
const fontRajdhani = Rajdhani({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rajdhani',
  weight: ['300', '400', '500', '600', '700'],
})

// ============================================================================
// Metadata Configuration
// ============================================================================

/**
 * Metadados da aplicação
 * 
 * Objeto exportado que define metadados HTML para SEO e compartilhamento social.
 * O Next.js utiliza esta exportação para gerar tags <title> e <meta> automaticamente.
 * 
 * Inclui:
 * - Título e descrição básicos
 * - Open Graph para redes sociais
 * - Twitter Cards
 * - Informações do autor
 * - Keywords para SEO
 * 
 * @type {import('next').Metadata}
 */
export const metadata: import('next').Metadata = {
  title: {
    default: `${SITE_CONFIG.name} - ${SITE_CONFIG.title} | Empresa de Desenvolvimento`,
    template: `%s | ${SITE_CONFIG.name}`
  },
  description: SITE_CONFIG.description,
  keywords: [...SITE_CONFIG.keywords],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  applicationName: SITE_CONFIG.name,
  category: 'technology',
  classification: 'Software Development Company, Web Development, Enterprise Solutions',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    alternateLocale: ['en_US'],
    url: SITE_CONFIG.url,
    title: `${SITE_CONFIG.name} - ${SITE_CONFIG.title}`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${SITE_CONFIG.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Empresa de Desenvolvimento Full-Stack`,
      }
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
    // google: 'seu-codigo-aqui', // Adicionar depois
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
      // iPhone SE (1st gen), 5s, 5c, 5
      {
        url: '/splash-screens/iphone5.png',
        media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
      },
      // iPhone 6, 6s, 7, 8, SE (2nd/3rd gen)
      {
        url: '/splash-screens/iphone6.png',
        media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)',
      },
      // iPhone 6 Plus, 6s Plus, 7 Plus, 8 Plus
      {
        url: '/splash-screens/iphone6plus.png',
        media: '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)',
      },
      // iPhone X, XS, 11 Pro, 12 Mini, 13 Mini
      {
        url: '/splash-screens/iphonex.png',
        media: '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
      },
      // iPhone XR, 11
      {
        url: '/splash-screens/iphonexr.png',
        media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)',
      },
      // iPhone XS Max, 11 Pro Max
      {
        url: '/splash-screens/iphonexsmax.png',
        media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)',
      },
      // iPhone 12, 12 Pro, 13, 13 Pro, 14
      {
        url: '/splash-screens/iphone12.png',
        media: '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)',
      },
      // iPhone 12 Pro Max, 13 Pro Max, 14 Plus
      {
        url: '/splash-screens/iphone12promax.png',
        media: '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3)',
      },
      // iPhone 14 Pro
      {
        url: '/splash-screens/iphone14pro.png',
        media: '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3)',
      },
      // iPhone 14 Pro Max
      {
        url: '/splash-screens/iphone14promax.png',
        media: '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)',
      },
      // iPad Mini, Air
      {
        url: '/splash-screens/ipad.png',
        media: '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)',
      },
      // iPad Pro 10.5"
      {
        url: '/splash-screens/ipadpro10.png',
        media: '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)',
      },
      // iPad Pro 11"
      {
        url: '/splash-screens/ipadpro11.png',
        media: '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)',
      },
      // iPad Pro 12.9"
      {
        url: '/splash-screens/ipadpro12.png',
        media: '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)',
      },
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
    // ========== PWA Universal ==========
    'mobile-web-app-capable': 'yes',
    'application-name': SITE_CONFIG.name,
    
    // ========== iOS (Apple) ==========
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': SITE_CONFIG.name,
    'format-detection': 'telephone=no, date=no, email=no, address=no',
    
    // ========== Android (Chrome/Samsung) ==========
    // Theme color para barra de status Android
    'theme-color': '#000000',
    'mobile-web-app-status-bar-style': 'black-translucent',
    
    // ========== Microsoft (Windows/Edge) ==========
    'msapplication-TileColor': '#000000',
    'msapplication-navbutton-color': '#000000',
    'msapplication-starturl': '/',
    'msapplication-tap-highlight': 'no',
    
    // ========== Performance & SEO ==========
    'HandheldFriendly': 'true',
    'MobileOptimized': '375',
    
    // ========== Security ==========
    'referrer': 'origin-when-cross-origin',
  },
}

/**
 * Configuração de Viewport Universal
 * 
 * Movido do metadata export conforme recomendação Next.js 15+
 * Define como a página deve ser renderizada em TODOS os dispositivos
 * 
 * Configurações otimizadas para:
 * - iOS: viewportFit 'cover' para notch/Dynamic Island
 * - Android: theme-color adaptativo para barra de status
 * - Desktop: zoom controlado para melhor UX
 * - PWA: experiência fullscreen em todos os dispositivos
 * 
 * @type {import('next').Viewport}
 */
export const viewport: import('next').Viewport = {
  // Dimensões responsivas
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  
  // iOS - Estende até as bordas (notch, Dynamic Island)
  viewportFit: 'cover',
  
  // Theme Color adaptativo (Android + iOS 15+)
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

// ============================================================================
// Types
// ============================================================================

/**
 * Props do Root Layout
 */
interface RootLayoutProps {
  readonly children: React.ReactNode
}

// ============================================================================
// Main Component
// ============================================================================

/**
 * Root Layout Component
 * 
 * Define estrutura HTML base de todas as páginas.
 * 
 * Estrutura:
 * - HTML com lang="pt-BR"
 * - ThemeProvider para tema claro/escuro
 * - AuthProvider para autenticação
 * - Navbar sticky (z-50)
 * - Main content area (flex-1)
 * - Footer fixo no fim
 * - PWA prompts e notificações
 * - Analytics da Vercel
 * 
 * @param children - Conteúdo das páginas filhas
 * @returns Estrutura HTML completa da aplicação
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html 
      lang="pt-BR" 
      suppressHydrationWarning 
      className={`${fontInter.variable} ${fontOrbitron.variable} ${fontRajdhani.variable}`}
    >
      <body className={`${fontInter.variable} bg-background text-foreground antialiased min-h-screen smooth-scroll font-sans`}>
        {/**
         * ThemeProvider
         * Contexto para gerenciamento de tema (claro/escuro/sistema)
         * - attribute="class": Alterna tema via classe CSS
         * - defaultTheme="system": Usa preferência do SO por padrão
         * - enableSystem: Permite detecção automática de preferência do SO
         */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            {/* Layout otimizado: Flexbox apenas no wrapper interno */}
            {/**
             * Container principal com Flexbox
             * - flex flex-col: Layout vertical
             * - min-h-screen: Altura mínima de 100vh para footer sempre no final
             * - visible: Garantia explícita de visibilidade (previne ocultação acidental)
             */}
            <div className="flex flex-col min-h-screen visible">
              {/**
               * Header fixo com navbar
               * - sticky top-0: Fixa no topo ao rolar
               * - z-50: Sobreposição alta para ficar acima de outros elementos
               * - will-change-transform: Otimização de performance para animações
               */}
              <header className="sticky top-0 z-50 will-change-transform">
                <Navbar />
              </header>
              
              {/**
               * Área de conteúdo principal
               * - flex-1: Ocupa todo espaço disponível entre header e footer
               * - relative: Contexto de posicionamento para elementos filhos
               * - role="main": Indica que é o conteúdo principal da página
               */}
              <main className="flex-1 relative" role="main">
                {/* Renderiza o conteúdo específico de cada página */}
                {children}
              </main>
              
              {/**
               * Footer da aplicação
               * Fica sempre no final da página devido ao flex-1 no main
               */}
              <Footer />
            </div>
            
            {/**
             * Install Prompt PWA
             * 
             * Banner fixo que aparece no rodapé convidando o usuário
             * a instalar o aplicativo como PWA.
             * 
             * - Aparece apenas se app é instalável
             * - Pode ser fechado pelo usuário
             * - Persiste escolha no localStorage
             */}
            <InstallPrompt />
            
            {/**
             * Update Notification PWA
             * 
             * Toast no topo que notifica sobre atualizações disponíveis.
             * Permite atualizar o service worker com um clique.
             */}
            <UpdateNotification />
          </AuthProvider>
        </ThemeProvider>
        
        {/**
         * Vercel Analytics & Speed Insights
         * 
         * - Analytics: Rastreia métricas de performance e analytics do site
         * - SpeedInsights: Monitora Core Web Vitals em tempo real
         * Não afeta performance e respeita privacidade.
         */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}