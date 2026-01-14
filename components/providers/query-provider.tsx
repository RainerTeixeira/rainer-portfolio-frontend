/**
 * Query Provider Component
 *
 * Provider do React Query (TanStack Query) para gerenciar cache e estado
 * de requisições. Configura cliente com opções otimizadas para o blog.
 *
 * @module components/providers/query-provider
 * @fileoverview Provider React Query com configurações otimizadas
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // No layout.tsx
 * <QueryProvider>
 *   <App />
 * </QueryProvider>
 * ```
 */

'use client';

export const dynamic = 'force-dynamic';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';

// Conditional import for devtools (only in development)
const ReactQueryDevtools =
  process.env.NODE_ENV === 'development'
    ? require('@tanstack/react-query-devtools').ReactQueryDevtools
    : null;

interface QueryProviderProps {
  children: ReactNode;
}

/**
 * QueryProvider Component
 *
 * Configura cliente React Query com opções otimizadas para o blog.
 * Inclui cache de 5 minutos, retry automático e DevTools em desenvolvimento.
 *
 * @component
 * @param {QueryProviderProps} props - Propriedades do provider
 * @param {ReactNode} props.children - Componentes filhos
 * @returns {JSX.Element} Provider configurado
 */
export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Cache de 5 minutos
            staleTime: 5 * 60 * 1000,
            // Retry em caso de erro
            retry: 1,
            // Refetch ao focar janela
            refetchOnWindowFocus: false,
          },
          mutations: {
            // Retry em caso de erro
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* DevTools apenas em desenvolvimento */}
      {process.env.NODE_ENV === 'development' && ReactQueryDevtools && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}



