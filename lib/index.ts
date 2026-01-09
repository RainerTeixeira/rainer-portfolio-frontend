/**
 * Biblioteca Principal - Barrel Exports
 *
 * Ponto de entrada centralizado para todas as bibliotecas e utilitários da aplicação.
 * Facilita imports com um único ponto de entrada, melhorando a organização e manutenibilidade do código.
 *
 * ## Arquitetura de Módulos
 *
 * ### 📁 Core Infrastructure
 * - `config/env` - Variáveis de ambiente tipadas e validadas
 * - `api` - Cliente HTTP e serviços para integração com backend
 *
 * ### 🛠️ Utils & Helpers
 * - `utils` - Utilitários gerais (CSS, validação, formatação, compressão, imagens, busca)
 *
 * ### 📊 Content & Media
 * - Post compressor (via `utils`) - Compressão de conteúdo Tiptap para DynamoDB
 * - Image optimizer (via `utils`) - Otimização e análise de imagens
 * - Reading time (via `utils`) - Cálculo de tempo de leitura
 *
 * ### � Autenticação & Segurança
 * - Token storage (via `utils`) - Gerenciamento de tokens JWT no localStorage
 * - Password validation (via `utils`) - Validação e força de senhas
 *
 * ### �📈 Monitoring & Analytics
 * - `tracking` - Sistema de analytics, logging e performance monitoring
 * - `privacy` - Sistema de cookies e consentimento de usuário
 *
 * ### 🔍 SEO & Metadata
 * - `metadata` - Utilitários para SEO (metadata, sitemap, structured data)
 *
 * ## Padrões de Import
 *
 * ```typescript
 * // ✅ Preferido: Import direto do módulo específico
 * import { compressPost, decompressPost } from '@/lib/utils';
 * import { searchPortfolioContent } from '@/lib/utils';
 * import { getToken, setToken } from '@/lib/utils';
 *
 * // ✅ Aceitável: Import via barrel (para múltiplas funções)
 * import { 
 *   compressPost, 
 *   searchPortfolioContent, 
 *   generateMetadata,
 *   getToken,
 *   setToken
 * } from '@/lib';
 *
 * // ❌ Evitar: Imports desnecessários via barrel
 * import { compressPost } from '@/lib'; // use '@/lib/utils' em vez disso
 * ```
 *
 * ## Migrações Recentes
 *
 * ### ✅ Concluídas
 * - `TRANSITION_DELAYS` - Movido para `lib/utils/constants.ts`
 * - `searchPortfolioContent` - Movido para `lib/utils/content-search.ts`
 * - `compressPost` - Movido para `lib/utils/post-compressor.ts`
 * - **Token Storage** - Movido de `lib/auth/token-storage.ts` para `lib/utils/token-storage.ts`
 * - **Blog Utils** - Consolidados em `lib/utils/tiptap.ts` e `lib/utils/reading-time.ts`
 * - **Portfolio Utils** - Consolidados em `lib/utils` (image-optimizer, safe-design-tokens, content-search, css-helpers)
 *
 * ### 🔄 Concluído
 * - Limpeza final do diretório `lib/auth` (removido)
 * - Consolidação de `lib/portfolio` em `lib/utils` (removido)
 *
 * ## Estrutura de Autenticação
 *
 * As funções de autenticação foram consolidadas em `lib/utils/token-storage.ts`:
 *
 * ```typescript
 * // Gerenciamento de Tokens
 * export const getToken = (): string | null => { ... }
 * export const setToken = (token: string): void => { ... }
 * export const getRefreshToken = (): string | null => { ... }
 * export const setRefreshToken = (token: string): void => { ... }
 * export const removeToken = (): void => { ... }
 * export const getTokens = (): { token: string | null; refreshToken: string | null } => { ... }
 * export const hasToken = (): boolean => { ... }
 * ```
 *
 * @module lib
 * @fileoverview Barrel exports centralizados com arquitetura modular
 * @author Rainer Teixeira
 * @version 3.1.0
 * @since 1.0.0
 * @updated 2026-01-03 - Migração de token storage para utils
 */

// ============================================================================
// CONFIGURAÇÃO (Environment Variables)
// ============================================================================

export * from './config/env';

// ============================================================================
// API CLIENT & SERVICES
// ============================================================================

export * from './api';

// ============================================================================
// UTILITÁRIOS GERAIS (Utils)
// ============================================================================

export * from './utils';

// ============================================================================
// MONITORAMENTO (Analytics, Logger, Performance)
// ============================================================================

export * from './tracking';

// ============================================================================
// METADATA (SEO, Sitemap, Structured Data)
// ============================================================================

export * from './metadata';

// ============================================================================
// PRIVACIDADE (Cookies, Analytics, Consentimento)
// ============================================================================

export * from './privacy';
