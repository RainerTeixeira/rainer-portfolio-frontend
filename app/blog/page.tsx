/**
 * Blog Page Component
 *
 * Página de listagem de artigos com filtros por categoria, ordenação, busca
 * e grid responsivo. Inclui SearchBar, PostCard, NewsletterBox e animações
 * suaves com Framer Motion.
 *
 * @module app/blog/page
 * @fileoverview Página principal de listagem do blog
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Rota: /blog
 * // Renderizada automaticamente pelo Next.js App Router
 * ```
 */

'use client';

// ============================================================================
// REACT & HOOKS
// ============================================================================

import { useEffect, useState } from 'react';

// ============================================================================
// THIRD-PARTY LIBRARIES
// ============================================================================

import { motion } from 'framer-motion';
import { BookOpen, Eye, Heart, TrendingUp } from 'lucide-react';

// ============================================================================
// BLOG COMPONENTS
// ============================================================================

import {
  BlogStatCard,
  CategoryFilter,
  EmptyState,
  FeaturedPostsSection,
  NewsletterBox,
  PostCard,
  SearchBar,
  SortControls,
  type SortOption,
} from '@/components/blog';

// ============================================================================
// UI COMPONENTS
// ============================================================================

import { BackToTop, PageHeader, ParticlesEffect } from '@/components/ui';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// ============================================================================
// API SERVICES & TYPES
// ============================================================================

import { postsService } from '@/lib/api/services';
import type { Post } from '@/lib/api/types';
import { PostStatus } from '@/lib/api/types';

// ============================================================================
// DESIGN TOKENS
// ============================================================================

import { cn } from '@/lib/utils';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

// SortOption type is now exported from SortControls component

/**
 * Configuração de estatística do blog
 *
 * @interface BlogStat
 * @property {React.ComponentType} icon - Componente de ícone do Lucide React
 * @property {string | number} value - Valor da estatística
 * @property {string} label - Label descritivo
 * @property {string} borderColor - Classe CSS para cor da borda
 * @property {string} iconColor - Classe CSS para cor do ícone
 */
interface BlogStat {
  icon: React.ComponentType<{ className?: string }>;
  value: string | number;
  label: string;
  borderColor: string;
  iconColor: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Número máximo de posts em destaque a exibir
 * @type {number}
 * @constant
 */
const MAX_FEATURED_POSTS = 3;

/**
 * Número de skeleton loaders a exibir durante carregamento
 * @type {number}
 * @constant
 */
const SKELETON_COUNT = 4;

/**
 * Delay entre animações de entrada de posts (em segundos)
 * @type {number}
 * @constant
 */
const STAGGER_DELAY_SECONDS = 0.1;

/**
 * Delay inicial antes de animar posts (em segundos)
 * @type {number}
 * @constant
 */
const ANIMATION_INITIAL_DELAY = 0.2;

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

/**
 * Variantes de animação para container de posts
 *
 * Configuração do Framer Motion para animação staggered dos posts.
 * Posts aparecem sequencialmente com delay entre cada um.
 *
 * @type {Object}
 * @constant
 */
const POSTS_CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER_DELAY_SECONDS,
      delayChildren: ANIMATION_INITIAL_DELAY,
    },
  },
} as const;

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * BlogPage Component
 *
 * Componente principal da página de blog com:
 * - Cards de estatísticas do blog
 * - Filtros por categoria
 * - Ordenação múltipla (recentes, populares, trending)
 * - Busca de artigos
 * - Grid responsivo de posts
 * - Posts em destaque
 * - Newsletter signup
 * - Animações staggered suaves
 *
 * @component
 * @returns {JSX.Element} Página de blog completa
 *
 * @remarks
 * Este componente utiliza:
 * - blogStore para gerenciamento de posts
 * - Framer Motion para animações
 * - Filtros e ordenação client-side
 * - Design system com Tailwind CSS
 * - Acessibilidade WCAG AA compliant
 *
 * @see {@link blogStore} Store de gerenciamento de posts
 * @see {@link PostCard} Componente de card de post
 */
