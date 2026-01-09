/**
 * Exportações de Componentes do PostCard
 *
 * Barrel file para centralizar exportações dos componentes do post-card.
 * Segue o padrão de organização do domínio blog.
 * 
 * @module components/domain/blog/post-card
 * @fileoverview PostCard components barrel exports
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

// Componente principal
export { PostCard } from './post-card';

// Subcomponentes
export { PostImage } from './post-image';
export { PostHeader } from './post-header';
export { PostContent } from './post-content';
export { PostSocialActions } from './post-social-actions';
export { ReadMoreLink } from './read-more-link';

// Tipos
export type { PostCardProps } from './post-card';
