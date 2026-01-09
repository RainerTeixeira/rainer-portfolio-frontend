/**
 * Structured Data
 *
 * Funções para gerar dados estruturados (JSON-LD) para SEO.
 * Suporta Article schema e BreadcrumbList schema.
 *
 * @fileoverview Funções para geração de dados estruturados
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import type { Post } from '@/lib/api/types/public/blog';
import { extractTextFromTiptap } from '@/lib/blog';
import { env } from '@/lib/config/env';

// ============================================================================
// Article Structured Data
// ============================================================================

/**
 * Gera structured data (JSON-LD) para artigo
 *
 * Cria dados estruturados no formato Schema.org Article.
 * Melhora a indexação e exibição em resultados de busca.
 *
 * @param post - Post do blog
 * @returns Dados estruturados no formato JSON-LD
 *
 * @example
 * ```ts
 * const post = await getPostBySlug('meu-post');
 * const structuredData = generateArticleStructuredData(post);
 * // Use em <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
 * ```
 */
export function generateArticleStructuredData(post: Post) {
  const siteUrl = env.NEXT_PUBLIC_BASE_URL;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: extractTextFromTiptap(typeof post.content === 'string' ? JSON.parse(post.content) : post.content).slice(0, 160),
    image: post.coverImage || `${siteUrl}/og-image.png`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.author?.fullName || 'Rainer Teixeira',
      url: post.author
        ? `${siteUrl}/author/${post.author.id}`
        : `${siteUrl}/sobre`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Rainer Soft',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
  };
}

// ============================================================================
// Breadcrumb Structured Data
// ============================================================================

/**
 * Gera structured data (JSON-LD) para breadcrumbs
 *
 * Cria dados estruturados no formato Schema.org BreadcrumbList.
 * Melhora a navegação em resultados de busca.
 *
 * @param items - Lista de itens do breadcrumb
 * @returns Dados estruturados no formato JSON-LD
 *
 * @example
 * ```ts
 * const breadcrumbs = [
 *   { name: 'Home', url: '/' },
 *   { name: 'Blog', url: '/blog' },
 *   { name: 'Meu Post', url: '/blog/meu-post' }
 * ];
 * const structuredData = generateBreadcrumbStructuredData(breadcrumbs);
 * ```
 */
export function generateBreadcrumbStructuredData(
  items: { name: string; url: string }[]
) {
  const siteUrl = env.NEXT_PUBLIC_BASE_URL;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}
