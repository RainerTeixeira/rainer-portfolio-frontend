import { PostCard } from "@/components/blog/post-card"

export default function BlogPage() {
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
      {/* Efeito de partículas sutis - apenas no dark */}
      <div className="fixed inset-0 pointer-events-none opacity-0 dark:opacity-100">
        <div className="absolute top-20 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute top-40 right-1/3 w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse opacity-30" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-1/2 w-0.5 h-0.5 bg-pink-400 rounded-full animate-pulse opacity-35" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Header da página */}
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground dark:text-cyan-200 dark:font-mono dark:tracking-wider">Blog</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary dark:from-cyan-400 dark:to-purple-400 mx-auto mb-6"></div>
          <p className="text-muted-foreground dark:text-gray-300 text-lg max-w-2xl mx-auto dark:font-mono">
            Artigos sobre desenvolvimento, tecnologia e as últimas tendências do mercado
          </p>
        </div>
      </div>

      {/* Conteúdo da página com grid padrão */}
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