/**
 * Página Dashboard - Home e Editor
 * 
 * Página principal do dashboard que mostra:
 * - Home (perfil, estatísticas, posts) por padrão
 * - Editor quando mode=new ou edit=[id]
 * - Lista completa quando view=all
 * 
 * @fileoverview Dashboard Main Page
 * @author Rainer Teixeira
 * @version 3.0.0
 */

"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Plus, 
  Save, 
  Eye, 
  EyeOff, 
  Trash2, 
  ArrowLeft,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  Loader2
} from "lucide-react"
import { useAuth } from "@/components/providers/auth-provider"
import { blogStore, type BlogPost } from "@/lib/blog-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BackToTop } from "@/components/ui"
import { PostCard } from "@/components/blog/post-card"
import { Editor } from "@/components/dashboard/Editor"
import { 
  ProfileHeader,
  QuickStats,
  QuickActions,
  RecentPostsList,
  AnalyticsOverview,
  HelpCenter
} from "@/components/dashboard"
import { tiptapJSONtoHTML } from "@/lib/tiptap-utils"
import { textToSlug } from "@/lib/api-helpers"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

/**
 * Componente DashboardPage
 * 
 * Página principal do dashboard:
 * - Mostra home por padrão (perfil, stats, posts)
 * - Mostra editor quando necessário
 * 
 * @returns {JSX.Element} Página de dashboard
 */
