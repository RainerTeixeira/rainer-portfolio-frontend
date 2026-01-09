/**
 * Cookies Module - Barrel Export
 *
 * Módulo centralizado para gerenciamento de cookies e consentimento do usuário.
 * Sistema profissional e GDPR-compliant para controle de cookies e analytics.
 *
 * ## Funcionalidades
 *
 * ### Cookie Manager
 * - `CookieManager` - Classe singleton para gerenciar cookies
 *   - Salvar/atualizar consentimento
 *   - Verificar permissões por tipo
 *   - Revogar consentimento
 *   - Carregar scripts condicionalmente
 *
 * ### Analytics Integration
 * - `initGoogleAnalytics()` - Inicializa GA se consentido
 * - `trackPageView()` - Rastreia visualização de página
 * - `trackEvent()` - Rastreia eventos customizados
 * - `shouldLoadVercelAnalytics()` - Verifica se deve carregar Vercel Analytics
 *
 * ## Tipos de Cookies
 *
 * - `essential` - Cookies essenciais (sempre permitidos)
 * - `performance` - Cookies de performance
 * - `functionality` - Cookies de funcionalidade
 * - `analytics` - Cookies de analytics (Google Analytics, etc)
 *
 * ## Uso
 *
 * ```typescript
 * import {
 *   getCookieManager,
 *   isCookieAllowed,
 *   initGoogleAnalytics
 * } from '@/lib/cookies'
 *
 * // Verificar permissão
 * if (isCookieAllowed('analytics')) {
 *   initGoogleAnalytics()
 * }
 *
 * // Salvar consentimento
 * const manager = getCookieManager()
 * manager.saveConsent({
 *   essential: true,
 *   analytics: true,
 *   performance: false,
 *   functionality: false
 * })
 * ```
 *
 * @module lib/cookies
 * @fileoverview Barrel exports para gerenciamento de cookies
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

export * from './manager';
