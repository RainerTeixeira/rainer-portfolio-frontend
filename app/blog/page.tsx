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

/**
 * Imports de React e hooks essenciais.
 * useState para gerenciamento de estado local e useEffect para efeitos colaterais.
 */
import { useEffect, useState } from 'react';

/**
 * Imports de bibliotecas de terceiros.
 * Framer Motion para animações suaves e Lucide React para ícones.
 */
import { motion } from 'framer-motion';
import { AlertCircle, BookOpen, Database, Eye, Heart, TrendingUp } from 'lucide-react';

/**
 * Imports de componentes do blog.
 * Componentes especializados para funcionalidades específicas da página de blog.
 */
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
import { BackToTop, PageHeader, ParticlesEffect } from '@rainersoft/ui';
import { Card, CardContent } from '@rainersoft/ui';
import { Skeleton } from '@rainersoft/ui';
import { postsService } from '@/lib/api/services';
import type { Post } from '@/lib/api/types/posts';
import { PostStatus } from '@/lib/api/types/posts';
import { cn } from '@/lib/portfolio';
import { getTokenColor } from '@/lib/portfolio/tokens';
import { useTheme } from 'next-themes';
import { hexToRGB, hexToRGBA } from '@rainersoft/ui';

/**
 * Configuração de estatística do blog.
 *
 * @interface BlogStat
 */
interface BlogStat {
  /** Componente de ícone do Lucide React */
  icon: React.ComponentType<{ className?: string }>;
  /** Valor da estatística */
  value: string | number;
  /** Label descritivo */
  label: string;
  /** Classe CSS para cor da borda */
  borderColor: string;
  /** Classe CSS para cor do ícone */
  iconColor: string;
}

/**
 * Número máximo de posts em destaque a exibir.
 *
 * @constant {number}
 */
const MAX_FEATURED_POSTS = 3;

/**
 * Número de skeleton loaders a exibir durante carregamento.
 *
 * @constant {number}
 */
const SKELETON_COUNT = 4;

/**
 * Delay entre animações de entrada de posts (em segundos).
 *
 * @constant {number}
 */
const STAGGER_DELAY_SECONDS = 0.1;

/**
 * Delay inicial antes de animar posts (em segundos).
 *
 * @constant {number}
 */
const ANIMATION_INITIAL_DELAY = 0.2;

/**
 * Variantes de animação para container de posts.
 * Configuração do Framer Motion para animação staggered dos posts.
 * Posts aparecem sequencialmente com delay entre cada um.
 *
 * @constant {Object}
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

/**
 * Helper para cores do card de erro de conexão, baseadas em tokens.
 */
