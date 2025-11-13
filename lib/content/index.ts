/**
 * Content Utils - Barrel Export
 *
 * Módulo centralizado com utilitários para processamento e manipulação de conteúdo.
 * Focado em conteúdo Tiptap (JSON) e cálculos relacionados.
 *
 * ## Funcionalidades
 *
 * ### Reading Time
 * - `calculateReadingTime()` - Calcula tempo de leitura baseado no conteúdo
 *   - Suporta Tiptap JSON, HTML e texto simples
 *   - Configurável (palavras por minuto)
 *   - Retorna mínimo de 1 minuto
 *
 * ### Tiptap Utils
 * - `extractTextFromTiptap()` - Extrai texto puro do JSON do Tiptap
 * - `generateExcerpt()` - Gera resumo do conteúdo (com truncamento)
 * - `createEmptyTiptapContent()` - Cria documento Tiptap vazio
 * - `isContentEmpty()` - Verifica se conteúdo está vazio
 *
 * ## Uso
 *
 * ```typescript
 * import {
 *   calculateReadingTime,
 *   extractTextFromTiptap,
 *   generateExcerpt
 * } from '@/lib/content'
 *
 * // Calcular tempo de leitura
 * const readingTime = calculateReadingTime(tiptapContent) // 5 minutos
 *
 * // Extrair texto
 * const text = extractTextFromTiptap(tiptapContent) // "Texto puro..."
 *
 * // Gerar excerpt
 * const excerpt = generateExcerpt(tiptapContent, 160) // "Primeiros 160 caracteres..."
 * ```
 *
 * @module lib/content
 * @fileoverview Barrel exports para utilitários de conteúdo
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

export * from './reading-time';
export * from './tiptap-utils';
