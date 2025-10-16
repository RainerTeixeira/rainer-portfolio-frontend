/**
 * Página de Visualização de Post Individual (por Slug)
 * 
 * Exibe o conteúdo completo de um post do blog.
 * Renderiza o JSON do Tiptap em HTML formatado.
 * Usa SLUG para URLs amigáveis (SEO-friendly).
 * 
 * Rota: /blog/[slug]
 * Exemplo: /blog/arquiteturas-escalaveis-react-typescript
 * 
 * Características:
 * - Header com imagem de capa
 * - Metadados (autor, data, categoria, tempo de leitura)
 * - Conteúdo rico renderizado do JSON
 * - Compartilhamento social
 * - Posts relacionados
 * - Navegação entre posts
 * - URLs SEO-friendly
 * 
 * @fileoverview Página de post individual com slug
 * @author Rainer Teixeira
 * @version 2.0.0
 */

"use client"

import {
  AuthorCard,
  BookmarkButton,
  CommentSection,
  LikeButton,
  NewsletterBox,
  ReadingProgress,
  ReadingTime,
  ShareButton,
  TableOfContents
} from "@/components/blog"
import { blogStore, type BlogPost } from "@/components/blog/lib/blog-store"
import { tiptapJSONtoHTML } from "@/components/dashboard/lib/tiptap-utils"
import { BackToTop, ParticlesEffect } from "@/components/ui"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  Tag,
  User
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

/**
 * Componente PostPage
 * 
 * Página de visualização de post individual por slug
 */
