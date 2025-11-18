/**
 * Utils - Barrel Export
 *
 * Módulo centralizado com utilitários especializados para diferentes necessidades.
 * Cada sub-módulo foca em uma área específica (validação, strings, scroll, etc).
 *
 * ## Módulos Disponíveis
 *
 * ### Validation
 * - `validation.ts` - Validação de formulários e dados
 *   - Email, senha, username, telefone, URL, slug
 *   - Validação com schemas customizados
 *   - Mensagens de erro em português
 *
 * ### String
 * - `string.ts` - Manipulação de strings
 *   - `textToSlug()` - Converte texto para slug URL-friendly
 *   - `formatDate()` - Formata datas em português
 *   - `formatDateTime()` - Formata data e hora
 *   - `translatePostStatus()` - Traduz status de posts
 *
 * ### Scroll
 * - `scroll.ts` - Utilitários de scroll e navegação
 *   - `smoothScrollTo()` - Scroll suave para elemento
 *   - `scrollToTop()` - Scroll para topo da página
 *   - `prefersReducedMotion()` - Detecta preferência de movimento reduzido
 *   - `disableScroll()` / `enableScroll()` - Controla scroll da página
 *
 * ### Search
 * - `search.ts` - Sistema de busca de conteúdo
 *   - Busca em posts, categorias e autores
 *   - Busca síncrona e assíncrona
 *   - Resultados tipados
 *
 * ### Design Tokens
 * - `design-tokens.ts` - Conversão e manipulação de design tokens
 *   - Conversão HEX para HSL, RGB, RGBA
 *   - Conversão em lote de objetos de cores
 *
 * ### Image Optimizer
 * - `image-optimizer.ts` - Otimização e análise de imagens
 *   - Análise de formato, animação, dimensões
 *   - Recomendações de otimização
 *   - Dicas de compressão
 *
 * ### Post Compressor
 * - `post-compressor.ts` - Compressão de conteúdo de posts
 *   - Compressão/decompressão de JSON Tiptap
 *   - Geração de TOC (Table of Contents)
 *   - Estimativa de redução de tamanho
 *
 * ## Uso
 *
 * ```typescript
 * import {
 *   validateEmail,
 *   textToSlug,
 *   smoothScrollTo,
 *   hexToHSL
 * } from '@/lib/utils'
 *
 * // Validação
 * const result = validateEmail('user@example.com')
 *
 * // String
 * const slug = textToSlug('Meu Post Incrível') // "meu-post-incrivel"
 *
 * // Scroll
 * smoothScrollTo('#section-id')
 *
 * // Design Tokens
 * const hsl = hexToHSL('#3b82f6') // "hsl(217, 91%, 60%)"
 * ```
 *
 * @module lib/utils
 * @fileoverview Barrel exports para utilitários especializados
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

export * from './design-tokens';
export * from './image-optimizer';
export * from './post-compressor';
export * from './scroll';
export * from './search';
export * from './string';
export * from './tokens';
export * from './validation';
