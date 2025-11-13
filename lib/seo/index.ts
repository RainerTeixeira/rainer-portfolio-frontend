/**
 * SEO Utils - Barrel Export
 *
 * Módulo centralizado com utilitários para otimização de SEO (Search Engine Optimization).
 * Inclui geração de metadata, sitemap e structured data (Schema.org).
 *
 * ## Funcionalidades
 *
 * ### Metadata
 * - `generateMetadata()` - Gera metadata completa para páginas Next.js
 *   - Open Graph tags
 *   - Twitter Cards
 *   - Meta tags básicas
 *   - Canonical URLs
 * - `generatePostMetadata()` - Metadata específica para posts do blog
 * - `generateCategoryMetadata()` - Metadata específica para categorias
 *
 * ### Sitemap
 * - `generateSitemap()` - Gera XML do sitemap para posts e categorias
 * - `generateRobotsTxt()` - Gera robots.txt com regras de crawling
 *
 * ### Structured Data
 * - `generateArticleStructuredData()` - Schema.org Article para posts
 * - `generateBreadcrumbStructuredData()` - Schema.org BreadcrumbList
 *
 * ## Uso
 *
 * ```typescript
 * import {
 *   generateMetadata,
 *   generatePostMetadata,
 *   generateSitemap,
 *   generateArticleStructuredData
 * } from '@/lib/seo'
 *
 * // Em páginas Next.js
 * export const metadata = generateMetadata({
 *   title: 'Meu Post',
 *   description: 'Descrição do post',
 *   type: 'article'
 * })
 *
 * // Sitemap
 * const sitemap = generateSitemap(posts, categories)
 *
 * // Structured Data
 * const schema = generateArticleStructuredData(post)
 * ```
 *
 * @module lib/seo
 * @fileoverview Barrel exports para utilitários de SEO
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

export * from './metadata';
export * from './sitemap';
export * from './structured-data';
