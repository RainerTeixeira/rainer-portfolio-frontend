// ============================================================================
// Exportações principais da API
// ============================================================================

// Cliente HTTP e tipos base
export * from './client';
export * from './config';
export * from './types';

// Serviços (todos os serviços da API)
export * from './services';

// Tipos de serviços
// (removido re-export duplicado para evitar conflitos)

// Instância do cliente API
export { api } from './client';

// Tipos de erro
export { ApiError } from './client';
