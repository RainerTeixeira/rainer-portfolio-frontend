/**
 * Exportações de Componentes do Blog
 *
 * Barrel file para centralizar exportações dos componentes de blog
 *
 * @fileoverview Blog components exports
 * @author Rainer Teixeira
 */

export { AuthorCard } from './author-card';
export { NewsletterBox } from './newsletter-box';
export { PostCard } from './post-card';
export { ReadingProgress } from './reading-progress';
export { RelatedPosts } from './related-posts';
export { TableOfContents } from './table-of-contents';

// Componentes Sociais - MOVIDOS para @rainersoft/ui/social
// Usar: import { LikeButton, ShareButton, BookmarkButton, ReadingTime } from '@rainersoft/ui';

// Componentes de Busca
export { default as SearchBar } from './search';

// Infinite scroll
export { InfiniteScroll } from './infinite-scroll';

// Componentes de Comentários
export { CommentForm, CommentItem, CommentSection } from './comments';

// Componentes de Filtro e Organização
export { BlogStatCard } from './blog-stat-card';
export { CategoryFilter } from './category-filter';
export { FeaturedPostsSection } from './featured-posts-section';
export { SortControls, type SortOption } from './sort-controls';

// Componentes de Post Individual
export { PostActionsCard } from './post-actions-card';
export { PostMetadataCard } from './post-metadata-card';
export { PostNavigation } from './post-navigation';


