/**
 * Dashboard Page Component
 *
 * Página principal do dashboard administrativo. Interface completa para
 * gerenciar posts do blog com múltiplos modos de exibição (home, editor,
 * lista) e funcionalidades avançadas (CRUD, analytics, métricas).
 *
 * @module app/dashboard/page
 * @fileoverview Dashboard administrativo do blog com gerenciamento completo
 * @author Rainer Teixeira
 * @version 3.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Rota: /dashboard
 * // Modos de exibição via query params:
 * // - /dashboard (home padrão)
 * // - /dashboard?mode=new (criar novo post)
 * // - /dashboard?edit=post-id (editar post)
 * // - /dashboard?view=all (lista de todos os posts)
 * ```
 *
 * Modos de exibição:
 * - **Home**: Perfil, stats, analytics, actions, posts recentes (padrão)
 * - **Editor**: Criar/editar posts com preview em tempo real (mode=new ou edit=id)
 * - **Lista**: Todos os posts com ações CRUD (view=all)
 *
 * Características:
 * - Proteção por autenticação (redireciona para login se não autenticado)
 * - Editor rico Tiptap com preview em tempo real
 * - Gerenciamento completo de posts (CRUD completo)
 * - Analytics e métricas profissionais
 * - Interface profissional com animações suaves
 * - Design responsivo e acessível
 */

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  FileText,
  Loader2,
  Plus,
  Save,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';

import { useAuthContext } from '@/components/providers/auth-context-provider';
import { privateBlogPosts as postsService } from '@/lib/api';
import type { CreatePostDto, UpdatePostDto } from '@/lib/api/types/private/blog';
import type { Post, PostStatus, TiptapJSON, PostListItem } from '@/lib/api/types';
import { BackToTop } from '@rainersoft/ui';
import { Badge } from '@rainersoft/ui';
import { Button } from '@rainersoft/ui';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@rainersoft/ui';
import { Input } from '@rainersoft/ui';
import { Label } from '@rainersoft/ui';
import { Textarea } from '@rainersoft/ui';
import {
  AnalyticsOverview,
  HelpCenter,
  ProfileHeader,
  QuickActions,
  QuickStats,
  RecentPostsList,
  SubcategorySelect,
  ImageUpload,
} from '@/components/domain/dashboard';
import { PostCard } from '@/components/domain/blog/post-card';
import { Editor } from '@/components/domain/dashboard/Editor';
import { tiptapJSONtoHTML } from '@/lib/utils';
import { createEmptyTiptapContent } from '@/lib/utils';
import { cn } from '@rainersoft/ui';
import { textToSlug } from '@/lib/utils';
import { GRADIENT_DIRECTIONS, BACKGROUND } from '@rainersoft/design-tokens';

type ChangeEvent<T = HTMLInputElement> = React.ChangeEvent<T>;

/**
 * Duração de exibição do sucesso de salvamento em milissegundos.
 *
 * @constant {number}
 */
const SAVE_SUCCESS_DISPLAY_MS = 2000;

/**
 * Máximo de posts recentes a exibir na home do dashboard.
 *
 * @constant {number}
 */
const MAX_RECENT_POSTS = 5;

/**
 * Template padrão para criação de novo post.
 *
 * @constant {Partial<CreatePostData>}
 */
const EMPTY_POST_TEMPLATE: Partial<CreatePostDto> = {
  title: '',
  excerpt: '',
  content: JSON.stringify(createEmptyTiptapContent()),
  categoryId: '',
  coverImage: '/images/t1.jpg',
  status: 'DRAFT',
} as const;

/**
 * DashboardPageContent Component
 *
 * Conteúdo interno do Dashboard que gerencia estado e lógica.
 * Separado do componente principal para uso com Suspense boundary.
 *
 * Gerencia:
 * - Estado de autenticação e redirecionamento
 * - Carregamento e gerenciamento de posts
 * - Modos de exibição (home, editor, lista)
 * - Operações CRUD de posts
 * - Preview em tempo real do editor
 *
 * @component
 * @returns {JSX.Element} Conteúdo do dashboard
 *
 * @remarks
 * Este componente é envolvido por Suspense no componente principal
 * para lidar com useSearchParams() do Next.js.
 */
function DashboardPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated, loading: isAuthLoading } = useAuthContext();

  const [allPosts, setAllPosts] = React.useState<PostListItem[]>([]);
  const [filteredPosts, setFilteredPosts] = React.useState<PostListItem[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<'all' | 'PUBLISHED' | 'DRAFT'>('all');
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = React.useState(true);
  const [isSavingPost, setIsSavingPost] = React.useState(false);
  const [hasSaveSucceeded, setHasSaveSucceeded] = React.useState(false);
  const [currentEditingPost, setCurrentEditingPost] = React.useState<
    Partial<CreatePostDto> | PostListItem
  >(EMPTY_POST_TEMPLATE);

  const urlMode = searchParams.get('mode');
  const urlEditId = searchParams.get('edit');
  const urlViewAll = searchParams.get('view');

  const shouldShowHome = !urlMode && !urlEditId && !urlViewAll;

  /**
   * Redireciona para login se não autenticado.
   * Adiciona delay para evitar redirecionamento antes do OAuth completar.
   */
  React.useEffect(() => {
    // Verifica se veio de um callback OAuth (tem 'from=oauth' na URL)
    const isFromOAuth = window.location.search.includes('from=oauth');
    
    if (!isAuthLoading && !isAuthenticated) {
      // Se veio do OAuth, espera um pouco mais para dar tempo do estado atualizar
      if (isFromOAuth) {
        console.log('[Dashboard] Veio do OAuth, aguardando autenticação...');
        setTimeout(() => {
          // Verifica novamente após 2 segundos
          if (!isAuthenticated) {
            console.log('[Dashboard] Ainda não autenticado após OAuth, redirecionando para login');
            router.push('/dashboard/login');
          }
        }, 2000);
      } else {
        console.log('[Dashboard] Não autenticado, redirecionando para login');
        router.push('/dashboard/login');
      }
    }
  }, [isAuthenticated, isAuthLoading, router]);

  /**
   * Carrega posts e verifica parâmetros de URL.
   */
  React.useEffect(() => {
    if (isAuthenticated) {
      loadAllPosts();

      if (urlEditId) {
        // Buscar post específico da API
        postsService
          .getPostsAdmin({ limit: 100, page: 1 })
          .then(response => {
            const post = response.data.find(p => p.id === urlEditId);
            if (post) {
              setCurrentEditingPost(post);
            }
          })
          .catch(error => {
            console.error('Erro ao carregar post:', error);
            toast.error('Erro ao carregar post para edição');
          });
      } else if (urlMode === 'new') {
        startCreatingNewPost();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, urlEditId, urlMode]);

  /**
   * Carrega todos os posts da API.
   */
  const loadAllPosts = React.useCallback(async () => {
    try {
      const response = await postsService.getPostsAdmin({
        limit: 100,
        page: 1,
      });
      if (response.data) {
        setAllPosts(response.data);
        setFilteredPosts(response.data);
      }
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
      toast.error('Erro ao carregar posts');
    }
  }, []);

  /**
   * Filtra posts baseado em busca e status
   */
  React.useEffect(() => {
    let filtered = [...allPosts];

    // Filtro de busca
    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filtro de status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(post => post.status === statusFilter);
    }

    setFilteredPosts(filtered);
  }, [allPosts, searchQuery]);

  /**
   * Reseta dados - removido (não aplicável com API real).
   */
  const handleDataReset = () => {
    toast.info(
      'Esta funcionalidade não está disponível com dados reais da API.'
    );
  };

  /**
   * Inicia criação de novo post.
   */
  const startCreatingNewPost = React.useCallback(() => {
    setCurrentEditingPost(EMPTY_POST_TEMPLATE);
    setIsEditMode(true);
  }, []);

  /**
   * Inicia edição de post existente.
   */
  const startEditingPost = React.useCallback((post: PostListItem) => {
    setCurrentEditingPost(post);
    setIsEditMode(true);
  }, []);

  /**
   * Salva post (criar ou atualizar) - DESABILITADO para PostListItem
   * PostListItem não tem campos necessários para edição (content, status)
   */
  const saveCurrentPost = async () => {
    toast.info('Funcionalidade de edição desabilitada. Use a API admin diretamente.');
  };

  /**
   * Deleta post específico - DESABILITADO para PostListItem
   */
  const deletePost = async (postId: string) => {
    toast.info('Funcionalidade de deleção desabilitada. Use a API admin diretamente.');
  };

  /**
   * Cancela edição atual
   */
  const cancelEditing = () => {
    if (confirm('Descartar alterações?')) {
      setIsEditMode(false);
    }
  };

  /**
   * Renderização condicional baseada no estado de autenticação.
   * Exibe spinner de carregamento enquanto verifica autenticação.
   * Retorna null se não autenticado (redirecionamento é feito no useEffect).
   */
  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-black">
        <Loader2
          className="w-8 h-8 animate-spin text-cyan-400"
          aria-label="Carregando..."
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main
      className="relative w-full min-h-screen overflow-hidden"
      aria-label="Dashboard Principal"
    >
      {/* Camada de gradiente de fundo com efeito blur */}
      {/* Gradiente cyberpunk que cria atmosfera visual no background */}
      <div
        className={cn(
          'fixed inset-0 -z-10',
          BACKGROUND.GRADIENT_OVERLAY,
          'blur-3xl pointer-events-none'
        )}
        aria-hidden="true"
      />

      {/* Partículas decorativas animadas */}
      {/* Efeito visual cyberpunk com partículas pulsantes, visível apenas no dark mode */}
      <div
        className={cn(
          'fixed inset-0 -z-10 pointer-events-none',
          'opacity-0 dark:opacity-100',
          'transition-opacity duration-1000'
        )}
        aria-hidden="true"
      >
        <div
          className={cn(
            'absolute top-[20%] left-[25%]',
            'w-2 h-2',
            'bg-cyan-400',
            'opacity-60',
            'animate-pulse',
            'rounded-full',
            'shadow-lg shadow-cyan-400/50'
          )}
        />
        <div
          className={cn(
            'absolute top-[40%] right-[33%]',
            'w-1.5 h-1.5',
            'bg-purple-400',
            'opacity-40',
            'animate-pulse',
            'rounded-full',
            'shadow-lg shadow-purple-400/50'
          )}
          style={{ animationDelay: '1s' }}
        />
        <div
          className={cn(
            'absolute bottom-[40%] left-1/2',
            'w-1.5 h-1.5',
            'bg-pink-400',
            'opacity-50',
            'animate-pulse',
            'rounded-full',
            'shadow-lg shadow-pink-400/50'
          )}
          style={{ animationDelay: '2s' }}
        />
        <div
          className={cn(
            'absolute top-1/2 right-1/4',
            'w-1 h-1',
            'bg-cyan-300',
            'opacity-30 animate-pulse',
            'rounded-full',
            'shadow-lg shadow-cyan-300/50'
          )}
          style={{ animationDelay: '0.5s' }}
        />
        <div
          className={cn(
            'absolute top-1/3 left-1/3',
            'w-1.5 h-1.5',
            'bg-purple-400',
            'opacity-35 animate-pulse',
            'rounded-full',
            'shadow-lg shadow-purple-400/50'
          )}
          style={{ animationDelay: '1.5s' }}
        />
        <div
          className={cn(
            'absolute bottom-1/3 right-1/3',
            'w-1 h-1',
            'bg-pink-400',
            'opacity-25 animate-pulse',
            'rounded-full',
            'shadow-lg shadow-pink-400/50'
          )}
          style={{ animationDelay: '2.5s' }}
        />
      </div>

      {/* Divisor premium no topo - Cyberpunk */}
      <div
        className={cn(
          'fixed top-0 left-0 right-0 z-20',
          'h-1',
          BACKGROUND.PREMIUM_DIVIDER_LINE
        )}
        aria-hidden="true"
      />

      <div
        className={cn(
          'relative w-full bg-background/80 dark:bg-black/50 backdrop-blur-sm'
        )}
      >
        <div className="w-full mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 space-y-12 xs:space-y-14 sm:space-y-16 md:space-y-20 lg:space-y-24">
          <AnimatePresence mode="wait">
            {shouldShowHome ? (
              /* Home do Dashboard */
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12 xs:space-y-14 sm:space-y-16 md:space-y-20 lg:space-y-24"
              >
                {/* Seção de Perfil */}
                <section id="perfil" aria-labelledby="profile-heading">
                  <ProfileHeader
                    onAvatarChange={file => {
                      console.log('Upload de avatar:', file);
                      // TODO: Implementar upload real
                    }}
                  />
                </section>

                {/* Seção de Estatísticas */}
                <section id="estatisticas" aria-labelledby="stats-heading">
                  <QuickStats />
                </section>

                {/* Analytics Overview */}
                <section id="analytics" aria-labelledby="analytics-heading">
                  <div className="mb-4">
                    <h2
                      id="analytics-heading"
                      className="text-2xl font-bold dark:text-cyan-200 dark:font-mono"
                    >
                      📊 Analytics & Métricas
                    </h2>
                    <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
                      Acompanhe o desempenho do seu conteúdo
                    </p>
                  </div>
                  <AnalyticsOverview />
                </section>

                {/* Seção de Ações e Posts */}
                <section id="posts" aria-labelledby="actions-posts-heading">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Coluna Esquerda: Ações + Help */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="lg:col-span-1 space-y-6"
                    >
                      <QuickActions
                        onNewPost={() => router.push('/dashboard?mode=new')}
                        onViewPosts={() => router.push('/dashboard?view=all')}
                        onViewStats={() => console.log('Ver estatísticas')}
                        onSettings={() => console.log('Configurações')}
                      />
                      <HelpCenter />
                    </motion.div>

                    {/* Posts recentes */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="lg:col-span-2"
                    >
                      <RecentPostsList
                        maxPosts={MAX_RECENT_POSTS}
                        onEditPost={(post: any) =>
                          router.push(`/dashboard?edit=${post.id}`)
                        }
                        onDeletePost={deletePost}
                      />
                    </motion.div>
                  </div>
                </section>
              </motion.div>
            ) : (
              /* Editor ou Lista */
              <motion.div
                key="editor-list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Header da página */}
                <header className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => router.push('/dashboard')}
                      className="dark:text-cyan-400 dark:hover:bg-cyan-400/10"
                      aria-label="Voltar para home do dashboard"
                    >
                      <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <div>
                      <h1 className="text-3xl font-bold dark:text-cyan-200 dark:font-mono">
                        {isEditMode
                          ? 'id' in currentEditingPost && currentEditingPost.id
                            ? 'Editar Post'
                            : 'Novo Post'
                          : 'Todos os Posts'}
                      </h1>
                      <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
                        {isEditMode
                          ? 'Preencha os campos e visualize em tempo real'
                          : `${allPosts.length} ${allPosts.length === 1 ? 'post' : 'posts'} no total`}
                      </p>
                    </div>
                  </div>

                  {!isEditMode && (
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={handleDataReset}
                        variant="outline"
                        size="sm"
                        className="gap-2 dark:border-yellow-400/30 dark:hover:bg-yellow-400/10 dark:text-yellow-400"
                        aria-label="Resetar dados para posts iniciais"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                        Resetar Dados
                      </Button>
                      <Button variant="default" size="lg" onClick={startCreatingNewPost} className="gap-2 dark:bg-cyan-600 dark:hover:bg-cyan-700"
                        aria-label="Criar novo post"
                      >
                        <Plus className="w-4 h-4" aria-hidden="true" />
                        Novo Post
                      </Button>
                    </div>
                  )}
                </header>

                {isEditMode ? (
                  /* Editor de Post */
                  <motion.div
                    key="editor"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                  >
                    {/* Coluna Esquerda: Formulário */}
                    <div className="space-y-6">
                      <Card className="dark:bg-black/50 dark:border-cyan-400/20">
                        <CardHeader>
                          <CardTitle className="dark:text-cyan-200 dark:font-mono">
                            {'id' in currentEditingPost && currentEditingPost.id
                              ? 'Editar Post'
                              : 'Novo Post'}
                          </CardTitle>
                          <CardDescription>
                            Preencha os campos abaixo para criar ou editar um
                            post
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {/* Título */}
                          <div className="space-y-2">
                            <Label htmlFor="title">Título *</Label>
                            <Input type="text" id="title" className="w-full" placeholder="Digite o título do post"
                              value={currentEditingPost.title}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setCurrentEditingPost({
                                  ...currentEditingPost,
                                  title: e.target.value,
                                })
                              }
                            />
                            {/* Preview da URL com slug */}
                            {currentEditingPost.title && (
                              <div className="flex items-center gap-2 p-2 bg-cyan-500/5 dark:bg-cyan-500/5 border border-cyan-400/20 rounded-md">
                                <span className="text-xs text-muted-foreground dark:text-gray-500">
                                  URL:
                                </span>
                                <code className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                                  /blog/
                                  {currentEditingPost.slug ||
                                    textToSlug(currentEditingPost.title)}
                                </code>
                              </div>
                            )}
                          </div>

                          {/* Descrição (Excerpt) */}
                          <div className="space-y-2">
                            <Label htmlFor="excerpt">Descrição/Excerpt</Label>
                            <Textarea
                              id="excerpt"
                              placeholder="Breve descrição do post"
                              value={
                                'excerpt' in currentEditingPost
                                  ? currentEditingPost.excerpt || ''
                                  : ''
                              }
                              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                setCurrentEditingPost({
                                  ...currentEditingPost,
                                  excerpt: e.target.value,
                                })
                              }
                              rows={3}
                            />
                          </div>

                          {/* Subcategoria */}
                          <div className="space-y-2">
                            <Label htmlFor="subcategoryId">
                              Subcategoria *
                            </Label>
                            <SubcategorySelect
                              value={
                                'category' in currentEditingPost && currentEditingPost.category
                                  ? currentEditingPost.category.id || ''
                                  : ''
                              }
                              onChange={(categoryId) =>
                                setCurrentEditingPost({
                                  ...currentEditingPost,
                                  category: (categoryId ? { id: categoryId, name: '', slug: '' } : undefined) as any,
                                })
                              }
                              placeholder="Selecione uma subcategoria"
                            />
                          </div>

                          {/* Imagem de Capa */}
                          <div className="space-y-2">
                            <Label>Imagem de Capa</Label>
                            <ImageUpload
                              value={
                                'coverImage' in currentEditingPost
                                  ? currentEditingPost.coverImage || ''
                                  : ''
                              }
                              onChange={(url) =>
                                setCurrentEditingPost({
                                  ...currentEditingPost,
                                  coverImage: url,
                                })
                              }
                              maxSize={10}
                              type="cover"
                            />
                          </div>

                          {/* Conteúdo (Editor Rico) */}
                          <div className="space-y-2">
                            <Label htmlFor="content">Conteúdo *</Label>
                            <Editor
                              content={
                                currentEditingPost.content || {
                                  type: 'doc',
                                  content: [],
                                }
                              }
                              onChange={data =>
                                setCurrentEditingPost({
                                  ...currentEditingPost,
                                  content: JSON.stringify(data.json),
                                })
                              }
                              placeholder="Escreva o conteúdo do post..."
                            />
                          </div>

                          {/* Status */}
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="published"
                              checked={
                                'status' in currentEditingPost
                                  ? currentEditingPost.status === 'PUBLISHED'
                                  : false
                              }
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setCurrentEditingPost({
                                  ...currentEditingPost,
                                  status: e.target.checked ? 'PUBLISHED' : 'DRAFT',
                                })
                              }
                              className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                            />
                            <Label
                              htmlFor="published"
                              className="cursor-pointer"
                            >
                              Publicar post
                            </Label>
                          </div>

                          {/* Ações */}
                          <div className="flex items-center gap-2 pt-4">
                            <Button
                              onClick={saveCurrentPost}
                              variant="default"
                              size="lg"
                              disabled={isSavingPost}
                              className="flex-1 gap-2 dark:bg-cyan-600 dark:hover:bg-cyan-700"
                            >
                              {isSavingPost ? (
                                <>
                                  <Loader2
                                    className="w-4 h-4 animate-spin"
                                    aria-hidden="true"
                                  />
                                  Salvando...
                                </>
                              ) : hasSaveSucceeded ? (
                                <>
                                  <CheckCircle2
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                  />
                                  Salvo!
                                </>
                              ) : (
                                <>
                                  <Save
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                  />
                                  Salvar
                                </>
                              )}
                            </Button>
                            <Button
                              onClick={cancelEditing}
                              variant="outline"
                              size="lg"
                              disabled={isSavingPost}
                              className="dark:border-cyan-400/30 dark:hover:bg-cyan-400/10"
                            >
                              Cancelar
                            </Button>
                            <Button
                              onClick={() =>
                                setIsPreviewVisible(!isPreviewVisible)
                              }
                              variant="outline"
                              size="icon"
                              className="lg:hidden dark:border-cyan-400/30"
                              aria-label={
                                isPreviewVisible
                                  ? 'Ocultar preview'
                                  : 'Mostrar preview'
                              }
                            >
                              {isPreviewVisible ? (
                                <EyeOff
                                  className="w-4 h-4"
                                  aria-hidden="true"
                                />
                              ) : (
                                <Eye className="w-4 h-4" aria-hidden="true" />
                              )}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Coluna Direita: Preview */}
                    <div
                      className={cn(
                        'space-y-6',
                        !isPreviewVisible && 'hidden lg:block'
                      )}
                    >
                      <Card className="dark:bg-black/50 dark:border-cyan-400/20">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 dark:text-cyan-200 dark:font-mono">
                            <Eye className="w-5 h-5" aria-hidden="true" />
                            Preview em Tempo Real
                          </CardTitle>
                          <CardDescription>
                            Visualize como seu post aparecerá
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <PostCard
                            title={currentEditingPost.title || 'Título do post'}
                            description={
                              ('excerpt' in currentEditingPost &&
                                currentEditingPost.excerpt) ||
                              'Descrição do post aparecerá aqui'
                            }
                            date={
                              'createdAt' in currentEditingPost &&
                              currentEditingPost.createdAt
                                ? new Date(
                                    currentEditingPost.createdAt
                                  ).toLocaleDateString('pt-BR')
                                : undefined
                            }
                            category={
                              ('category' in currentEditingPost &&
                                currentEditingPost.category &&
                                currentEditingPost.category.name) ||
                              undefined
                            }
                            image={
                              ('coverImage' in currentEditingPost &&
                                currentEditingPost.coverImage) ||
                              undefined
                            }
                            link="#preview"
                          />

                          {/* Preview do conteúdo */}
                          {currentEditingPost.content && (
                            <div className="mt-6 p-6 rounded-lg border border-border dark:border-cyan-400/20 bg-background dark:bg-black/30">
                              <h3 className="text-sm font-semibold mb-4 text-muted-foreground dark:text-cyan-400 font-mono">
                                CONTEÚDO
                              </h3>
                              <div
                                className={cn(
                                  'prose prose-sm dark:prose-invert max-w-none',
                                  'prose-headings:dark:text-cyan-200',
                                  'prose-p:dark:text-gray-300',
                                  'prose-strong:dark:text-cyan-300',
                                  'prose-code:dark:text-pink-400 prose-code:dark:bg-gray-800',
                                  'prose-pre:dark:bg-gray-900 prose-pre:dark:border prose-pre:dark:border-cyan-400/20',
                                  'prose-blockquote:dark:border-cyan-400/50 prose-blockquote:dark:text-gray-400',
                                  'prose-li:dark:text-gray-300',
                                  'prose-a:text-cyan-500 prose-a:hover:text-cyan-400'
                                )}
                                dangerouslySetInnerHTML={{
                                  __html: tiptapJSONtoHTML(
                                    currentEditingPost.content
                                  ),
                                }}
                              />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                ) : (
                  /* Lista de todos os posts */
                  <motion.div
                    key="list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <Card className="dark:bg-black/50 dark:border-cyan-400/20">
                      <CardHeader>
                        <CardTitle className="dark:text-cyan-200 dark:font-mono">
                          Todos os Posts
                        </CardTitle>
                        <CardDescription>
                          {filteredPosts.length} de {allPosts.length}{' '}
                          {allPosts.length === 1 ? 'post' : 'posts'}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Filtros */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Input
                            type="text"
                            placeholder="Buscar por título ou descrição..."
                            value={searchQuery}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                            className="flex-1"
                          />
                          <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'PUBLISHED' | 'DRAFT')}
                            className="px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                          >
                            <option value="all">Todos os Status</option>
                            <option value="PUBLISHED">Publicados</option>
                            <option value="DRAFT">Rascunhos</option>
                          </select>
                        </div>

                        {filteredPosts.length === 0 ? (
                          <div className="text-center py-12">
                            <FileText
                              className="w-12 h-12 mx-auto mb-4 text-muted-foreground"
                              aria-hidden="true"
                            />
                            <p className="text-muted-foreground">
                              {allPosts.length === 0
                                ? 'Nenhum post criado ainda'
                                : 'Nenhum post encontrado com os filtros atuais'}
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {filteredPosts.map((post: PostListItem) => (
                              <motion.div
                                key={post.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center justify-between p-4 rounded-lg border border-border dark:border-cyan-400/20 hover:border-cyan-400/50 dark:hover:border-cyan-400/60 transition-colors group"
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-semibold truncate dark:text-gray-100">
                                      {post.title}
                                    </h3>
                                    {post.status === 'PUBLISHED' ? (
                                      <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30">
                                        Publicado
                                      </Badge>
                                    ) : (
                                      <Badge variant="secondary" className="bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/30">
                                        Rascunho
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground truncate">
                                    {post.excerpt || 'Sem descrição'}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1 font-mono">
                                    {post.category?.name || 'Sem categoria'}{' '}
                                    •{' '}
                                    {new Date(
                                      post.createdAt || post.publishedAt
                                    ).toLocaleDateString('pt-BR')}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                  <Button
                                    onClick={() => startEditingPost(post)}
                                    variant="outline"
                                    size="sm"
                                    className="dark:border-cyan-400/30 dark:hover:bg-cyan-400/10"
                                  >
                                    Editar
                                  </Button>
                                  <Button
                                    onClick={() => deletePost(post.id)}
                                    variant="outline"
                                    size="icon"
                                    className="dark:border-red-400/30 dark:hover:bg-red-400/10 dark:hover:text-red-400"
                                    aria-label="Deletar post"
                                  >
                                    <Trash2
                                      className="w-4 h-4"
                                      aria-hidden="true"
                                    />
                                  </Button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Botão Back to Top */}
      <BackToTop />
    </main>
  );
}

/**
 * DashboardPage Component (Wrapper)
 *
 * Wrapper do Dashboard com Suspense boundary para gerenciar loading state.
 * Necessário por causa do uso de useSearchParams() do Next.js que requer
 * Suspense em componentes client-side.
 *
 * @component
 * @returns {JSX.Element} Dashboard page com Suspense boundary
 *
 * @remarks
 * O Suspense é necessário porque useSearchParams() pode causar
 * suspensão durante a renderização. O fallback mostra um spinner
 * de carregamento enquanto aguarda.
 */
export default function DashboardPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-background dark:bg-black">
          <Loader2
            className="h-8 w-8 animate-spin text-primary"
            aria-label="Carregando dashboard..."
          />
        </div>
      }
    >
      <DashboardPageContent />
    </React.Suspense>
  );
}

;



