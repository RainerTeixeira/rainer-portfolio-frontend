/**
 * String Utils
 *
 * Utilitários para manipulação de strings, formatação de datas e tradução de status.
 *
 * @fileoverview Utilitários de string e formatação
 * @author Rainer Teixeira
 * @version 1.0.0
 */

import type { PostStatus } from '@/lib/api/types/posts';

// ============================================================================
// Slug Utils
// ============================================================================

/**
 * Converte string para slug URL-friendly
 *
 * Remove acentos, caracteres especiais e espaços, substituindo por hífens.
 *
 * @param text - Texto para converter
 * @returns Slug formatado (ex: "meu-primeiro-post")
 *
 * @example
 * ```ts
 * textToSlug("Meu Primeiro Post!") // "meu-primeiro-post"
 * textToSlug("Café & Pão") // "cafe-pao"
 * ```
 */
export function textToSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífen
    .replace(/-+/g, '-') // Remove hífens duplicados
    .replace(/^-+|-+$/g, ''); // Remove hífens do início/fim
}

// ============================================================================
// Date Formatting
// ============================================================================

/**
 * Formata data para exibição em português
 *
 * Formata data no padrão brasileiro (dia de mês de ano).
 *
 * @param date - Data a formatar (Date ou string ISO)
 * @returns Data formatada (ex: "15 de janeiro de 2024")
 *
 * @example
 * ```ts
 * formatDate(new Date()) // "15 de janeiro de 2024"
 * formatDate("2024-01-15T00:00:00Z") // "15 de janeiro de 2024"
 * ```
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  return d.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Formata data e hora para exibição em português
 *
 * Formata data e hora no padrão brasileiro.
 *
 * @param date - Data a formatar (Date ou string ISO)
 * @returns Data e hora formatadas (ex: "15 de janeiro de 2024, 14:30")
 *
 * @example
 * ```ts
 * formatDateTime(new Date()) // "15 de janeiro de 2024, 14:30"
 * formatDateTime("2024-01-15T14:30:00Z") // "15 de janeiro de 2024, 14:30"
 * ```
 */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;

  return d.toLocaleString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// ============================================================================
// Status Translation
// ============================================================================

/**
 * Converte status do post para português
 *
 * Traduz os status de post (DRAFT, PUBLISHED, etc.) para português.
 *
 * @param status - Status em inglês
 * @returns Status traduzido para português
 *
 * @example
 * ```ts
 * translatePostStatus('DRAFT') // "Rascunho"
 * translatePostStatus('PUBLISHED') // "Publicado"
 * ```
 */
export function translatePostStatus(status: PostStatus | string): string {
  const translations: Record<PostStatus, string> = {
    DRAFT: 'Rascunho',
    PUBLISHED: 'Publicado',
    ARCHIVED: 'Arquivado',
    SCHEDULED: 'Agendado',
    TRASH: 'Lixeira',
  };

  // Normalizar string para uppercase se for string
  const normalizedStatus =
    typeof status === 'string'
      ? (status.toUpperCase() as PostStatus)
      : (status as PostStatus);

  return translations[normalizedStatus] || status;
}

/**
 * @deprecated Use translatePostStatus instead
 * Alias para compatibilidade com código legado
 */
export function translateStatus(status: PostStatus | string): string {
  return translatePostStatus(status);
}
