/**
 * Layout Raiz da Aplicação
 * 
 * Este é o layout principal que envolve todas as páginas da aplicação.
 * Define a estrutura HTML base, metadados, providers globais e componentes
 * compartilhados como Navbar e Footer.
 * 
 * No Next.js 13+ App Router, este arquivo é obrigatório e serve como
 * o wrapper mais externo de toda a aplicação.
 * 
 * @fileoverview Root Layout component - Estrutura base da aplicação
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

import "./globals.css"
import { Inter, Orbitron, Rajdhani } from "next/font/google"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { AuthProvider } from "@/components/providers/auth-provider"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { InstallPrompt, UpdateNotification } from "@/components/ui"
import { SITE_CONFIG } from "@/constants"
import { Analytics } from "@vercel/analytics/next"

/**
 * Configuração de fontes otimizadas
 * 
 * Usa next/font/google para otimização automática:
 * - Self-hosting das fontes (sem request externo)
 * - Subset latino para reduzir tamanho
 * - Display swap para evitar FOIT (Flash of Invisible Text)
 * - Preload automático
 * 
 * Benefícios:
 * - Zero layout shift
 * - Melhor Core Web Vitals
 * - Performance otimizada
 */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Fonte futurista para títulos holográficos
const orbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron',
  weight: ['400', '500', '600', '700', '800', '900'],
})

// Fonte complementar para subtítulos
const rajdhani = Rajdhani({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rajdhani',
  weight: ['300', '400', '500', '600', '700'],
})

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
export const metadata = {
  title: {
    default: `${SITE_CONFIG.name} - ${SITE_CONFIG.title} | Portfólio Profissional`,
    template: `%s | ${SITE_CONFIG.name}`
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  applicationName: SITE_CONFIG.name,
  category: 'technology',
  classification: 'Portfolio, Software Development, Web Development',
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
        alt: `${SITE_CONFIG.name} - Portfolio Profissional`,
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@rainerteixeira',
    creator: '@rainerteixeira',
    title: `${SITE_CONFIG.name} - ${SITE_CONFIG.title}`,
    description: SITE_CONFIG.description,
    images: [`${SITE_CONFIG.url}/twitter-image.png`],
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
    title: 'Rainer Soft - Desenvolvedor Full-Stack',
    startupImage: [
      {
        url: '/splash-screen-640x1136.png',
        media: '(device-width: 320px) and (device-height: 568px)',
      },
      {
        url: '/splash-screen-750x1334.png',
        media: '(device-width: 375px) and (device-height: 667px)',
      },
    ],
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: 'cover',
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
    'apple-mobile-web-app-capable': 'yes',
    'application-name': SITE_CONFIG.name,
    'msapplication-TileColor': '#000000',
    'theme-color': '#000000',
  },
}

/**
 * Props do componente RootLayout
 * 
 * @typedef {Object} RootLayoutProps
 * @property {React.ReactNode} children - Conteúdo filho que será renderizado dentro do layout
 */

/**
 * Componente RootLayout
 * 
 * Define a estrutura HTML base de todas as páginas da aplicação.
 * Inclui configurações de tema, providers globais e layout fixo com
 * header sticky e footer.
 * 
 * Características:
 * - HTML com lang="pt-BR" para acessibilidade e SEO
 * - suppressHydrationWarning para evitar avisos de hidratação do tema
 * - ThemeProvider para gerenciamento de tema claro/escuro
 * - Navbar sticky no topo (z-50)
 * - Footer fixo na parte inferior
 * - Layout flexbox para garantir footer sempre no final
 * 
 * @param {RootLayoutProps} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Páginas e conteúdo a serem renderizados
 * @returns {JSX.Element} Estrutura HTML completa da aplicação
 * 
 * @example
 * // Este componente é utilizado automaticamente pelo Next.js
 * // Todas as páginas serão automaticamente envolvidas por este layout
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /**
     * Elemento HTML raiz
     * - lang="pt-BR": Define idioma como português brasileiro
     * - suppressHydrationWarning: Suprime avisos de hidratação causados por
     *   alterações de classe (theme) entre servidor e cliente
     */
    <html 
      lang="pt-BR" 
      suppressHydrationWarning 
      className={`${inter.variable} ${orbitron.variable} ${rajdhani.variable}`}
    >
      {/**
       * Body da aplicação
       * - bg-background: Cor de fundo dinâmica baseada no tema
       * - text-foreground: Cor de texto dinâmica baseada no tema
       * - antialiased: Suavização de fonte para melhor legibilidade
       * - min-h-screen: Altura mínima de 100vh
       * - smooth-scroll: Rolagem suave entre seções
       */}
      <body className={`${inter.variable} bg-background text-foreground antialiased min-h-screen smooth-scroll font-sans`}>
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
         * Vercel Analytics
         * 
         * Rastreia métricas de performance e analytics do site.
         * Não afeta performance e respeita privacidade.
         */}
        <Analytics />
      </body>
    </html>
  )
}