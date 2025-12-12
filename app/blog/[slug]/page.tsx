/**
 * Post Page Component (Individual Post by Slug)
 *
 * Página de visualização de post individual. Exibe conteúdo completo renderizado
 * do JSON Tiptap com metadados, ações sociais (like, bookmark, share), navegação
 * entre posts e seção de comentários.
 *
 * @module app/blog/[slug]/page
 * @fileoverview Página de post individual com slug SEO-friendly
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Rota: /blog/[slug]
 * // Exemplo: /blog/arquiteturas-escalaveis-react-typescript
 * // Renderizada automaticamente pelo Next.js App Router
 * ```
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Tag } from 'lucide-react';

import {
  AuthorCard,
  CommentSection,
  NewsletterBox,
  PostActionsCard,
  PostMetadataCard,
  PostNavigation,
  ReadingProgress,
  TableOfContents,
} from '@/components/domain/blog';
import { BackToTop, ParticlesEffect } from '@rainersoft/ui';
import { Badge } from '@rainersoft/ui';
import { Button } from '@rainersoft/ui';
import { Card, CardContent } from '@rainersoft/ui';
import { Separator } from '@rainersoft/ui';
import { tiptapJSONtoHTML } from '@/lib/blog/tiptap';
import { postsService } from '@/lib/api/services';
import type { Post } from '@/lib/api/types';
import { PostStatus } from '@/lib/api/types';
import { cn } from '@rainersoft/ui';
import { GRADIENT_DIRECTIONS } from '@rainersoft/design-tokens';

/**
 * Número máximo de posts relacionados a exibir.
 *
 * @constant {number}
 */
const MAX_RELATED_POSTS = 3;

/**
 * PostPage Component
 *
 * Componente principal da página de post individual com:
 * - Header com imagem de capa opcional
 * - Metadados completos (autor, data, categoria, tempo de leitura)
 * - Conteúdo rico renderizado do JSON Tiptap
 * - Ações sociais (like, bookmark, share)
 * - Compartilhamento social
 * - Posts relacionados
 * - Navegação entre posts (anterior/próximo)
 * - Breadcrumbs para navegação
 * - Table of Contents (sumário)
 * - Seção de comentários
 * - Newsletter signup
 *
 * @component
 * @returns {JSX.Element} Página de post individual completa
 *
 * @remarks
 * Este componente utiliza:
 * - blogStore para buscar post por slug
 * - Tiptap JSON para renderização de conteúdo rico
 * - Framer Motion para animações suaves
 * - Design system com Tailwind CSS
 * - Acessibilidade WCAG AA compliant
 * - SEO-friendly URLs com slugs
 *
 * @see {@link blogStore} Store de gerenciamento de posts
 * @see {@link tiptapJSONtoHTML} Utilitário de conversão Tiptap JSON para HTML
 */
