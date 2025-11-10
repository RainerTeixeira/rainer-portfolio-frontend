/**
 * Exportações de Hooks do Blog
 *
 * Barrel file para centralizar exportações dos hooks do blog
 *
 * @fileoverview Blog hooks exports
 * @author Rainer Teixeira
 * @version 1.0.0
 */

export { useTableOfContents } from './use-table-of-contents';
export type { Heading } from './use-table-of-contents';

export { useLike } from './use-like';
export { useBookmark } from './use-bookmark';
export { useSearch } from './use-search';
export type { SearchResult } from './use-search';

export { useNewsletter } from './use-newsletter';
