/**
 * Hooks do Blog (Portfolio-specific)
 * 
 * Apenas hooks específicos do domínio do blog.
 * Hooks genéricos foram migrados para @rainersoft/utils.
 */

// Hooks genéricos migrados - importar dos hooks locais
export { useTableOfContents } from '@/hooks';

// Hooks específicos do blog
export { usePosts } from './use-posts';
export { useComments } from './use-comments';
export { useLike } from './use-like';
export { useBookmark } from './use-bookmark';
export { useCategories } from './use-categories';
export { useNewsletter } from './use-newsletter';
export { useSearch, type SearchResult } from './use-search';
