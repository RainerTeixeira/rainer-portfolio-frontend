/**
 * Biblioteca Principal - Barrel Exports
 *
 * Ponto de entrada centralizado para todas as bibliotecas e utilitários da aplicação.
 * Facilita imports com um único ponto de entrada, melhorando a organização e manutenibilidade do código.
 *
 * ## Módulos Disponíveis
 *
 * ### Core Utils
 * - `utils` - Utilitários gerais (classes CSS, helpers, etc.)
 * - `env` - Configuração de variáveis de ambiente tipadas
 *
 * ### API
 * - `api` - Cliente HTTP e serviços para integração com backend
 * - `api/helpers` - Helpers específicos para preparação de dados da API
 *
 * ### Content
 * - `content` - Utilitários para processamento de conteúdo (Tiptap, reading time)
 *
 * ### Monitoring
 * - `monitoring` - Sistema de analytics, logging e performance monitoring
 *
 * ### SEO
 * - `seo` - Utilitários para SEO (metadata, sitemap, structured data)
 *
 * ### Cookies
 * - `cookies` - Sistema de gerenciamento de cookies e consentimento
 *
 * ### Utils Específicos
 * - `utils/validation` - Validação de formulários e dados
 * - `utils/string` - Manipulação de strings (slug, formatação de datas)
 * - `utils/scroll` - Utilitários de scroll e navegação
 * - `utils/search` - Sistema de busca de conteúdo
 * - `utils/rainer-design-tokens` - Conversão e manipulação de design tokens
 * - `utils/image-optimizer` - Otimização e análise de imagens
 * - `utils/post-compressor` - Compressão de conteúdo de posts
 *
 * ## Uso
 *
 * ```typescript
 * // Importar utilitários gerais
 * import { cn, SECTION_CLASSES } from '@/lib'
 *
 * // Importar API
 * import { api, postsService } from '@/lib'
 *
 * // Importar utilitários de conteúdo
 * import { calculateReadingTime, extractTextFromTiptap } from '@/lib'
 *
 * // Importar monitoring
 * import { logger, analytics } from '@/lib'
 *
 * // Importar SEO
 * import { generateMetadata, generateSitemap } from '@/lib'
 * ```
 *
 * @module lib
 * @fileoverview Barrel exports centralizados para todas as bibliotecas
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

// ============================================================================
// Config (Environment Variables)
// ============================================================================

export * from './config';

// ============================================================================
// API Client & Services
// ============================================================================

export { blogPublicApi } from './api/blog-public-api';
// Para usar serviços: importar diretamente de '@/lib/api'

// ============================================================================
// Blog (Tiptap, Reading Time)
// ============================================================================

export * from './blog';

// ============================================================================
// Portfolio (CSS, Images, Posts, Search, Validation)
// ============================================================================

export * from './portfolio';

// ============================================================================
// Tracking (Analytics, Logger, Performance)
// ============================================================================

export * from './tracking';

// ============================================================================
// Metadata (SEO, Sitemap, Structured Data)
// ============================================================================

export * from './metadata';

// ============================================================================
// Privacy (Cookies, Analytics)
// ============================================================================

export * from './privacy';
