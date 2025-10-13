/**
 * Página Blog
 * 
 * Página de listagem de artigos e posts do blog.
 * Exibe grid responsivo de cards de posts com informações
 * como título, descrição, data, categoria e imagem de destaque.
 * 
 * Layout:
 * - Header centralizado com título e descrição
 * - Grid 2 colunas em desktop, 1 coluna em mobile
 * - Efeitos visuais cyberpunk no dark mode
 * - Partículas animadas sutis no fundo (dark mode)
 * 
 * @fileoverview Página de blog com grid de posts
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

import { PostCard } from "@/components/blog/post-card"
import { SECTION_CLASSES } from "@/lib/utils"

/**
 * Componente BlogPage
 * 
 * Renderiza página completa do blog com lista de posts.
 * Posts são definidos localmente (futuramente virão de API/CMS).
 * 
 * @returns {JSX.Element} Página de blog
 * 
 * @example
 * // Rota: /blog
 * // Renderizado automaticamente pelo Next.js App Router
 */
export default function BlogPage() {
  /**
   * Lista de posts do blog
   * 
   * Array de objetos com informações de cada post.
   * Futuramente será substituído por fetch de API ou CMS.
   * 
   * @type {Array<{title: string, description: string, date: string, category: string, link: string, image: string}>}
   */
  const posts = [
    {
      title: "Como criar aplicações React modernas com TypeScript",
      description: "Guia completo sobre as melhores práticas para desenvolvimento com React e TypeScript, incluindo padrões de código, testes e otimização de performance.",
      date: "15 de Janeiro, 2025",
      category: "React",
      link: "#",
      image: "/images/b1.png"
    },
    {
      title: "Arquitetura de microserviços: quando e como usar",
      description: "Análise detalhada sobre quando migrar para microserviços, os benefícios, desafios e estratégias para implementação bem-sucedida.",
      date: "10 de Janeiro, 2025",
      category: "Arquitetura",
      link: "#",
      image: "/images/b2.png"
    },
    {
      title: "Next.js 15: Novidades e melhorias para desenvolvedores",
      description: "Explore as principais funcionalidades do Next.js 15, incluindo App Router, Server Components e otimizações de performance.",
      date: "5 de Janeiro, 2025",
      category: "Next.js",
      link: "#",
      image: "/images/b3.png"
    },
    {
      title: "CI/CD com GitHub Actions: Automatizando deployments",
      description: "Configure pipelines de integração e deploy contínuo usando GitHub Actions para projetos Node.js e React.",
      date: "1 de Janeiro, 2025",
      category: "DevOps",
      link: "#",
      image: "/images/b4.png"
    }
  ]

  return (
    <div className="min-h-screen bg-background dark:bg-gradient-to-b dark:from-black dark:via-gray-900 dark:to-black">
      {/** 
       * Efeito de partículas sutis - apenas no dark mode
       * Três partículas coloridas animadas em posições diferentes
       * - opacity-0 dark:opacity-100: visível apenas no dark
       * - pointer-events-none: não interfere com cliques
       */}
      <div className="fixed inset-0 pointer-events-none opacity-0 dark:opacity-100">
        <div className="absolute top-20 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute top-40 right-1/3 w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse opacity-30" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-1/2 w-0.5 h-0.5 bg-pink-400 rounded-full animate-pulse opacity-35" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/** 
       * Header da página
       * Título, linha decorativa e descrição centralizados
       * Utiliza SECTION_CLASSES.container para padding responsivo
       */}
      <div className={`${SECTION_CLASSES.container} relative z-10`}>
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground dark:text-cyan-200 dark:font-mono dark:tracking-wider">Blog</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary dark:from-cyan-400 dark:to-purple-400 mx-auto mb-6"></div>
          <p className="text-muted-foreground dark:text-gray-300 text-lg max-w-2xl mx-auto dark:font-mono">
            Artigos sobre desenvolvimento, tecnologia e as últimas tendências do mercado
          </p>
        </div>
      </div>

      {/** 
       * Conteúdo da página com grid de posts
       * Grid responsivo: 2 colunas (md+), 1 coluna (mobile)
       * Mapeia array de posts para componentes PostCard
       */}
      <div className="max-w-7xl mx-auto px-6 pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, idx) => (
            <PostCard key={idx} {...post} />
          ))}
        </div>
      </div>
    </div>
  )
}