export default function BlogPage() {
  // ========================================================================
  // STATE
  // ========================================================================

  /**
   * Todos os posts publicados
   * @type {Post[]}
   */
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  /**
   * Posts filtrados e ordenados para exibição
   * @type {Post[]}
   */
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);

  /**
   * Estado de carregamento dos posts
   * @type {boolean}
   */
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  /**
   * Categoria selecionada para filtro (null = todas)
   * @type {string | null}
   */
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  /**
   * Opção de ordenação atual
   * @type {SortOption}
   */
  const [currentSortOption, setCurrentSortOption] =
    useState<SortOption>('recent');

  /**
   * Conta posts por categoria
   * @param {string} category - Categoria para contar
   * @returns {number} Número de posts na categoria
   */
  const getCategoryCount = (category: string): number => {
    return allPosts.filter(p => p.subcategory?.name === category).length;
  };

  // ========================================================================
  // EFFECTS
  // ========================================================================

  /**
   * Carrega posts publicados ao montar componente
   *
   * Busca todos os posts publicados da API e inicializa
   * os estados de posts.
   */
  useEffect(() => {
    const loadPosts = async () => {
      setIsLoadingPosts(true);
      try {
        const response = await postsService.listPosts({
          status: PostStatus.PUBLISHED,
          limit: 100, // Carregar muitos posts inicialmente
        });
        if (response.success && response.posts) {
          setAllPosts(response.posts);
          setDisplayedPosts(response.posts);
        }
      } catch (error) {
        console.error('Erro ao carregar posts:', error);
        setAllPosts([]);
        setDisplayedPosts([]);
      } finally {
        setIsLoadingPosts(false);
      }
    };
    loadPosts();
  }, []);

  /**
   * Filtra e ordena posts quando filtros mudam
   *
   * Aplica filtro de categoria e ordenação conforme seleção do usuário.
   * Executa sempre que selectedCategory, currentSortOption ou allPosts mudam.
   */
  useEffect(() => {
    let processedPosts = [...allPosts];

    // Aplicar filtro de categoria
    if (selectedCategory) {
      processedPosts = processedPosts.filter(
        post => post.subcategory?.name === selectedCategory
      );
    }

    // Aplicar ordenação
    switch (currentSortOption) {
      case 'popular':
        processedPosts.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case 'trending':
        processedPosts.sort(
          (a, b) => (b.likesCount || 0) - (a.likesCount || 0)
        );
        break;
      case 'recent':
      default:
        // Já ordenado por padrão (mais recentes primeiro)
        break;
    }

    setDisplayedPosts(processedPosts);
  }, [selectedCategory, currentSortOption, allPosts]);

  // ========================================================================
  // COMPUTED VALUES
  // ========================================================================

  /**
   * Total de visualizações de todos os posts
   * @type {number}
   */
  const totalViews = allPosts.reduce((sum, post) => sum + (post.views || 0), 0);

  /**
   * Total de curtidas de todos os posts
   * @type {number}
   */
  const totalLikes = allPosts.reduce(
    (sum, post) => sum + (post.likesCount || 0),
    0
  );

  /**
   * Posts marcados como em destaque
   * @type {Post[]}
   */
  const featuredPosts = allPosts.filter(post => post.featured);

  /**
   * Categorias únicas de todos os posts
   * @type {string[]}
   */
  const uniqueCategories = Array.from(
    new Set(
      allPosts
        .map(post => post.subcategory?.name)
        .filter((name): name is string => Boolean(name))
    )
  );

  /**
   * Configuração dos cards de estatísticas
   * @type {BlogStat[]}
   */
  const blogStats: BlogStat[] = [
    {
      icon: BookOpen,
      value: allPosts.length,
      label: 'Artigos',
      borderColor: 'dark:border-cyan-400/20',
      iconColor: 'text-cyan-400',
    },
    {
      icon: Eye,
      value: totalViews.toLocaleString(),
      label: 'Visualizações',
      borderColor: 'dark:border-purple-400/20',
      iconColor: 'text-purple-400',
    },
    {
      icon: Heart,
      value: totalLikes.toLocaleString(),
      label: 'Curtidas',
      borderColor: 'dark:border-pink-400/20',
      iconColor: 'text-pink-400',
    },
    {
      icon: TrendingUp,
      value: featuredPosts.length,
      label: 'Em Destaque',
      borderColor: 'dark:border-orange-400/20',
      iconColor: 'text-orange-400',
    },
  ];

  // ========================================================================
  // MAIN RENDER
  // ========================================================================

  return (
    <div
      className={cn(
        'min-h-screen relative overflow-hidden bg-background dark:bg-black'
      )}
    >
      {/* ================================================================
          PARTICLES EFFECT
          ================================================================ */}

      <ParticlesEffect variant="default" />

      {/* ================================================================
          PAGE HEADER
          ================================================================ */}

      <PageHeader
        title="Blog de Desenvolvimento"
        description="Artigos técnicos sobre React, Next.js, TypeScript e desenvolvimento web moderno. Compartilho aprendizados práticos, tutoriais detalhados, soluções para problemas reais e insights sobre as tecnologias que uso nos meus projetos. Conteúdo direto ao ponto, sem enrolação."
      />

      {/* ================================================================
          BLOG STATISTICS CARDS
          ================================================================ */}

      {!isLoadingPosts && allPosts.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          aria-labelledby="blog-stats-heading"
          className="max-w-7xl mx-auto px-6 py-8 relative z-10"
        >
          <h2 id="blog-stats-heading" className="sr-only">
            Estatísticas do Blog
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {blogStats.map(stat => (
              <BlogStatCard
                key={stat.label}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                borderColor={stat.borderColor}
                iconColor={stat.iconColor}
              />
            ))}
          </div>
        </motion.section>
      )}

      {/* ================================================================
          SEARCH BAR
          ================================================================ */}

      <section
        aria-label="Buscar artigos"
        className="max-w-4xl mx-auto px-6 py-8 relative z-10"
      >
        <SearchBar variant="default" placeholder="Buscar artigos..." />
      </section>

      {/* ================================================================
          FILTERS & SORTING
          ================================================================ */}

      {!isLoadingPosts && allPosts.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          aria-labelledby="filters-heading"
          className="max-w-7xl mx-auto px-6 py-8 relative z-10"
        >
          <h2 id="filters-heading" className="sr-only">
            Filtros e Ordenação
          </h2>
          <Card className="dark:bg-black/30 dark:border-cyan-400/20 mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <CategoryFilter
                  categories={uniqueCategories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  totalPosts={allPosts.length}
                  getCategoryCount={getCategoryCount}
                />
                <SortControls
                  currentSort={currentSortOption}
                  onSortChange={setCurrentSortOption}
                />
              </div>
            </CardContent>
          </Card>

          {/* Featured Posts Section */}
          {featuredPosts.length > 0 && !selectedCategory && (
            <FeaturedPostsSection
              posts={featuredPosts}
              maxPosts={MAX_FEATURED_POSTS}
            />
          )}
        </motion.section>
      )}

      {/* ================================================================
          POSTS GRID
          ================================================================ */}

      <section
        aria-labelledby="posts-heading"
        className="max-w-7xl mx-auto px-6 pb-16 relative z-10"
      >
        {/* Section Header */}
        {!isLoadingPosts && displayedPosts.length > 0 && (
          <Card className="dark:bg-black/30 dark:border-cyan-400/20 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2
                    id="posts-heading"
                    className="text-2xl font-bold dark:text-cyan-200 dark:font-mono mb-2"
                  >
                    {selectedCategory
                      ? `Categoria: ${selectedCategory}`
                      : 'Todos os Artigos'}
                  </h2>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">
                    {displayedPosts.length}{' '}
                    {displayedPosts.length === 1
                      ? 'artigo encontrado'
                      : 'artigos encontrados'}
                    {currentSortOption === 'popular' &&
                      ' • Ordenados por visualizações'}
                    {currentSortOption === 'trending' &&
                      ' • Ordenados por curtidas'}
                    {currentSortOption === 'recent' &&
                      ' • Mais recentes primeiro'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {isLoadingPosts ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            role="status"
            aria-label="Carregando posts..."
          >
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
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            role="status"
            aria-live="polite"
          >
            <EmptyState
              title={
                selectedCategory
                  ? 'Nenhum post nesta categoria'
                  : 'Nenhum post publicado'
              }
              description={
                selectedCategory
                  ? 'Tente selecionar outra categoria ou ver todos os posts.'
                  : 'Ainda não há posts disponíveis. Volte em breve!'
              }
              actionLabel={selectedCategory ? 'Ver Todos os Posts' : undefined}
              onAction={
                selectedCategory ? () => setSelectedCategory(null) : undefined
              }
            />
          </motion.div>
        ) : (
          /* Posts Grid with Staggered Animation */
          <motion.div
            variants={POSTS_CONTAINER_VARIANTS}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            role="list"
            aria-label="Lista de posts do blog"
          >
            {displayedPosts.map(post => (
              <article key={post.id} role="listitem">
                <PostCard
                  title={post.title}
                  description={post.excerpt || ''}
                  date={
                    post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString('pt-BR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })
                      : new Date(post.createdAt).toLocaleDateString('pt-BR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })
                  }
                  category={post.subcategory?.name}
                  link={`/blog/${post.slug}`}
                  image={post.coverImage}
                />
              </article>
            ))}
          </motion.div>
        )}
      </section>

      {/* ================================================================
          NEWSLETTER SIGNUP
          ================================================================ */}

      {!isLoadingPosts && allPosts.length > 0 && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          aria-labelledby="newsletter-heading"
          className="max-w-4xl mx-auto px-6 pb-16 relative z-10"
        >
          <h2 id="newsletter-heading" className="sr-only">
            Newsletter
          </h2>
          <NewsletterBox />
        </motion.section>
      )}

      {/* ================================================================
          BACK TO TOP BUTTON
          ================================================================ */}

      <BackToTop />
    </div>
  );
}
