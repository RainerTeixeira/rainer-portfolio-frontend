/**
 * Dashboard Page Component
 * 
 * Página principal do dashboard administrativo.
 * Interface completa para gerenciar posts do blog.
 * 
 * Modos de exibição:
 * - **Home**: Perfil, stats, analytics, actions, posts recentes (padrão)
 * - **Editor**: Criar/editar posts com preview (mode=new ou edit=id)
 * - **Lista**: Todos os posts com ações (view=all)
 * 
 * Características:
 * - Proteção por autenticação
 * - Editor rico Tiptap com preview em tempo real
 * - Gerenciamento completo de posts (CRUD)
 * - Analytics e métricas
 * - Interface profissional com animações
 * 
 * @fileoverview Dashboard administrativo do blog
 * @author Rainer Teixeira
 * @version 3.0.0
 */

"use client"

// ============================================================================
// React & Next.js
// ============================================================================

import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"

// ============================================================================
// Third-party Libraries
// ============================================================================

import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  FileText,
  Loader2,
  Plus,
  Save,
  Trash2
} from "lucide-react"
import { toast } from "sonner"

// ============================================================================
// Providers & Auth
// ============================================================================

import { useAuth } from "@/components/providers/auth-provider"

// ============================================================================
// Store & Types
// ============================================================================

import { blogStore, type BlogPost } from "@/components/blog/lib/blog-store"
import type { TiptapJSON } from "@/types/database"

// ============================================================================
// UI Components
// ============================================================================

import { BackToTop } from "@/components/ui"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// ============================================================================
// Dashboard Components
// ============================================================================

import {
  AnalyticsOverview,
  HelpCenter,
  ProfileHeader,
  QuickActions,
  QuickStats,
  RecentPostsList
} from "@/components/dashboard"

// ============================================================================
// Blog Components
// ============================================================================

import { PostCard } from "@/components/blog/post-card"
import { Editor } from "@/components/dashboard/Editor"

// ============================================================================
// Utils
// ============================================================================

import { tiptapJSONtoHTML } from "@/components/dashboard/lib/tiptap-utils"
import { textToSlug } from "@/lib/api-helpers"
import { cn } from "@/lib/utils"

// ============================================================================
// Constants
// ============================================================================

/**
 * Delay de simulação de salvamento em ms
 */
const SAVE_DELAY_MS = 500

/**
 * Duração de exibição do sucesso de salvamento em ms
 */
const SAVE_SUCCESS_DISPLAY_MS = 2000

/**
 * Máximo de posts recentes a exibir na home
 */
const MAX_RECENT_POSTS = 5

/**
 * Post padrão vazio para novo post
 */
const EMPTY_POST_TEMPLATE: Partial<BlogPost> = {
  title: "",
  description: "",
  content: { type: "doc", content: [] },
  category: "",
  image: "/images/b1.png",
  author: "Rainer Teixeira",
  published: false,
  date: new Date().toLocaleDateString("pt-BR", { 
    day: "numeric", 
    month: "long", 
    year: "numeric" 
  })
} as const

// ============================================================================
// Sub-component (Dashboard Content)
// ============================================================================

/**
 * Conteúdo interno do Dashboard
 * 
 * Gerencia estado e lógica do dashboard.
 * Separado para uso com Suspense.
 */
