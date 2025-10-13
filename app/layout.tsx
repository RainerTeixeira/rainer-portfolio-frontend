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
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { SITE_CONFIG } from "@/constants"

/**
 * Metadados da aplicação
 * 
 * Objeto exportado que define metadados HTML para SEO e compartilhamento social.
 * O Next.js utiliza esta exportação para gerar tags <title> e <meta> automaticamente.
 * 
 * @type {Object}
 * @property {string} title - Título da página exibido na aba do navegador
 * @property {string} description - Descrição para SEO e preview em redes sociais
 */
export const metadata = {
  title: `${SITE_CONFIG.name} - Portfólio Profissional`,
  description: SITE_CONFIG.description,
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
    <html lang="pt-BR" suppressHydrationWarning>
      {/**
       * Body da aplicação
       * - bg-background: Cor de fundo dinâmica baseada no tema
       * - text-foreground: Cor de texto dinâmica baseada no tema
       * - antialiased: Suavização de fonte para melhor legibilidade
       * - min-h-screen: Altura mínima de 100vh
       * - smooth-scroll: Rolagem suave entre seções
       */}
      <body className="bg-background text-foreground antialiased min-h-screen smooth-scroll">
        {/**
         * ThemeProvider
         * Contexto para gerenciamento de tema (claro/escuro/sistema)
         * - attribute="class": Alterna tema via classe CSS
         * - defaultTheme="system": Usa preferência do SO por padrão
         * - enableSystem: Permite detecção automática de preferência do SO
         */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
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
        </ThemeProvider>
      </body>
    </html>
  )
}