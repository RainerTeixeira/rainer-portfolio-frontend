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

    
    <div className="min-h-screen bg-background">
      {/* Header da página */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Artigos sobre desenvolvimento, tecnologia e as últimas tendências do mercado
          </p>
        </div>
      </div>

      {/* Conteúdo da página com grid padrão */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, idx) => (
            <PostCard key={idx} {...post} />
          ))}
        </div>
      </div>
    </div>
  )
}