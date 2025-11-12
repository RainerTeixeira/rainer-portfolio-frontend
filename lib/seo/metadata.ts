/**
 * SEO Metadata
 *
 * Funções para gerar metadados de SEO para páginas e posts.
 * Suporta Open Graph, Twitter Cards e dados estruturados.
 *
 * @fileoverview Funções para geração de metadados SEO
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import type { Category, Post } from '@/lib/api/types';
import { extractTextFromTiptap } from '@/lib/content';
import type { Metadata } from 'next';

// ============================================================================
// Types
// ============================================================================

/**
 * Propriedades para gerar metadados
 */
interface GenerateMetadataProps {
  /** Título da página */
  readonly title: string;
  /** Descrição da página */
  readonly description: string;
  /** URL da imagem (Open Graph) */
  readonly image?: string;
  /** Tipo de conteúdo (website, article, profile) */
  readonly type?: 'website' | 'article' | 'profile';
  /** Data de publicação (ISO string) */
  readonly publishedTime?: string;
  /** Data de modificação (ISO string) */
  readonly modifiedTime?: string;
  /** Lista de autores */
  readonly authors?: string[];
  /** Tags/keywords */
  readonly tags?: string[];
  /** URL canônica */
  readonly canonicalUrl?: string;
}

// ============================================================================
// Metadata Generation
// ============================================================================

/**
 * Gera metadados completos para SEO
 *
 * Cria metadados para SEO incluindo:
 * - Título e descrição
 * - Open Graph (Facebook, LinkedIn)
 * - Twitter Cards
 * - URL canônica
 * - Keywords e autores
 *
 * @param props - Propriedades para gerar metadados
 * @returns Objeto Metadata do Next.js
 *
 * @example
 * ```ts
 * const metadata = generateMetadata({
 *   title: 'Meu Post',
 *   description: 'Descrição do post',
 *   type: 'article',
 *   publishedTime: '2024-01-15T00:00:00Z'
 * });
 * ```
 */
export function generateMetadata({
  title,
  description,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  tags,
  canonicalUrl,
}: GenerateMetadataProps): Metadata {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://rainersoft.com.br';
  const siteName = 'Rainer Soft';

  const metadata: Metadata = {
    title,
    description,

    // Open Graph (Facebook, LinkedIn, etc.)
    openGraph: {
      title,
      description,
      type,
      locale: 'pt_BR',
      url: canonicalUrl || siteUrl,
      siteName,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },

    // Twitter Cards
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
      creator: '@rainerteixeira',
      site: '@rainerteixeira',
    },

    // Canonical URL
    alternates: canonicalUrl
      ? {
          canonical: canonicalUrl,
        }
      : undefined,

    // Keywords
    keywords: tags,

    // Authors
    authors: authors?.map(name => ({ name })),
  };

  // Article-specific metadata
  if (type === 'article' && publishedTime) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors,
      tags,
    };
  }

  return metadata;
}

/**
 * Gera metadados para post do blog
 *
 * Extrai informações do post e gera metadados otimizados para SEO.
 *
 * @param post - Post do blog
 * @returns Objeto Metadata do Next.js
 *
 * @example
 * ```ts
 * const post = await getPostBySlug('meu-post');
 * const metadata = generatePostMetadata(post);
 * ```
 */
export function generatePostMetadata(post: Post): Metadata {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://rainersoft.com.br';
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  // Usa excerpt se disponível, senão extrai do conteúdo
  const description =
    post.excerpt || extractTextFromTiptap(post.content).slice(0, 160) + '...';

  return generateMetadata({
    title: post.title,
    description,
    image: post.coverImage,
    type: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    authors: post.author ? [post.author.fullName] : ['Rainer Teixeira'],
    tags: post.tags,
    canonicalUrl: postUrl,
  });
}

/**
 * Gera metadados para categoria
 *
 * Cria metadados para páginas de categoria do blog.
 *
 * @param category - Categoria do blog
 * @returns Objeto Metadata do Next.js
 *
 * @example
 * ```ts
 * const category = await getCategoryBySlug('tecnologia');
 * const metadata = generateCategoryMetadata(category);
 * ```
 */
export function generateCategoryMetadata(category: Category): Metadata {
  const categoryName = category.fullName || category.name;
  return generateMetadata({
    title: `${categoryName} - Artigos e Tutoriais`,
    description:
      category.description || `Explore artigos sobre ${categoryName}`,
    image: category.coverImage,
  });
}
