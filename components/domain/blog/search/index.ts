/**
 * Blog Search Components
 *
 * Exportações unificadas dos componentes de busca do blog.
 * Estrutura otimizada com menos arquivos e nomes descritivos.
 *
 * @fileoverview Blog search components exports
 * @author Rainer Teixeira
 * @version 3.0.0
 */

export { 
  BlogSearch, 
  BlogSearchWithFilters,
  type BlogSearchProps,
  type BlogSearchFiltersProps,
  type BlogSearchItem,
  type BlogSearchFilterState 
} from './blog-search';

// Export padrão para facilitar import
export { BlogSearch as default } from './blog-search';