export default function PostPage() {
  const params = useParams();
  const router = useRouter();
  const postSlug = params.slug as string;

  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [previousPost, setPreviousPost] = useState<Post | null>(null);
  const [nextPost, setNextPost] = useState<Post | null>(null);

  /**
   * Carrega post e posts relacionados por SLUG.
   * Busca o post pelo slug, posts relacionados da mesma categoria,
   * e configura navegação entre posts (anterior/próximo).
   */
  useEffect(() => {
    const loadPost = async () => {
      setIsLoading(true);

      try {
        // Busca post pelo SLUG (SEO-friendly)
        const foundPost = await postsService.getPostBySlug(postSlug);

        if (!foundPost) {
          setIsLoading(false);
          return;
        }

        setPost(foundPost);

        // Busca posts relacionados (mesma subcategoria)
        const relatedResponse = await postsService.listPosts({
          status: PostStatus.PUBLISHED,
          subcategoryId: foundPost.subcategoryId,
          limit: MAX_RELATED_POSTS + 1, // +1 para excluir o post atual
        });

        if (relatedResponse.success && relatedResponse.posts) {
          const related = relatedResponse.posts
            .filter(p => p.slug !== postSlug)
            .slice(0, MAX_RELATED_POSTS);
          setRelatedPosts(related);
        }

        // Buscar todos os posts para navegação
        const allPostsResponse = await postsService.listPosts({
          status: PostStatus.PUBLISHED,
          limit: 100,
        });

        if (allPostsResponse.success && allPostsResponse.posts) {
          const allPosts = allPostsResponse.posts;
          const currentIndex = allPosts.findIndex(p => p.slug === postSlug);
          setPreviousPost(
            currentIndex > 0 ? allPosts[currentIndex - 1] || null : null
          );
          setNextPost(
            currentIndex >= 0 && currentIndex < allPosts.length - 1
              ? allPosts[currentIndex + 1] || null
              : null
          );
        }
      } catch (error) {
        console.error('Erro ao carregar post:', error);
        setPost(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [postSlug]);

  /**
   * Estado de carregamento.
   * Exibe spinner enquanto busca o post da API.
   */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-black">
        <div className="text-center" role="status" aria-live="polite">
          <div
            className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"
            aria-label="Carregando post..."
          />
          <p className="text-muted-foreground dark:text-gray-400">
            Carregando post...
          </p>
        </div>
      </div>
    );
  }

  /**
   * Post não encontrado.
   * Exibe mensagem de erro e botão para voltar ao blog.
   */
  if (!post) {
    return (
      <div
        className={cn(
          'min-h-screen flex items-center justify-center bg-background dark:bg-black'
        )}
      >
        <ParticlesEffect variant="default" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center relative z-10"
          role="alert"
        >
          <div
            className={cn(
              'inline-flex items-center justify-center w-20 h-20 mb-6',
              'rounded-full',
              `${GRADIENT_DIRECTIONS.TO_BR} from-red-500/20 to-red-600/20`,
              'border-2 border-red-500/30'
            )}
          >
            <svg
              className="w-10 h-10 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2 dark:text-cyan-200 dark:font-mono">
            Post não encontrado
          </h1>
          <p className="text-muted-foreground dark:text-gray-400 mb-6">
            O post que você procura não existe ou foi removido.
          </p>
          <Button
            variant="default"
            size="lg"
            onClick={() => router.push('/blog')}
            className="gap-2 dark:bg-cyan-600 dark:hover:bg-cyan-700"
            aria-label="Voltar para página do blog"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Voltar ao Blog
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={cn('min-h-screen relative bg-background dark:bg-black')}>
      {/* Efeito de partículas decorativo no background */}
      <ParticlesEffect variant="default" />

      {/* Barra de progresso de leitura */}
      <ReadingProgress />

      {/* Botão fixo de voltar ao blog (visível apenas em desktop) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-20 left-6 z-40 hidden lg:block"
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push('/blog')}
          className="dark:border-cyan-400/30 dark:hover:bg-cyan-400/10 dark:text-cyan-400"
          title="Voltar ao blog"
          aria-label="Voltar para página do blog"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        </Button>
      </motion.div>

      {/* Cabeçalho do post com imagem de capa e título */}
      {/* Exibe imagem de capa (se disponível) ou apenas título com animação */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative"
      >
        {/* Cover Image */}
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
            <div
              className={cn(
                `absolute inset-0 ${GRADIENT_DIRECTIONS.TO_TOP} from-black/60 via-black/20 to-transparent`
              )}
              aria-hidden="true"
            />

            {/* Title over image */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {post.subcategory?.name && (
                    <Badge variant="secondary"
                      className={cn(
                        'mb-4',
                        `${GRADIENT_DIRECTIONS.TO_BR} from-cyan-500/20 to-purple-500/20`,
                        'border border-cyan-400/30',
                        'text-white'
                      )}
                    >
                      <Tag className="w-3 h-3 mr-1" aria-hidden="true" />
                      {post.subcategory.name}
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

        {/* Title without cover image */}
        {!post.coverImage && (
          <div className="relative py-20 md:py-32">
            <div className="max-w-4xl mx-auto px-6">
              <Button variant="ghost" size="lg" onClick={() => router.push('/blog')} className="mb-6 gap-2 lg:hidden dark:text-cyan-400"
                aria-label="Voltar para página do blog"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Voltar
              </Button>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {post.subcategory?.name && (
                  <Badge variant="secondary"
                    className={cn(
                      'mb-4',
                      `${GRADIENT_DIRECTIONS.TO_BR} from-cyan-500/10 to-purple-500/10`,
                      'border border-cyan-400/30',
                      'text-cyan-600 dark:text-cyan-400'
                    )}
                  >
                    <Tag className="w-3 h-3 mr-1" aria-hidden="true" />
                    {post.subcategory.name}
                  </Badge>
                )}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold dark:text-cyan-200 dark:font-mono mb-4">
                  {post.title}
                </h1>
              </motion.div>
            </div>
          </div>
        )}
      </motion.header>

      {/* Navegação breadcrumb */}
      {/* Links de navegação hierárquica: Home > Blog > Categoria */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto px-6 pt-6 relative z-10"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center gap-2 text-sm text-muted-foreground dark:text-gray-400">
          <li>
            <Link
              href="/"
              className="hover:text-cyan-400 transition-colors"
              aria-label="Ir para página inicial"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href="/blog"
              className="hover:text-cyan-400 transition-colors"
              aria-label="Ir para página do blog"
            >
              Blog
            </Link>
          </li>
          {post.subcategory?.name && (
            <>
              <li aria-hidden="true">/</li>
              <li className="text-cyan-400" aria-current="page">
                {post.subcategory.name}
              </li>
            </>
          )}
        </ol>
      </motion.nav>

      {/* Seção de metadados do post */}
      {/* Exibe informações: autor, data de publicação, categoria, tags, visualizações e curtidas */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        aria-labelledby="post-metadata-heading"
        className="max-w-4xl mx-auto px-6 -mt-8 relative z-10"
      >
        <h2 id="post-metadata-heading" className="sr-only">
          Metadados do Post
        </h2>
        <PostMetadataCard
          author={post.author?.fullName || post.author?.nickname}
          // Passar data crua (ISO) para o card, que formata de forma relativa
          date={post.publishedAt || post.createdAt}
          category={post.subcategory?.name}
          tags={post.tags}
          views={post.views}
          likesCount={post.likesCount}
          content={post.content}
          className="mt-6"
        />
      </motion.section>

      {/* Seção de sumário (Table of Contents) */}
      {/* Índice navegável do conteúdo do post, gerado automaticamente dos headings */}
      {post.content && typeof post.content === 'object' && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          aria-labelledby="toc-heading"
          className="max-w-4xl mx-auto px-6 pt-8 relative z-10"
        >
          <h2 id="toc-heading" className="sr-only">
            Sumário do Conteúdo
          </h2>
          <TableOfContents />
        </motion.section>
      )}

      {/* Artigo principal com conteúdo do post */}
      {/* Conteúdo rico renderizado do JSON Tiptap com estilos de tipografia personalizados */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-4xl mx-auto px-6 py-12 relative z-10"
      >
        <div
          className={cn(
            'prose prose-lg dark:prose-invert max-w-none',
            'prose-headings:font-bold prose-headings:dark:text-cyan-200 prose-headings:mb-4 prose-headings:mt-8',
            'prose-h1:text-4xl prose-h1:mb-6',
            'prose-h2:text-3xl',
            'prose-h3:text-2xl',
            'prose-p:leading-relaxed prose-p:mb-6 prose-p:dark:text-gray-300',
            'prose-strong:dark:text-cyan-300 prose-strong:font-bold',
            'prose-em:dark:text-purple-300',
            'prose-code:dark:text-pink-400 prose-code:dark:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm',
            'prose-pre:dark:bg-gray-950 prose-pre:dark:border prose-pre:dark:border-cyan-400/20 prose-pre:p-4 prose-pre:rounded-lg',
            'prose-blockquote:border-l-4 prose-blockquote:border-cyan-400 prose-blockquote:dark:border-cyan-400/60 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:dark:text-gray-400',
            'prose-ul:dark:text-gray-300 prose-ul:list-disc prose-ul:pl-6',
            'prose-ol:dark:text-gray-300 prose-ol:list-decimal prose-ol:pl-6',
            'prose-li:mb-2',
            'prose-a:text-cyan-500 prose-a:dark:text-cyan-400 prose-a:underline prose-a:hover:text-cyan-600 prose-a:dark:hover:text-cyan-300 prose-a:transition-colors',
            'prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8',
            'prose-hr:border-cyan-400/30 prose-hr:my-8'
          )}
          dangerouslySetInnerHTML={{ __html: tiptapJSONtoHTML(post.content) }}
        />
      </motion.article>

      {/* Seção de ações do post */}
      {/* Botões para curtir, favoritar e compartilhar o post nas redes sociais */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        aria-labelledby="post-actions-heading"
        className="max-w-4xl mx-auto px-6 pb-8 relative z-10"
      >
        <h2 id="post-actions-heading" className="sr-only">
          Ações do Post
        </h2>
        <PostActionsCard
          postId={post.id}
          initialLikes={post.likesCount || 0}
          url={`/blog/${post.slug}`}
          title={post.title}
          description={post.excerpt}
        />
      </motion.section>

      {/* Seção de informações do autor */}
      {/* Card com informações e biografia do autor do post */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        aria-labelledby="author-heading"
        className="max-w-4xl mx-auto px-6 py-8 relative z-10"
      >
        <h2 id="author-heading" className="sr-only">
          Sobre o Autor
        </h2>
        <AuthorCard />
      </motion.section>

      <Separator className="max-w-4xl mx-auto dark:bg-cyan-400/20" />

      {/* Seção de comentários */}
      {/* Área para leitores comentarem e discutirem o conteúdo do post */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        aria-labelledby="comments-heading"
        className="max-w-4xl mx-auto px-6 py-12 relative z-10"
      >
        <h2 id="comments-heading" className="sr-only">
          Comentários
        </h2>
        <CommentSection postId={post.id} />
      </motion.section>

      <Separator className="max-w-4xl mx-auto dark:bg-cyan-400/20" />

      {/* Seção de newsletter */}
      {/* Box de inscrição na newsletter para receber notificações de novos posts */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        aria-labelledby="newsletter-heading"
        className="max-w-4xl mx-auto px-6 py-8 relative z-10"
      >
        <h2 id="newsletter-heading" className="sr-only">
          Newsletter
        </h2>
        <NewsletterBox />
      </motion.section>

      <Separator className="max-w-4xl mx-auto dark:bg-cyan-400/20" />

      {/* Seção de posts relacionados */}
      {/* Grid com posts da mesma categoria para continuar a leitura */}
      {relatedPosts.length > 0 && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          aria-labelledby="related-posts-heading"
          className="max-w-4xl mx-auto px-6 py-12 relative z-10"
        >
          <div className="text-center mb-8">
            <h2
              id="related-posts-heading"
              className="text-3xl font-bold dark:text-cyan-200 dark:font-mono mb-2"
            >
              Continue Lendo
            </h2>
            <p className="text-muted-foreground dark:text-gray-400">
              Explore mais conteúdos relacionados
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map(relatedPost => (
              <Link
                key={relatedPost.id}
                href={`/blog/${relatedPost.slug}`}
                aria-label={`Ler post: ${relatedPost.title}`}
              >
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
                      {relatedPost.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </motion.section>
      )}

      {/* Navegação entre posts */}
      {/* Links para post anterior e próximo na sequência de publicação */}
      {(previousPost || nextPost) && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          aria-label="Navegação entre posts"
          className="max-w-4xl mx-auto px-6 pb-12 relative z-10"
        >
          <PostNavigation
            previousPost={
              previousPost
                ? { slug: previousPost.slug, title: previousPost.title }
                : null
            }
            nextPost={
              nextPost ? { slug: nextPost.slug, title: nextPost.title } : null
            }
          />
        </motion.section>
      )}

      {/* Botão de voltar ao blog */}
      {/* Link para retornar à página de listagem de todos os posts */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="max-w-4xl mx-auto px-6 pb-16 relative z-10"
      >
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push('/blog')}
            className="gap-2 dark:border-cyan-400/30 dark:hover:bg-cyan-400/10 dark:text-cyan-400"
            aria-label="Voltar para página do blog"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Voltar ao Blog
          </Button>
        </div>
      </motion.section>

      {/* Botão de voltar ao topo da página */}
      <BackToTop />
    </div>
  );
}
