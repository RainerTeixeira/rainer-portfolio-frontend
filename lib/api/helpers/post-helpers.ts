/**
 * @fileoverview Helpers de Posts - Camada de Compatibilidade
 * 
 * Arquivo de compatibilidade para manter imports funcionando.
 * 
 * @deprecated Use as novas funções em public/blog/posts.ts
 */

// Funções de compatibilidade
export const formatPostDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR');
};

export const getPostExcerpt = (content: string, length: number = 150) => {
  return content.substring(0, length) + '...';
};
