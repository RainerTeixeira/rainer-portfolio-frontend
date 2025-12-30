/**
 * Types - Barrel Export Consolidado
 * 
 * Exporta todos os tipos da API organizados por módulo,
 * respeitando a separação público/privado.
 * 
 * @module lib/api/types
 * @author Rainer Teixeira
 * @version 1.0.0
 */

// Common types (deve vir primeiro)
export * from './common';

// Públicos
export * from './public/auth';
export * from './public/blog';
export * from './public/health';
export * from './public/users';

// Privados
export * from './private/blog';
export * from './private/bookmarks';
export * from './private/cloudinary';
export * from './private/comments';
export * from './private/dashboard';
export * from './private/likes';
export * from './private/notifications';
export * from './private/users';
