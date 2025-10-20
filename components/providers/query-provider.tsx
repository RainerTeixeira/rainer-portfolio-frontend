/**
 * Query Provider
 * 
 * Provider do React Query (TanStack Query) para gerenciar cache e estado.
 * 
 * @fileoverview Provider React Query
 * @author Rainer Teixeira
 * @version 1.0.0
 */

"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState, type ReactNode } from 'react'

interface QueryProviderProps {
  children: ReactNode
}

/**
 * Provider do React Query
 * 
 * Configura cliente com opções otimizadas para o blog.
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
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* DevTools apenas em desenvolvimento */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
}

