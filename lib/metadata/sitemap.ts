/**
 * Sitemap Utils
 *
 * Funções para gerar sitemap XML e robots.txt.
 * Utilizadas para melhorar indexação por motores de busca.
 *
 * @fileoverview Utilitários para sitemap e robots.txt
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import type { PostCategory, PostListItem } from '@/lib/api/types/public/blog';
import { env } from '@/lib/config/env';

// ============================================================================
// Sitemap Generation
// ============================================================================

/**
 * Gera sitemap XML
 *
 * Cria sitemap XML completo incluindo:
 * - Páginas estáticas (Home, Blog, Sobre, Contato)
 * - Posts do blog
 * - Categorias
 *
 * @param posts - Lista de posts do blog
 * @param categories - Lista de categorias
 * @returns Sitemap XML como string
 *
 * @example
 * ```ts
 * const posts = await getAllPosts();
 * const categories = await getAllCategories();
 * const sitemap = generateSitemap(posts, categories);
 * // Salve em /public/sitemap.xml
 * ```
 */
export function generateSitemap(posts: PostListItem[], categories: PostCategory[]): string {
  const siteUrl = env.NEXT_PUBLIC_BASE_URL;
  const now = new Date().toISOString();

  // Páginas estáticas
  const staticPages = [
    { loc: '/', priority: '1.0', changefreq: 'daily' },
    { loc: '/blog', priority: '0.9', changefreq: 'daily' },
    { loc: '/sobre', priority: '0.8', changefreq: 'monthly' },
    { loc: '/contato', priority: '0.8', changefreq: 'monthly' },
  ];

  // Posts do blog
  const postUrls = posts.map(post => ({
    loc: `/blog/${post.slug}`,
    lastmod: post.publishedAt || post.createdAt || now,
    priority: post.featured ? '0.9' : '0.7',
    changefreq: 'weekly' as const,
  }));

  // Categorias
  const categoryUrls = categories.map(category => ({
    loc: `/blog?category=${category.slug}`,
    priority: '0.6',
    changefreq: 'weekly' as const,
  }));

  const urls = [...staticPages, ...postUrls, ...categoryUrls];

  // Gerar XML
  const xmlUrls = urls
    .map(
      url => `
  <url>
    <loc>${siteUrl}${url.loc}</loc>
    ${'lastmod' in url ? `<lastmod>${url.lastmod}</lastmod>` : `<lastmod>${now}</lastmod>`}
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;
}

// ============================================================================
// Robots.txt Generation
// ============================================================================

/**
 * Gera robots.txt
 *
 * Cria arquivo robots.txt permitindo indexação de páginas públicas
 * e bloqueando páginas administrativas e API.
 *
 * @returns Conteúdo do robots.txt como string
 *
 * @example
 * ```ts
 * const robotsTxt = generateRobotsTxt();
 * // Salve em /public/robots.txt
 * ```
 */
export function generateRobotsTxt(): string {
  const siteUrl = env.NEXT_PUBLIC_BASE_URL;

  return `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Disallow admin pages
Disallow: /dashboard
Disallow: /api

# Sitemap
Sitemap: ${siteUrl}/sitemap.xml
`;
}
