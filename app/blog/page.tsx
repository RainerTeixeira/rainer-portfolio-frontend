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
 * - Integração com blog store (localStorage)
 * - Animações de entrada staggered
 * 
 * @fileoverview Página de blog com grid de posts e visual cyberpunk
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { PostCard } from "@/components/blog/post-card"
import { SearchBar, NewsletterBox } from "@/components/blog"
import { ParticlesEffect, PageHeader, BackToTop } from "@/components/ui"
import { blogStore, type BlogPost } from "@/lib/blog-store"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { TrendingUp, Clock, Eye, Heart, BookOpen, Filter, SortDesc, Star } from "lucide-react"

/**
 * Componente BlogPage
 * 
 * Renderiza página completa do blog com lista de posts.
 * Posts vêm do blogStore (localStorage) com suporte a SSR.
 * 
 * @returns {JSX.Element} Página de blog
 * 
 * @example
 * // Rota: /blog
 * // Renderizado automaticamente pelo Next.js App Router
 */
export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'trending'>('recent')

  /**
   * Effect: Carregar posts do store ao montar
   * Apenas posts publicados são exibidos
   */
  useEffect(() => {
    setIsLoading(true)
    const publishedPosts = blogStore.getPublishedPosts()
    setPosts(publishedPosts)
    setFilteredPosts(publishedPosts)
    setIsLoading(false)
  }, [])

  /**
   * Effect: Filtrar e ordenar posts
   */
  useEffect(() => {
    let result = [...posts]

    // Filtrar por categoria
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory)
    }

    // Ordenar
    if (sortBy === 'popular') {
      result.sort((a, b) => (b.views || 0) - (a.views || 0))
    } else if (sortBy === 'trending') {
      result.sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0))
    } else {
      // recent - já está ordenado
    }

    setFilteredPosts(result)
  }, [selectedCategory, sortBy, posts])

  /**
   * Variantes de animação para container de posts
   * Stagger effect: cada filho aparece sequencialmente
   */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  return (
    <div className="min-h-screen bg-background dark:bg-gradient-to-b dark:from-black dark:via-gray-900 dark:to-black relative overflow-hidden">
      {/** Efeito de partículas decorativas (dark mode) */}
      <ParticlesEffect variant="default" />
      
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)] pointer-events-none" />
      
      {/** Header da página */}
      <PageHeader
        title="Blog de Desenvolvimento"
        description="Artigos técnicos sobre React, Next.js, TypeScript e desenvolvimento web moderno. Compartilho aprendizados práticos, tutoriais detalhados, soluções para problemas reais e insights sobre as tecnologias que uso nos meus projetos. Conteúdo direto ao ponto, sem enrolação."
      />

      {/** Stats Cards */}
      {!isLoading && posts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-6 pb-8 relative z-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="dark:bg-black/30 dark:border-cyan-400/20">
              <CardContent className="p-4 text-center">
                <BookOpen className="h-6 w-6 mx-auto mb-2 text-cyan-400" />
                <div className="text-2xl font-bold dark:text-gray-100">{posts.length}</div>
                <div className="text-xs text-muted-foreground dark:text-gray-400">Artigos</div>
              </CardContent>
            </Card>
            <Card className="dark:bg-black/30 dark:border-purple-400/20">
              <CardContent className="p-4 text-center">
                <Eye className="h-6 w-6 mx-auto mb-2 text-purple-400" />
                <div className="text-2xl font-bold dark:text-gray-100">
                  {posts.reduce((acc, p) => acc + (p.views || 0), 0).toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground dark:text-gray-400">Visualizações</div>
              </CardContent>
            </Card>
            <Card className="dark:bg-black/30 dark:border-pink-400/20">
              <CardContent className="p-4 text-center">
                <Heart className="h-6 w-6 mx-auto mb-2 text-pink-400" />
                <div className="text-2xl font-bold dark:text-gray-100">
                  {posts.reduce((acc, p) => acc + (p.likesCount || 0), 0).toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground dark:text-gray-400">Curtidas</div>
              </CardContent>
            </Card>
            <Card className="dark:bg-black/30 dark:border-orange-400/20">
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-orange-400" />
                <div className="text-2xl font-bold dark:text-gray-100">
                  {posts.filter(p => p.featured).length}
                </div>
                <div className="text-xs text-muted-foreground dark:text-gray-400">Em Destaque</div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}

      {/** Barra de Busca */}
      <div className="max-w-4xl mx-auto px-6 pb-8 relative z-10">
        <SearchBar variant="default" placeholder="Buscar artigos..." />
      </div>

      {/** Filtros e Ordenação */}
      {!isLoading && posts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-6 pb-8 relative z-10"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Filtros de Categoria */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground dark:text-gray-400">
                Categoria:
              </span>
              <Badge 
                variant={!selectedCategory ? "default" : "outline"}
                className="cursor-pointer hover:bg-cyan-400/10"
                onClick={() => setSelectedCategory(null)}
              >
                Todos ({posts.length})
              </Badge>
              {Array.from(new Set(posts.map(p => p.category).filter(Boolean))).map(cat => (
                <Badge 
                  key={cat} 
                  variant={selectedCategory === cat ? "default" : "outline"}
                  className="cursor-pointer hover:bg-cyan-400/10 dark:border-cyan-400/30"
                  onClick={() => setSelectedCategory(cat as string)}
                >
                  {cat} ({posts.filter(p => p.category === cat).length})
                </Badge>
              ))}
            </div>

            {/* Ordenação */}
            <div className="flex items-center gap-2">
              <SortDesc className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground dark:text-gray-400">
                Ordenar:
              </span>
              <div className="flex gap-1">
                <Button
                  variant={sortBy === 'recent' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('recent')}
                  className="text-xs dark:border-cyan-400/30"
                >
                  <Clock className="h-3 w-3 mr-1" />
                  Recentes
                </Button>
                <Button
                  variant={sortBy === 'popular' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('popular')}
                  className="text-xs dark:border-cyan-400/30"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Populares
                </Button>
                <Button
                  variant={sortBy === 'trending' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('trending')}
                  className="text-xs dark:border-cyan-400/30"
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Trending
                </Button>
              </div>
            </div>
          </div>

          {/* Posts em Destaque */}
          {posts.filter(p => p.featured).length > 0 && !selectedCategory && (
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-5 w-5 text-yellow-500" />
                <h3 className="font-bold text-lg dark:text-yellow-200">
                  Posts em Destaque
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.filter(p => p.featured).slice(0, 3).map((post) => (
                  <PostCard
                    key={post.id}
                    title={post.title}
                    description={post.excerpt || post.description || ""}
                    date={post.date}
                    category={post.category}
                    link={`/blog/${post.slug}`}
                    image={post.coverImage || post.image}
                  />
                ))}
              </div>
              <Separator className="my-8 dark:bg-cyan-400/20" />
            </div>
          )}
        </motion.div>
      )}

      {/** Conteúdo da página com grid de posts */}
      <div className="max-w-7xl mx-auto px-6 pb-16 relative z-10">
        {/* Título da Seção */}
        {!isLoading && filteredPosts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold dark:text-cyan-200 dark:font-mono mb-2">
              {selectedCategory ? `Categoria: ${selectedCategory}` : 'Todos os Artigos'}
            </h2>
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              {filteredPosts.length} {filteredPosts.length === 1 ? "artigo encontrado" : "artigos encontrados"}
              {sortBy === 'popular' && ' • Ordenados por visualizações'}
              {sortBy === 'trending' && ' • Ordenados por curtidas'}
              {sortBy === 'recent' && ' • Mais recentes primeiro'}
            </p>
          </div>
        )}

        {/* Loading skeleton */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          /* Mensagem de lista vazia */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 mb-6">
              <svg
                className="w-10 h-10 text-cyan-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 dark:text-cyan-200 dark:font-mono">
              {selectedCategory ? 'Nenhum post nesta categoria' : 'Nenhum post publicado'}
            </h2>
            <p className="text-muted-foreground dark:text-gray-400 mb-6">
              {selectedCategory ? 'Tente selecionar outra categoria ou ver todos os posts.' : 'Ainda não há posts disponíveis. Volte em breve!'}
            </p>
            {selectedCategory && (
              <Button 
                onClick={() => setSelectedCategory(null)}
                variant="outline"
                className="dark:border-cyan-400/30"
              >
                Ver Todos os Posts
              </Button>
            )}
          </motion.div>
        ) : (
          /* Grid de posts com animação staggered */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                description={post.excerpt || post.description || ""}
                date={post.date}
                category={post.category}
                link={`/blog/${post.slug}`}
                image={post.coverImage || post.image}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/** Newsletter Signup */}
      {!isLoading && posts.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto px-6 pb-16 relative z-10"
        >
          <NewsletterBox />
        </motion.div>
      )}

      {/* Back to Top */}
      <BackToTop />
    </div>
  )
}