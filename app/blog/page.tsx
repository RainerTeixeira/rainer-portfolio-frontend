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

console.log('DEBUG: Blog page component loaded');

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
  FeaturedPostsSection,
  NewsletterBox,
  SortControls,
  type SortOption,
  AdvancedSearch,
  InfiniteScroll,
} from '@/components/domain/blog';
import { BackToTop, PageHeader, ParticlesEffect, cn } from '@rainersoft/ui';
import { Card, CardContent } from '@rainersoft/ui';
import { Skeleton } from '@rainersoft/ui';
import { publicBlogPosts } from '@/lib/api';
console.log('DEBUG: publicBlogPosts import:', publicBlogPosts);
import { PostStatus, type PostListItem } from '@/lib/api/types/public/blog';
import { getTokenColor } from '@/lib/utils';
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
  const [allPosts, setAllPosts] = useState<PostListItem[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState<PostListItem[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [hasConnectionError, setHasConnectionError] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [searchResults, setSearchResults] = useState<PostListItem[]>([]);

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
    return allPosts.filter(p => p.category?.name === category).length;
  };

  /**
   * Carrega posts publicados ao montar componente.
   * Busca posts publicados da API e inicializa os estados de posts.
   */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const loadPosts = async () => {
        try {
          setIsLoadingPosts(true);
          const response = await publicBlogPosts.getPublicPosts({
            status: PostStatus.PUBLISHED,
            limit: 50,
          });
          
          console.log('DEBUG: Response from API:', response);
          
          // Lidar com ambos os formatos de resposta
          let posts: PostListItem[] = [];
          if (Array.isArray(response)) {
            console.log('DEBUG: Response is array, using response.data');
            posts = response.data;
          } else if (response && response.data) {
            console.log('DEBUG: Response has data property, using response.data');
            posts = response.data;
          } else {
            console.log('DEBUG: Response format unexpected:', response);
          }
          
          setAllPosts(posts);
          setDisplayedPosts(posts);
          setHasConnectionError(false);
        } catch (error) {
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
          setAllPosts([]);
          setDisplayedPosts([]);
        } finally {
          setIsLoadingPosts(false);
        }
      };
      void loadPosts();
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
        post => post.category?.name === selectedCategory
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
  const featuredPosts = allPosts.filter(post => post.featured === true);
  const uniqueCategories = Array.from(
    new Set(
      allPosts
        .map(post => post.category?.name)
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
      <PageHeader title="Blog de Desenvolvimento" description="Artigos técnicos sobre React, Next.js, TypeScript e desenvolvimento web moderno. Compartilho aprendizados práticos, tutoriais detalhados, soluções para problemas reais e insights sobre as tecnologias que uso nos meus projetos. Conteúdo direto ao ponto, sem enrolação." children={undefined} />

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
                  className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
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

      {/* Seção de busca avançada */}
      <section
        aria-label="Buscar artigos"
        className="max-w-7xl mx-auto px-6 py-8 relative z-10"
      >
        <AdvancedSearch
          onResultsChange={(results: PostListItem[]) => {
            setSearchResults(results);
            setDisplayedPosts(results);
          }}
          onLoadingChange={(loading: boolean) => setIsLoadingPosts(loading)}
        />
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

      {/* Seção principal com Infinite Scroll */}
      <section
        aria-labelledby="posts-heading"
        className="max-w-7xl mx-auto px-6 pb-16 relative z-10"
      >
        {/* Cabeçalho com contador e opções */}
        {!isLoadingPosts && displayedPosts.length > 0 && (
          <Card className="dark:bg-black/30 dark:border-cyan-400/20 mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2
                    id="posts-heading"
                    className="text-2xl font-bold dark:text-cyan-200 dark:font-mono mb-2"
                  >
                    {searchResults.length > 0 ? 'Resultados da Busca' : selectedCategory
                      ? `Categoria: ${selectedCategory}`
                      : 'Todos os Artigos'}
                  </h2>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">
                    {displayedPosts.length}{' '}
                    {displayedPosts.length === 1
                      ? 'artigo encontrado'
                      : 'artigos encontrados'}
                    {searchResults.length > 0 && ' • Busca avançada'}
                    {currentSortOption === 'popular' &&
                      ' • Ordenados por visualizações'}
                    {currentSortOption === 'trending' &&
                      ' • Ordenados por curtidas'}
                    {currentSortOption === 'recent' &&
                      ' • Mais recentes primeiro'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {/* Analytics removido temporariamente */}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Infinite Scroll */}
        <InfiniteScroll
          initialPosts={displayedPosts}
          onLoadMore={async (page: number, limit: number) => {
            // Simular carregamento de mais posts
            const response = await publicBlogPosts.getPublicPosts({
              status: PostStatus.PUBLISHED,
              page,
              limit,
            });
            return response?.data || response || [];
          }}
          hasMore={displayedPosts.length >= 10}
          loadingMore={isLoadingPosts}
          emptyMessage={
            searchResults.length > 0
              ? 'Nenhum post encontrado para sua busca.'
              : selectedCategory
              ? 'Nenhum post nesta categoria.'
              : 'Nenhum post publicado ainda.'
          }
        />
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