export default function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [showPreview, setShowPreview] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  
  // Verifica modo de exibição
  const mode = searchParams.get('mode')
  const editId = searchParams.get('edit')
  const viewAll = searchParams.get('view')
  
  // Determina se mostra home ou editor
  const showHome = !mode && !editId && !viewAll

  // Estado do formulário de edição
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({
    title: "",
    description: "",
    content: { type: "doc", content: [] }, // JSON vazio do Tiptap
    category: "",
    image: "/images/b1.png",
    author: "Rainer Teixeira",
    published: false,
    date: new Date().toLocaleDateString("pt-BR", { 
      day: "numeric", 
      month: "long", 
      year: "numeric" 
    })
  })

  /**
   * Effect: Redirecionar se não autenticado
   */
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/dashboard/login")
    }
  }, [isAuthenticated, authLoading, router])

  /**
   * Effect: Carregar posts ao montar
   */
  useEffect(() => {
    if (isAuthenticated) {
      loadPosts()
      
      // Se tem parâmetro de edição, abre o post
      if (editId) {
        const post = blogStore.getPosts().find(p => p.id === editId)
        if (post) {
          handleEditPost(post)
        }
      } else if (mode === 'new') {
        handleNewPost()
      }
    }
  }, [isAuthenticated, editId, mode])

  /**
   * Carrega posts do store
   */
  const loadPosts = () => {
    const allPosts = blogStore.getPosts()
    setPosts(allPosts)
  }

  /**
   * Reseta dados para posts iniciais
   */
  const handleResetData = () => {
    if (confirm("Isso irá resetar todos os posts para os dados iniciais. Deseja continuar?")) {
      blogStore.reset()
      loadPosts()
      setIsEditing(false)
      toast.success("Dados resetados com sucesso! Agora você pode criar novos posts.")
    }
  }

  /**
   * Inicia criação de novo post
   */
  const handleNewPost = () => {
    setCurrentPost({
      title: "",
      description: "",
      content: { type: "doc", content: [] }, // JSON vazio do Tiptap
      category: "",
      image: "/images/b1.png",
      author: "Rainer Teixeira",
      published: false,
      date: new Date().toLocaleDateString("pt-BR", { 
        day: "numeric", 
        month: "long", 
        year: "numeric" 
      })
    })
    setIsEditing(true)
  }

  /**
   * Edita post existente
   */
  const handleEditPost = (post: BlogPost) => {
    setCurrentPost(post)
    setIsEditing(true)
  }

  /**
   * Salva post (criar ou atualizar)
   */
  const handleSavePost = async () => {
    if (!currentPost.title || !currentPost.description || !currentPost.content) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }

    setIsSaving(true)
    
    // Simula delay de salvamento
    await new Promise(resolve => setTimeout(resolve, 500))

    try {
      // Gera slug automaticamente do título se não existir
      const postToSave = {
        ...currentPost,
        slug: currentPost.slug || textToSlug(currentPost.title)
      }

      if (currentPost.id) {
        // Atualizar post existente
        blogStore.updatePost(currentPost.id, postToSave as BlogPost)
        toast.success("Post atualizado com sucesso!")
      } else {
        // Criar novo post
        blogStore.createPost(postToSave as Omit<BlogPost, "id" | "createdAt" | "updatedAt">)
        toast.success("Post criado com sucesso!")
      }

      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 2000)
      
      loadPosts()
      setIsEditing(false)
    } catch (error) {
      console.error("Erro ao salvar post:", error)
      toast.error("Erro ao salvar post. Tente novamente.")
    } finally {
      setIsSaving(false)
    }
  }

  /**
   * Deleta post
   */
  const handleDeletePost = (postId: string) => {
    if (confirm("Tem certeza que deseja deletar este post?")) {
      blogStore.deletePost(postId)
      toast.success("Post deletado com sucesso!")
      loadPosts()
      if (currentPost.id === postId) {
        setIsEditing(false)
      }
    }
  }

  /**
   * Cancela edição
   */
  const handleCancelEdit = () => {
    if (confirm("Descartar alterações?")) {
      setIsEditing(false)
    }
  }

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-black">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
      </div>
    )
  }

  // Não autenticado
  if (!isAuthenticated) {
    return null
  }

  return (
    <main className="w-full min-h-screen bg-background" aria-label="Dashboard Principal">
      <div className="relative z-10 bg-background dark:bg-gradient-to-b dark:from-black dark:via-gray-900 dark:to-black">
        <div className="w-full mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-12 xs:py-14 sm:py-16 md:py-20 lg:py-24 space-y-12 xs:space-y-14 sm:space-y-16 md:space-y-20 lg:space-y-24">
          
          <AnimatePresence mode="wait">
          {showHome ? (
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

                  {/* Posts Recentes */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2"
                  >
                    <RecentPostsList
                      maxPosts={5}
                      onEditPost={(post) => router.push(`/dashboard?edit=${post.id}`)}
                      onDeletePost={(postId) => {
                        if (confirm('Tem certeza que deseja deletar este post?')) {
                          blogStore.deletePost(postId)
                          toast.success('Post deletado com sucesso!')
                          router.refresh()
                        }
                      }}
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
              {/* Header da Página */}
              <header className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push("/dashboard")}
                    className="dark:text-cyan-400 dark:hover:bg-cyan-400/10"
                    aria-label="Voltar para home do dashboard"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <div>
                    <h1 className="text-3xl font-bold dark:text-cyan-200 dark:font-mono">
                      {isEditing ? (currentPost.id ? "Editar Post" : "Novo Post") : "Todos os Posts"}
                    </h1>
                    <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
                      {isEditing ? "Preencha os campos e visualize em tempo real" : `${posts.length} ${posts.length === 1 ? "post" : "posts"} no total`}
                    </p>
                  </div>
                </div>

                {!isEditing && (
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleResetData}
                      variant="outline"
                      size="sm"
                      className="gap-2 dark:border-yellow-400/30 dark:hover:bg-yellow-400/10 dark:text-yellow-400"
                    >
                      <Trash2 className="w-4 h-4" />
                      Resetar Dados
                    </Button>
                    <Button
                      onClick={handleNewPost}
                      className="gap-2 dark:bg-cyan-600 dark:hover:bg-cyan-700"
                    >
                      <Plus className="w-4 h-4" />
                      Novo Post
                    </Button>
                  </div>
                )}
              </header>

          {isEditing ? (
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
                      {currentPost.id ? "Editar Post" : "Novo Post"}
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
                        value={currentPost.title}
                        onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                      />
                      {/* Preview da URL com slug */}
                      {currentPost.title && (
                        <div className="flex items-center gap-2 p-2 bg-cyan-500/5 dark:bg-cyan-500/5 border border-cyan-400/20 rounded-md">
                          <span className="text-xs text-muted-foreground dark:text-gray-500">URL:</span>
                          <code className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                            /blog/{currentPost.slug || textToSlug(currentPost.title)}
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
                        value={currentPost.description}
                        onChange={(e) => setCurrentPost({ ...currentPost, description: e.target.value })}
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
                          value={currentPost.category}
                          onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="image">Imagem</Label>
                        <Input
                          id="image"
                          placeholder="/images/b1.png"
                          value={currentPost.image}
                          onChange={(e) => setCurrentPost({ ...currentPost, image: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Conteúdo (Editor Rico) */}
                    <div className="space-y-2">
                      <Label htmlFor="content">Conteúdo *</Label>
                      <Editor
                        content={currentPost.content || { type: "doc", content: [] }}
                        onChange={(data) => setCurrentPost({ ...currentPost, content: data.json })}
                        placeholder="Escreva o conteúdo do post..."
                      />
                    </div>

                    {/* Publicado */}
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="published"
                        checked={currentPost.published}
                        onChange={(e) => setCurrentPost({ ...currentPost, published: e.target.checked })}
                        className="w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                      />
                      <Label htmlFor="published" className="cursor-pointer">
                        Publicar post
                      </Label>
                    </div>

                    {/* Ações */}
                    <div className="flex items-center gap-2 pt-4">
                      <Button
                        onClick={handleSavePost}
                        disabled={isSaving}
                        className="flex-1 gap-2 dark:bg-cyan-600 dark:hover:bg-cyan-700"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Salvando...
                          </>
                        ) : saveSuccess ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            Salvo!
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            Salvar
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={handleCancelEdit}
                        variant="outline"
                        disabled={isSaving}
                        className="dark:border-cyan-400/30 dark:hover:bg-cyan-400/10"
                      >
                        Cancelar
                      </Button>
                      <Button
                        onClick={() => setShowPreview(!showPreview)}
                        variant="outline"
                        size="icon"
                        className="lg:hidden dark:border-cyan-400/30"
                      >
                        {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Coluna Direita: Preview */}
              <div className={cn(
                "space-y-6",
                !showPreview && "hidden lg:block"
              )}>
                <Card className="dark:bg-black/50 dark:border-cyan-400/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-cyan-200 dark:font-mono">
                      <Eye className="w-5 h-5" />
                      Preview em Tempo Real
                    </CardTitle>
                    <CardDescription>
                      Visualize como seu post aparecerá
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PostCard
                      title={currentPost.title || "Título do post"}
                      description={currentPost.description || "Descrição do post aparecerá aqui"}
                      date={currentPost.date}
                      category={currentPost.category}
                      image={currentPost.image}
                      link="#preview"
                    />

                    {/* Preview do conteúdo */}
                    {currentPost.content && (
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
                          dangerouslySetInnerHTML={{ __html: tiptapJSONtoHTML(currentPost.content) }}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ) : (
            /* Lista de Posts */
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
                    {posts.length} {posts.length === 1 ? "post" : "posts"} no total
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {posts.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Nenhum post criado ainda</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {posts.map((post) => (
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
                              onClick={() => handleEditPost(post)}
                              variant="outline"
                              size="sm"
                              className="dark:border-cyan-400/30 dark:hover:bg-cyan-400/10"
                            >
                              Editar
                            </Button>
                            <Button
                              onClick={() => handleDeletePost(post.id)}
                              variant="outline"
                              size="icon"
                              className="dark:border-red-400/30 dark:hover:bg-red-400/10 dark:hover:text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
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

      {/* Back to Top */}
      <BackToTop />
    </main>
  )
}