export default function PostPage() {
  const params = useParams()
  const router = useRouter()
  const postSlug = params.slug as string // Parâmetro agora é 'slug'

  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [previousPost, setPreviousPost] = useState<BlogPost | null>(null)
  const [nextPost, setNextPost] = useState<BlogPost | null>(null)

  /**
   * Carrega post e posts relacionados por SLUG
   */
  useEffect(() => {
    setIsLoading(true)

    // Busca post pelo SLUG (SEO-friendly)
    const foundPost = blogStore.getPostBySlug(postSlug)
    
    if (!foundPost) {
      setIsLoading(false)
      return
    }

    setPost(foundPost)

    // Busca posts relacionados (mesma categoria)
    const allPosts = blogStore.getPublishedPosts()
    const related = allPosts
      .filter(p => p.slug !== postSlug && p.category === foundPost.category)
      .slice(0, 3)
    
    setRelatedPosts(related)

    // Navegação entre posts
    const currentIndex = allPosts.findIndex(p => p.slug === postSlug)
    setPreviousPost(currentIndex > 0 ? allPosts[currentIndex - 1] || null : null)
    setNextPost(currentIndex >= 0 && currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] || null : null)

    setIsLoading(false)
  }, [postSlug])

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground dark:text-gray-400">Carregando post...</p>
        </div>
      </div>
    )
  }

  // Post não encontrado
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-gradient-to-b dark:from-black dark:via-gray-900 dark:to-black">
        <ParticlesEffect variant="default" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center relative z-10"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-400/30 mb-6">
            <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2 dark:text-cyan-200 dark:font-mono">Post não encontrado</h1>
          <p className="text-muted-foreground dark:text-gray-400 mb-6">O post que você procura não existe ou foi removido.</p>
          <Button
            onClick={() => router.push("/blog")}
            className="gap-2 dark:bg-cyan-600 dark:hover:bg-cyan-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Blog
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background dark:bg-gradient-to-b dark:from-black dark:via-gray-900 dark:to-black relative">
      <ParticlesEffect variant="default" />
      <ReadingProgress />

      {/* Botão Voltar Fixo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-20 left-6 z-40 hidden lg:block"
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push("/blog")}
          className="dark:border-cyan-400/30 dark:hover:bg-cyan-400/10 dark:text-cyan-400"
          title="Voltar ao blog"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </motion.div>

      {/* Header do Post */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative"
      >
        {/* Imagem de Capa */}
        {post.coverImage && (
          <div className="relative h-[50vh] w-full overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/90" />
            
            {/* Título sobre a imagem */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {post.category && (
                    <Badge className="mb-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/50 text-cyan-200">
                      <Tag className="w-3 h-3 mr-1" />
                      {post.category}
                    </Badge>
                  )}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
                    {post.title}
                  </h1>
                </motion.div>
              </div>
            </div>
          </div>
        )}

        {/* Título sem imagem de capa */}
        {!post.coverImage && (
          <div className="relative py-20 md:py-32">
            <div className="max-w-4xl mx-auto px-6">
              <Button
                variant="ghost"
                onClick={() => router.push("/blog")}
                className="mb-6 gap-2 lg:hidden dark:text-cyan-400"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {post.category && (
                  <Badge className="mb-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-400/30 text-cyan-600 dark:text-cyan-300">
                    <Tag className="w-3 h-3 mr-1" />
                    {post.category}
                  </Badge>
                )}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold dark:text-cyan-200 dark:font-mono mb-4">
                  {post.title}
                </h1>
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Breadcrumbs */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto px-6 pt-6 relative z-10"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center gap-2 text-sm text-muted-foreground dark:text-gray-400">
          <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
          <li>/</li>
          <li><Link href="/blog" className="hover:text-cyan-400 transition-colors">Blog</Link></li>
          {post.category && (
            <>
              <li>/</li>
              <li className="text-cyan-400">{post.category}</li>
            </>
          )}
        </ol>
      </motion.nav>

      {/* Metadados do Post */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-4xl mx-auto px-6 -mt-8 relative z-10"
      >
        <Card className="dark:bg-black/80 dark:border-cyan-400/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground dark:text-gray-400">
              <div className="flex flex-wrap items-center gap-4">
                {/* Autor */}
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-cyan-400" />
                  <span className="font-medium">{post.author || "Rainer Teixeira"}</span>
                </div>

                <Separator orientation="vertical" className="h-4 dark:bg-cyan-400/20" />

                {/* Data */}
                {post.date && (
                  <>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-cyan-400" />
                      <span className="font-mono">{post.date}</span>
                    </div>
                    <Separator orientation="vertical" className="h-4 dark:bg-cyan-400/20" />
                  </>
                )}

                {/* Tempo de Leitura */}
                <ReadingTime content={post.content} showIcon={true} />
              </div>

              {/* Estatísticas */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{post.views || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{post.likesCount || 0}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <>
                <Separator className="my-4 dark:bg-cyan-400/10" />
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="w-4 h-4 text-cyan-400" />
                  {post.tags.map((tag, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="text-xs font-mono dark:border-cyan-400/30 dark:text-cyan-400"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Sumário (Table of Contents) - Opcional */}
      {post.content && typeof post.content === 'object' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="max-w-4xl mx-auto px-6 pt-8 relative z-10"
        >
          <TableOfContents />
        </motion.div>
      )}

      {/* Conteúdo do Post */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-4xl mx-auto px-6 py-12 relative z-10"
      >
        <div
          className={cn(
            "prose prose-lg dark:prose-invert max-w-none",
            "prose-headings:font-bold prose-headings:dark:text-cyan-200 prose-headings:mb-4 prose-headings:mt-8",
            "prose-h1:text-4xl prose-h1:mb-6",
            "prose-h2:text-3xl",
            "prose-h3:text-2xl",
            "prose-p:leading-relaxed prose-p:mb-6 prose-p:dark:text-gray-300",
            "prose-strong:dark:text-cyan-300 prose-strong:font-bold",
            "prose-em:dark:text-purple-300",
            "prose-code:dark:text-pink-400 prose-code:dark:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm",
            "prose-pre:dark:bg-gray-950 prose-pre:dark:border prose-pre:dark:border-cyan-400/20 prose-pre:p-4 prose-pre:rounded-lg",
            "prose-blockquote:border-l-4 prose-blockquote:border-cyan-400 prose-blockquote:dark:border-cyan-400/60 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:dark:text-gray-400",
            "prose-ul:dark:text-gray-300 prose-ul:list-disc prose-ul:pl-6",
            "prose-ol:dark:text-gray-300 prose-ol:list-decimal prose-ol:pl-6",
            "prose-li:mb-2",
            "prose-a:text-cyan-500 prose-a:dark:text-cyan-400 prose-a:underline prose-a:hover:text-cyan-600 prose-a:dark:hover:text-cyan-300 prose-a:transition-colors",
            "prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8",
            "prose-hr:border-cyan-400/30 prose-hr:my-8"
          )}
          dangerouslySetInnerHTML={{ __html: tiptapJSONtoHTML(post.content) }}
        />
      </motion.article>

      {/* Ações do Post */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-4xl mx-auto px-6 pb-8 relative z-10"
      >
        <Card className="dark:bg-black/50 dark:border-cyan-400/20">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <LikeButton
                  postId={post.id}
                  initialLikes={post.likesCount || 0}
                  variant="default"
                />
                <BookmarkButton
                  postId={post.id}
                  variant="outline"
                  size="sm"
                  showLabel={true}
                />
                <ShareButton
                  url={`/blog/${post.slug}`}
                  title={post.title}
                  description={post.excerpt || post.description}
                  variant="outline"
                  size="sm"
                  showLabel={true}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Divisor */}
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <Separator className="dark:bg-cyan-400/20" />
      </div>

      {/* Card do Autor */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="max-w-4xl mx-auto px-6 py-8 relative z-10"
      >
        <AuthorCard />
      </motion.div>

      {/* Divisor */}
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <Separator className="dark:bg-cyan-400/20" />
      </div>

      {/* Seção de Comentários */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="max-w-4xl mx-auto px-6 py-12 relative z-10"
      >
        <CommentSection postId={post.id} />
      </motion.div>

      {/* Divisor */}
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <Separator className="dark:bg-cyan-400/20" />
      </div>

      {/* Newsletter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        className="max-w-4xl mx-auto px-6 py-8 relative z-10"
      >
        <NewsletterBox />
      </motion.div>

      {/* Divisor */}
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <Separator className="dark:bg-cyan-400/20" />
      </div>

      {/* Posts Relacionados */}
      {relatedPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="max-w-4xl mx-auto px-6 py-12 relative z-10"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold dark:text-cyan-200 dark:font-mono mb-2">
              Continue Lendo
            </h2>
            <p className="text-muted-foreground dark:text-gray-400">
              Explore mais conteúdos relacionados
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                <Card className="h-full dark:bg-black/50 dark:border-cyan-400/20 hover:border-cyan-400/50 dark:hover:border-cyan-400/60 transition-all overflow-hidden group">
                  {relatedPost.coverImage && (
                    <div className="relative h-40 w-full overflow-hidden">
                      <Image
                        src={relatedPost.coverImage}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-2 dark:text-gray-100 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-xs text-muted-foreground dark:text-gray-400 line-clamp-2">
                      {relatedPost.excerpt || relatedPost.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* Navegação entre Posts */}
      {(previousPost || nextPost) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="max-w-4xl mx-auto px-6 pb-12 relative z-10"
        >
          <Separator className="dark:bg-cyan-400/20 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Post Anterior */}
            {previousPost ? (
              <Link href={`/blog/${previousPost.slug}`}>
                <Card className="h-full dark:bg-black/50 dark:border-cyan-400/20 hover:border-cyan-400/50 dark:hover:border-cyan-400/60 transition-all group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-gray-400 mb-2">
                      <ChevronLeft className="w-4 h-4" />
                      <span>Post Anterior</span>
                    </div>
                    <h3 className="font-semibold dark:text-gray-100 group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {previousPost.title}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <div />
            )}

            {/* Próximo Post */}
            {nextPost && (
              <Link href={`/blog/${nextPost.slug}`}>
                <Card className="h-full dark:bg-black/50 dark:border-cyan-400/20 hover:border-cyan-400/50 dark:hover:border-cyan-400/60 transition-all group">
                  <CardContent className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground dark:text-gray-400 mb-2">
                      <span>Próximo Post</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                    <h3 className="font-semibold dark:text-gray-100 group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {nextPost.title}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            )}
          </div>
        </motion.div>
      )}

      {/* Botão Voltar ao Blog */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="max-w-4xl mx-auto px-6 pb-16 relative z-10"
      >
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push("/blog")}
            className="gap-2 dark:border-cyan-400/30 dark:hover:bg-cyan-400/10 dark:text-cyan-400"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Blog
          </Button>
        </div>
      </motion.div>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  )
}

