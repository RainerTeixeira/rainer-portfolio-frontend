/**
 * Types - Barrel Export Consolidado
 * 
 * Exporta todos os tipos da API organizados por módulo.
 * 
 * @module lib/api/types
 * @author Rainer Teixeira
 * @version 1.0.0
 */

// Common types (deve vir primeiro)
export * from './common';

// Auth & Users
export * from './auth';
export * from './users';

// Content
export * from './posts';
export * from './categories';
export * from './comments';

// Engagement
export * from './likes';
export * from './bookmarks';
export * from './notifications';

// Services
export * from './cloudinary';
export * from './dashboard';
export * from './health';