function getErrorColors(theme: 'dark' | 'light') {
  const base = getTokenColor(theme, 'red', 500, '#ef4444');
  return {
    border: base,
    background: hexToRGBA(base, theme === 'dark' ? 0.1 : 0.05),
    iconBackground: base,
    icon: base,
    title: getTokenColor(theme, 'red', 600, '#dc2626'),
    text: getTokenColor(theme, 'red', 400, '#f87171'),
  } as const;
}

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
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  /**
   * Estado de gerenciamento de posts.
   * allPosts: Todos os posts carregados da API.
   * displayedPosts: Posts filtrados e ordenados para exibição.
   * isLoadingPosts: Flag de carregamento para mostrar skeleton loaders.
   */
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [hasConnectionError, setHasConnectionError] = useState(false);

  /**
   * Estado de filtros e ordenação.
   * selectedCategory: Categoria selecionada para filtro (null = todas).
   * currentSortOption: Opção de ordenação atual (recent, popular, trending).
   */
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentSortOption, setCurrentSortOption] =
    useState<SortOption>('recent');

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkTheme = mounted ? resolvedTheme === 'dark' : false;

  /**
   * Conta posts por categoria.
   *
   * @param {string} category - Categoria para contar
   * @returns {number} Número de posts na categoria
   */
  const getCategoryCount = (category: string): number => {
    return allPosts.filter(p => p.subcategory?.name === category).length;
  };

  /**
   * Carrega posts publicados ao montar componente.
   * Busca todos os posts publicados da API e inicializa os estados de posts.
   * OTIMIZADO: Usa setTimeout para evitar violações de performance no mount.
   */
  useEffect(() => {
    // Usar setTimeout para evitar violações de performance no mount
    const timeoutId = setTimeout(() => {
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
          // Detectar erros de conexão (banco de dados não disponível)
          const isConnectionError = 
            error instanceof Error && 
            (error.message.includes('Failed to fetch') || 
             error.message.includes('ERR_CONNECTION_REFUSED') ||
             error.message.includes('Conexão falhou') ||
             error.message.includes('NetworkError'));
          
          if (isConnectionError) {
            setHasConnectionError(true);
          } else {
            console.error('Erro ao carregar posts:', error);
          }
          // Em caso de erro, usar array vazio (página mostrará estado vazio)
          setAllPosts([]);
          setDisplayedPosts([]);
        } finally {
          setIsLoadingPosts(false);
        }
      };
      loadPosts();
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  /**
   * Filtra e ordena posts quando filtros mudam.
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

  /**
   * Valores computados para estatísticas e dados derivados.
   * Calculados a partir de allPosts para exibição em cards e filtros.
   */
  const totalViews = allPosts.reduce((sum, post) => sum + (post.views || 0), 0);
  const totalLikes = allPosts.reduce(
    (sum, post) => sum + (post.likesCount || 0),
    0
  );
  const featuredPosts = allPosts.filter(post => post.featured);
  const uniqueCategories = Array.from(
    new Set(
      allPosts
        .map(post => post.subcategory?.name)
        .filter((name): name is string => Boolean(name))
    )
  );

  /**
   * Configuração de cards de estatísticas do blog.
   * Array de objetos contendo ícones, valores e estilos para cada métrica.
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

  return (
    <div
      className={cn(
        'min-h-screen relative overflow-hidden bg-background dark:bg-black'
      )}
    >
      {/* Efeito de partículas decorativo no background */}
      <ParticlesEffect variant="default" />

      {/* Cabeçalho da página com título e descrição */}
      <PageHeader
        title="Blog de Desenvolvimento"
        description="Artigos técnicos sobre React, Next.js, TypeScript e desenvolvimento web moderno. Compartilho aprendizados práticos, tutoriais detalhados, soluções para problemas reais e insights sobre as tecnologias que uso nos meus projetos. Conteúdo direto ao ponto, sem enrolação."
      />

      {/* Mensagem de erro de conexão com banco de dados */}
      {hasConnectionError && !isLoadingPosts && (
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto px-6 py-8 relative z-10"
        >
          {/** Cores do card de erro baseadas em tokens */}
          {(() => {
            const errorColors = getErrorColors(isDarkTheme ? 'dark' : 'light');
            return (
          <Card
            className="border-2"
            style={{
              borderColor: errorColors.border,
              backgroundColor: errorColors.background,
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: errorColors.iconBackground,
                  }}
                >
                  <Database className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle
                      className="w-5 h-5"
                      style={{
                        color: errorColors.icon,
                      }}
                    />
                    <h3
                      className="text-lg font-bold"
                      style={{
                        color: errorColors.title,
                      }}
                    >
                      Erro de Conexão
                    </h3>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: errorColors.text,
                    }}
                  >
                    Não foi possível estabelecer conexão com o banco de dados.
                    Por favor, tente novamente mais tarde.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
            );
          })()}
        </motion.section>
      )}

      {/* Seção de estatísticas do blog */}
      {/* Exibe cards com métricas: total de artigos, visualizações, curtidas e posts em destaque */}
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

      {/* Seção de busca de artigos */}
      {/* Barra de pesquisa para filtrar posts por texto */}
      <section
        aria-label="Buscar artigos"
        className="max-w-4xl mx-auto px-6 py-8 relative z-10"
      >
        <SearchBar variant="default" placeholder="Buscar artigos..." />
      </section>

      {/* Seção de filtros e ordenação */}
      {/* Controles para filtrar por categoria e ordenar posts (recentes, populares, trending) */}
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

          {/* Seção de posts em destaque */}
          {/* Exibe até MAX_FEATURED_POSTS posts marcados como featured, apenas quando nenhuma categoria está selecionada */}
          {featuredPosts.length > 0 && !selectedCategory && (
            <FeaturedPostsSection
              posts={featuredPosts}
              maxPosts={MAX_FEATURED_POSTS}
            />
          )}
        </motion.section>
      )}

      {/* Seção principal de listagem de posts */}
      {/* Grid responsivo com todos os posts filtrados e ordenados, com animações staggered */}
      <section
        aria-labelledby="posts-heading"
        className="max-w-7xl mx-auto px-6 pb-16 relative z-10"
      >
        {/* Cabeçalho da seção com contador e informações de ordenação */}
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

        {/* Estado de carregamento */}
        {/* Exibe skeleton loaders enquanto posts estão sendo carregados da API */}
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
          /* Estado vazio - Exibido quando não há posts para mostrar (filtro sem resultados ou nenhum post publicado) */
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
          /* Grid de posts com animação staggered - Renderiza todos os posts filtrados em grid responsivo com animação sequencial */
          <motion.div
            variants={POSTS_CONTAINER_VARIANTS}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            role="list"
            aria-label="Lista de posts do blog"
          >
            {displayedPosts.map(post => (
              /* Artigo principal com conteúdo renderizado */
              <article key={post.id} role="listitem">
                <PostCard
                  title={post.title}
                  description={post.excerpt || ''}
                  // Passar data crua (ISO) para o PostCard, que formata de forma relativa
                  date={post.publishedAt || post.createdAt}
                  category={post.subcategory?.name}
                  link={`/blog/${post.slug}`}
                  image={post.coverImage}
                />
              </article>
            ))}
          </motion.div>
        )}
      </section>

      {/* Seção de newsletter */}
      {/* Box de inscrição na newsletter, exibido apenas quando há posts publicados */}
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

      {/* Botão de voltar ao topo */}
      <BackToTop />
    </div>
  );
}


