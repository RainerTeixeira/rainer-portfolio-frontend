/**
 * Blog Page Component
 * 
 * Página de listagem de artigos com filtros, ordenação e busca.
 * Grid responsivo de posts com stats, categorias e destaques.
 * 
 * Características:
 * - Cards de estatísticas do blog
 * - Filtros por categoria
 * - Ordenação (recentes, populares, trending)
 * - Posts em destaque
 * - Grid responsivo 2 colunas
 * - Busca de artigos
 * - Newsletter signup
 * - Animações staggered
 * 
 * @fileoverview Página principal de listagem do blog
 * @author Rainer Teixeira
 * @version 2.0.0
 */

"use client"

// ============================================================================
// React & Hooks
// ============================================================================

import { useEffect, useState } from "react"

// ============================================================================
// Third-party Libraries
// ============================================================================

import { motion } from "framer-motion"
import { TrendingUp, Clock, Eye, Heart, BookOpen, Filter, SortDesc, Star } from "lucide-react"

// ============================================================================
// Blog Components
// ============================================================================

import { PostCard } from "@/components/blog/post-card"
import { SearchBar, NewsletterBox } from "@/components/blog"

// ============================================================================
// UI Components
// ============================================================================

import { ParticlesEffect, PageHeader, BackToTop } from "@/components/ui"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// ============================================================================
// Store & Types
// ============================================================================

import { blogStore, type BlogPost } from "@/components/blog/lib/blog-store"

// ============================================================================
// Constants
// ============================================================================

/**
 * Tipos de ordenação disponíveis
 */
type SortOption = 'recent' | 'popular' | 'trending'

/**
 * Número de posts em destaque a exibir
 */
const MAX_FEATURED_POSTS = 3

/**
 * Número de skeleton loaders a exibir
 */
const SKELETON_COUNT = 4

/**
 * Delay entre animações de entrada de posts
 */
const STAGGER_DELAY_SECONDS = 0.1

/**
 * Delay inicial antes de animar posts
 */
const ANIMATION_INITIAL_DELAY = 0.2

// ============================================================================
// Animation Variants
// ============================================================================

/**
 * Variantes de animação para container de posts
 */
const POSTS_CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER_DELAY_SECONDS,
      delayChildren: ANIMATION_INITIAL_DELAY
    }
  }
} as const

// ============================================================================
// Main Component
// ============================================================================

/**
 * Componente principal da Blog Page
 * 
 * Renderiza listagem completa de posts publicados com:
 * - Stats cards do blog
 * - Filtros de categoria
 * - Ordenação múltipla
 * - Busca de artigos
 * - Grid responsivo
 * - Newsletter signup
 * 
 * @returns Página de blog completa
 */
