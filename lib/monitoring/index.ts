/**
 * Monitoring - Barrel Export
 *
 * Módulo centralizado com sistemas de monitoramento da aplicação.
 * Inclui analytics, logging estruturado e performance monitoring.
 *
 * ## Funcionalidades
 *
 * ### Analytics
 * - `analytics` - Sistema de rastreamento de eventos
 *   - Integração com Google Analytics 4
 *   - Suporte a Plausible Analytics
 *   - Events tipados e estruturados
 *   - Desabilitado em desenvolvimento
 *   - Privacy-first (GDPR compliant)
 *
 * ### Logger
 * - `logger` - Sistema de logging estruturado
 *   - Níveis: debug, info, warn, error
 *   - Contexto adicional para cada log
 *   - Timestamp automático
 *   - Colorização no console
 *   - Preparado para integração com serviços externos (Sentry, LogRocket, etc)
 *
 * ### Performance
 * - `performanceMonitor` - Monitoramento de performance
 *   - Web Vitals (LCP, FCP, CLS, FID, INP, TTFB)
 *   - Métricas customizadas
 *   - Relatórios de navegação
 *   - Ratings automáticos (good/needs-improvement/poor)
 *
 * ## Uso
 *
 * ```typescript
 * import { analytics, logger, performanceMonitor } from '@/lib/monitoring'
 * import { ANALYTICS_EVENTS } from '@/lib/monitoring/analytics'
 *
 * // Analytics
 * analytics.track(ANALYTICS_EVENTS.PAGE_VIEW('/blog'))
 * analytics.pageView('/blog')
 *
 * // Logger
 * logger.info('Usuário logado', { userId: '123' })
 * logger.error('Falha ao salvar', error, { postId: '456' })
 *
 * // Performance
 * performanceMonitor.start('load-posts')
 * await loadPosts()
 * const duration = performanceMonitor.end('load-posts')
 * ```
 *
 * @module lib/monitoring
 * @fileoverview Barrel exports para sistemas de monitoramento
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

export * from './analytics';
export * from './logger';
export * from './performance';