function DashboardPageContent() {
  // ============================================================================
  // Hooks
  // ============================================================================
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth()
  
  // ============================================================================
  // State
  // ============================================================================
  
  const [allPosts, setAllPosts] = useState<BlogPost[]>([])
  const [isEditMode, setIsEditMode] = useState(false)
  const [isPreviewVisible, setIsPreviewVisible] = useState(true)
  const [isSavingPost, setIsSavingPost] = useState(false)
  const [hasSaveSucceeded, setHasSaveSucceeded] = useState(false)
  const [currentEditingPost, setCurrentEditingPost] = useState<Partial<BlogPost>>(EMPTY_POST_TEMPLATE)
  
  // ============================================================================
  // URL Parameters
  // ============================================================================
  
  const urlMode = searchParams.get('mode')
  const urlEditId = searchParams.get('edit')
  const urlViewAll = searchParams.get('view')
  
  const shouldShowHome = !urlMode && !urlEditId && !urlViewAll

  // ============================================================================
  // Effects
  // ============================================================================
  
  /**
   * Redireciona para login se não autenticado
   */
  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.push("/dashboard/login")
    }
  }, [isAuthenticated, isAuthLoading, router])

  /**
   * Carrega posts e verifica parâmetros de URL
   */
  useEffect(() => {
    if (isAuthenticated) {
      loadAllPosts()
      
      if (urlEditId) {
        const postToEdit = blogStore.getPosts().find(p => p.id === urlEditId)
        if (postToEdit) {
          startEditingPost(postToEdit)
        }
      } else if (urlMode === 'new') {
        startCreatingNewPost()
      }
    }
  }, [isAuthenticated, urlEditId, urlMode])

  // ============================================================================
  // Handler Functions
  // ============================================================================
  
  /**
   * Carrega todos os posts do store
   */
  const loadAllPosts = () => {
    const posts = blogStore.getPosts()
    setAllPosts(posts)
  }

  /**
   * Reseta dados para posts iniciais mock
   */
  const handleDataReset = () => {
    if (confirm("Isso irá resetar todos os posts para os dados iniciais. Deseja continuar?")) {
      blogStore.reset()
      loadAllPosts()
      setIsEditMode(false)
      toast.success("Dados resetados com sucesso! Agora você pode criar novos posts.")
    }
  }

  /**
   * Inicia criação de novo post
   */
  const startCreatingNewPost = () => {
    setCurrentEditingPost(EMPTY_POST_TEMPLATE)
    setIsEditMode(true)
  }

  /**
   * Inicia edição de post existente
   */
  const startEditingPost = (post: BlogPost) => {
    setCurrentEditingPost(post)
    setIsEditMode(true)
  }

  /**
   * Salva post (criar ou atualizar)
   */
  const saveCurrentPost = async () => {
    if (!currentEditingPost.title || !currentEditingPost.description || !currentEditingPost.content) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }

    setIsSavingPost(true)
    
    // Simula delay de salvamento
    await new Promise(resolve => setTimeout(resolve, SAVE_DELAY_MS))

    try {
      const postData = {
        ...currentEditingPost,
        slug: currentEditingPost.slug || textToSlug(currentEditingPost.title)
      }

      if (currentEditingPost.id) {
        blogStore.updatePost(currentEditingPost.id, postData as BlogPost)
        toast.success("Post atualizado com sucesso!")
      } else {
        blogStore.createPost(postData as Omit<BlogPost, "id" | "createdAt" | "updatedAt">)
        toast.success("Post criado com sucesso!")
      }

      setHasSaveSucceeded(true)
      setTimeout(() => setHasSaveSucceeded(false), SAVE_SUCCESS_DISPLAY_MS)
      
      loadAllPosts()
      setIsEditMode(false)
    } catch (error) {
      console.error("Erro ao salvar post:", error)
      toast.error("Erro ao salvar post. Tente novamente.")
    } finally {
      setIsSavingPost(false)
    }
  }

  /**
   * Deleta post específico
   */
  const deletePost = (postId: string) => {
    if (confirm("Tem certeza que deseja deletar este post?")) {
      blogStore.deletePost(postId)
      toast.success("Post deletado com sucesso!")
      loadAllPosts()
      if (currentEditingPost.id === postId) {
        setIsEditMode(false)
      }
    }
  }

  /**
   * Cancela edição atual
   */
  const cancelEditing = () => {
    if (confirm("Descartar alterações?")) {
      setIsEditMode(false)
    }
  }

  // ============================================================================
  // Render Guards
  // ============================================================================
  
  // Estado de carregamento
  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-black">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" aria-label="Carregando..." />
      </div>
    )
  }

  // Não autenticado
  if (!isAuthenticated) {
    return null
  }

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <main className="w-full min-h-screen bg-background" aria-label="Dashboard Principal">
      <div className="relative z-10 bg-background dark:bg-gradient-to-b dark:from-black dark:via-gray-900 dark:to-black">
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
                  onAvatarChange={(file) => {
                    console.log('Upload de avatar:', file)
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
                  <h2 id="analytics-heading" className="text-2xl font-bold dark:text-cyan-200 dark:font-mono">
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
                      onEditPost={(post) => router.push(`/dashboard?edit=${post.id}`)}
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
                    onClick={() => router.push("/dashboard")}
                    className="dark:text-cyan-400 dark:hover:bg-cyan-400/10"
                    aria-label="Voltar para home do dashboard"
                  >
                    <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                  </Button>
                  <div>
                    <h1 className="text-3xl font-bold dark:text-cyan-200 dark:font-mono">
                      {isEditMode ? (currentEditingPost.id ? "Editar Post" : "Novo Post") : "Todos os Posts"}
                    </h1>
                    <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
                      {isEditMode ? "Preencha os campos e visualize em tempo real" : `${allPosts.length} ${allPosts.length === 1 ? "post" : "posts"} no total`}
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
                    <Button
                      onClick={startCreatingNewPost}
                      className="gap-2 dark:bg-cyan-600 dark:hover:bg-cyan-700"
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
                      {currentEditingPost.id ? "Editar Post" : "Novo Post"}
                    </CardTitle>
                    <CardDescription>
                      Preencha os campos abaixo para criar ou editar um post
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Título */}
                    <div className="space-y-2">
                      <Label htmlFor="title">Título *</Label>
                      <Input
                        id="title"
                        placeholder="Digite o título do post"
                        value={currentEditingPost.title}
                        onChange={(e) => setCurrentEditingPost({ ...currentEditingPost, title: e.target.value })}
                      />
                      {/* Preview da URL com slug */}
                      {currentEditingPost.title && (
                        <div className="flex items-center gap-2 p-2 bg-cyan-500/5 dark:bg-cyan-500/5 border border-cyan-400/20 rounded-md">
                          <span className="text-xs text-muted-foreground dark:text-gray-500">URL:</span>
                          <code className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                            /blog/{currentEditingPost.slug || textToSlug(currentEditingPost.title)}
                          </code>
                        </div>
                      )}
                    </div>

                    {/* Descrição */}
                    <div className="space-y-2">
                      <Label htmlFor="description">Descrição *</Label>
                      <Textarea
                        id="description"
                        placeholder="Breve descrição do post"
                        value={currentEditingPost.description}
                        onChange={(e) => setCurrentEditingPost({ ...currentEditingPost, description: e.target.value })}
                        rows={3}
                      />
                    </div>

                    {/* Categoria e Imagem */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Categoria</Label>
                        <Input
                          id="category"
                          placeholder="Ex: React & TypeScript"
                          value={currentEditingPost.category}
                          onChange={(e) => setCurrentEditingPost({ ...currentEditingPost, category: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="image">Imagem</Label>
                        <Input
                          id="image"
                          placeholder="/images/b1.png"
                          value={currentEditingPost.image}
                          onChange={(e) => setCurrentEditingPost({ ...currentEditingPost, image: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Conteúdo (Editor Rico) */}
                    <div className="space-y-2">
                      <Label htmlFor="content">Conteúdo *</Label>
                      <Editor
                        content={currentEditingPost.content || { type: "doc", content: [] }}
                        onChange={(data) => setCurrentEditingPost({ ...currentEditingPost, content: data.json as unknown as TiptapJSON })}
                        placeholder="Escreva o conteúdo do post..."
                      />
                    </div>

                    {/* Publicado */}
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="published"
                        checked={currentEditingPost.published}
                        onChange={(e) => setCurrentEditingPost({ ...currentEditingPost, published: e.target.checked })}
                        className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                      />
                      <Label htmlFor="published" className="cursor-pointer">
                        Publicar post
                      </Label>
                    </div>

                    {/* Ações */}
                    <div className="flex items-center gap-2 pt-4">
                      <Button
                        onClick={saveCurrentPost}
                        disabled={isSavingPost}
                        className="flex-1 gap-2 dark:bg-cyan-600 dark:hover:bg-cyan-700"
                      >
                        {isSavingPost ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                            Salvando...
                          </>
                        ) : hasSaveSucceeded ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                            Salvo!
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" aria-hidden="true" />
                            Salvar
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={cancelEditing}
                        variant="outline"
                        disabled={isSavingPost}
                        className="dark:border-cyan-400/30 dark:hover:bg-cyan-400/10"
                      >
                        Cancelar
                      </Button>
                      <Button
                        onClick={() => setIsPreviewVisible(!isPreviewVisible)}
                        variant="outline"
                        size="icon"
                        className="lg:hidden dark:border-cyan-400/30"
                        aria-label={isPreviewVisible ? "Ocultar preview" : "Mostrar preview"}
                      >
                        {isPreviewVisible ? <EyeOff className="w-4 h-4" aria-hidden="true" /> : <Eye className="w-4 h-4" aria-hidden="true" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Coluna Direita: Preview */}
              <div className={cn(
                "space-y-6",
                !isPreviewVisible && "hidden lg:block"
              )}>
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
                      title={currentEditingPost.title || "Título do post"}
                      description={currentEditingPost.description || "Descrição do post aparecerá aqui"}
                      date={currentEditingPost.date}
                      category={currentEditingPost.category}
                      image={currentEditingPost.image}
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
                            "prose prose-sm dark:prose-invert max-w-none",
                            "prose-headings:dark:text-cyan-200",
                            "prose-p:dark:text-gray-300",
                            "prose-strong:dark:text-cyan-300",
                            "prose-code:dark:text-pink-400 prose-code:dark:bg-gray-800",
                            "prose-pre:dark:bg-gray-900 prose-pre:dark:border prose-pre:dark:border-cyan-400/20",
                            "prose-blockquote:dark:border-cyan-400/50 prose-blockquote:dark:text-gray-400",
                            "prose-li:dark:text-gray-300",
                            "prose-a:text-cyan-500 prose-a:hover:text-cyan-400"
                          )}
                          dangerouslySetInnerHTML={{ __html: tiptapJSONtoHTML(currentEditingPost.content) }}
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
                    {allPosts.length} {allPosts.length === 1 ? "post" : "posts"} no total
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {allPosts.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" aria-hidden="true" />
                      <p className="text-muted-foreground">Nenhum post criado ainda</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {allPosts.map((post) => (
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
                              {post.published ? (
                                <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30">
                                  Publicado
                                </Badge>
                              ) : (
                                <Badge variant="secondary">Rascunho</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              {post.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1 font-mono">
                              {post.category} • {post.date}
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
                              <Trash2 className="w-4 h-4" aria-hidden="true" />
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
  )
}

// ============================================================================
// Wrapper Component (with Suspense)
// ============================================================================

/**
 * Wrapper do Dashboard com Suspense
 * 
 * Envolve DashboardPageContent com Suspense para loading state.
 * Necessário por causa do uso de useSearchParams().
 * 
 * @returns Dashboard page com Suspense boundary
 */
export default function DashboardPage() {
  return (
    <Suspense 
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-background dark:bg-black">
          <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Carregando dashboard..." />
        </div>
      }
    >
      <DashboardPageContent />
    </Suspense>
  )
}