export default function BlogPage() {
  // ============================================================================
  // State
  // ============================================================================
  
  const [allPosts, setAllPosts] = useState<BlogPost[]>([])
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>([])
  const [isLoadingPosts, setIsLoadingPosts] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentSortOption, setCurrentSortOption] = useState<SortOption>('recent')

  // ============================================================================
  // Effects
  // ============================================================================
  
  /**
   * Carrega posts publicados ao montar componente
   */
  useEffect(() => {
    setIsLoadingPosts(true)
    const publishedPosts = blogStore.getPublishedPosts()
    setAllPosts(publishedPosts)
    setDisplayedPosts(publishedPosts)
    setIsLoadingPosts(false)
  }, [])

  /**
   * Filtra e ordena posts quando filtros mudam
   */
  useEffect(() => {
    let processedPosts = [...allPosts]

    // Aplicar filtro de categoria
    if (selectedCategory) {
      processedPosts = processedPosts.filter(
        post => post.category === selectedCategory
      )
    }

    // Aplicar ordenação
    switch (currentSortOption) {
      case 'popular':
        processedPosts.sort((a, b) => (b.views || 0) - (a.views || 0))
        break
      case 'trending':
        processedPosts.sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0))
        break
      case 'recent':
      default:
        // Já ordenado por padrão
        break
    }

    setDisplayedPosts(processedPosts)
  }, [selectedCategory, currentSortOption, allPosts])

  // ============================================================================
  // Computed Values
  // ============================================================================
  
  const totalViews = allPosts.reduce((sum, post) => sum + (post.views || 0), 0)
  const totalLikes = allPosts.reduce((sum, post) => sum + (post.likesCount || 0), 0)
  const featuredPosts = allPosts.filter(post => post.featured)
  const uniqueCategories = Array.from(
    new Set(allPosts.map(post => post.category).filter(Boolean))
  )

  // ============================================================================
  // Render
  // ============================================================================

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

      {/* Cards de estatísticas do blog */}
      {!isLoadingPosts && allPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-6 pb-8 relative z-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Total de artigos */}
            <Card className="dark:bg-black/30 dark:border-cyan-400/20">
              <CardContent className="p-4 text-center">
                <BookOpen className="h-6 w-6 mx-auto mb-2 text-cyan-400" aria-hidden="true" />
                <div className="text-2xl font-bold dark:text-gray-100">
                  {allPosts.length}
                </div>
                <div className="text-xs text-muted-foreground dark:text-gray-400">
                  Artigos
                </div>
              </CardContent>
            </Card>
            
            {/* Total de visualizações */}
            <Card className="dark:bg-black/30 dark:border-purple-400/20">
              <CardContent className="p-4 text-center">
                <Eye className="h-6 w-6 mx-auto mb-2 text-purple-400" aria-hidden="true" />
                <div className="text-2xl font-bold dark:text-gray-100">
                  {totalViews.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground dark:text-gray-400">
                  Visualizações
                </div>
              </CardContent>
            </Card>
            
            {/* Total de curtidas */}
            <Card className="dark:bg-black/30 dark:border-pink-400/20">
              <CardContent className="p-4 text-center">
                <Heart className="h-6 w-6 mx-auto mb-2 text-pink-400" aria-hidden="true" />
                <div className="text-2xl font-bold dark:text-gray-100">
                  {totalLikes.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground dark:text-gray-400">
                  Curtidas
                </div>
              </CardContent>
            </Card>
            
            {/* Posts em destaque */}
            <Card className="dark:bg-black/30 dark:border-orange-400/20">
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-6 w-6 mx-auto mb-2 text-orange-400" aria-hidden="true" />
                <div className="text-2xl font-bold dark:text-gray-100">
                  {featuredPosts.length}
                </div>
                <div className="text-xs text-muted-foreground dark:text-gray-400">
                  Em Destaque
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}

      {/** Barra de Busca */}
      <div className="max-w-4xl mx-auto px-6 pb-8 relative z-10">
        <SearchBar variant="default" placeholder="Buscar artigos..." />
      </div>

      {/* Filtros e ordenação */}
      {!isLoadingPosts && allPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-6 pb-8 relative z-10"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Filtros de categoria */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <span className="text-sm text-muted-foreground dark:text-gray-400">
                Categoria:
              </span>
              <Badge 
                variant={!selectedCategory ? "default" : "outline"}
                className="cursor-pointer hover:bg-cyan-400/10"
                onClick={() => setSelectedCategory(null)}
              >
                Todos ({allPosts.length})
              </Badge>
              {uniqueCategories.map(category => (
                <Badge 
                  key={category} 
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer hover:bg-cyan-400/10 dark:border-cyan-400/30"
                  onClick={() => setSelectedCategory(category as string)}
                >
                  {category} ({allPosts.filter(p => p.category === category).length})
                </Badge>
              ))}
            </div>

            {/* Controles de ordenação */}
            <div className="flex items-center gap-2">
              <SortDesc className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <span className="text-sm text-muted-foreground dark:text-gray-400">
                Ordenar:
              </span>
              <div className="flex gap-1">
                <Button
                  variant={currentSortOption === 'recent' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentSortOption('recent')}
                  className="text-xs dark:border-cyan-400/30"
                  aria-label="Ordenar por mais recentes"
                >
                  <Clock className="h-3 w-3 mr-1" aria-hidden="true" />
                  Recentes
                </Button>
                <Button
                  variant={currentSortOption === 'popular' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentSortOption('popular')}
                  className="text-xs dark:border-cyan-400/30"
                  aria-label="Ordenar por mais populares"
                >
                  <Eye className="h-3 w-3 mr-1" aria-hidden="true" />
                  Populares
                </Button>
                <Button
                  variant={currentSortOption === 'trending' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentSortOption('trending')}
                  className="text-xs dark:border-cyan-400/30"
                  aria-label="Ordenar por trending"
                >
                  <TrendingUp className="h-3 w-3 mr-1" aria-hidden="true" />
                  Trending
                </Button>
              </div>
            </div>
          </div>

          {/* Seção de posts em destaque */}
          {featuredPosts.length > 0 && !selectedCategory && (
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-4">
                <Star className="h-5 w-5 text-yellow-500" aria-hidden="true" />
                <h3 className="font-bold text-lg dark:text-yellow-200">
                  Posts em Destaque
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredPosts.slice(0, MAX_FEATURED_POSTS).map((post) => (
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

      {/* Grid de posts */}
      <div className="max-w-7xl mx-auto px-6 pb-16 relative z-10">
        {/* Cabeçalho da seção */}
        {!isLoadingPosts && displayedPosts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold dark:text-cyan-200 dark:font-mono mb-2">
              {selectedCategory ? `Categoria: ${selectedCategory}` : 'Todos os Artigos'}
            </h2>
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              {displayedPosts.length} {displayedPosts.length === 1 ? "artigo encontrado" : "artigos encontrados"}
              {currentSortOption === 'popular' && ' • Ordenados por visualizações'}
              {currentSortOption === 'trending' && ' • Ordenados por curtidas'}
              {currentSortOption === 'recent' && ' • Mais recentes primeiro'}
            </p>
          </div>
        )}

        {/* Estado de carregamento */}
        {isLoadingPosts ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : displayedPosts.length === 0 ? (
          /* Estado vazio - nenhum post encontrado */
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
            variants={POSTS_CONTAINER_VARIANTS}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {displayedPosts.map((post) => (
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

      {/* Newsletter signup */}
      {!isLoadingPosts && allPosts.length > 0 && (
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