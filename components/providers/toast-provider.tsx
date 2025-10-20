/**
 * Toast Provider
 * 
 * Provider do Sonner para notificações toast.
 * 
 * @fileoverview Provider de toasts
 * @author Rainer Teixeira
 * @version 1.0.0
 */

"use client"

import { Toaster } from 'sonner'
import { useTheme } from 'next-themes'

/**
 * Provider de Toasts
 * 
 * Configura Sonner com tema do sistema.
 */
export function ToastProvider() {
  const { theme } = useTheme()

  return (
    <Toaster
      position="top-right"
      expand={false}
      richColors
      theme={(theme as 'light' | 'dark') || 'system'}
      toastOptions={{
        classNames: {
          toast: 'dark:bg-gray-900 dark:border-cyan-400/20',
          title: 'dark:text-gray-100',
          description: 'dark:text-gray-400',
          error: 'dark:bg-red-900/20 dark:border-red-400/30',
          success: 'dark:bg-green-900/20 dark:border-green-400/30',
        },
      }}
    />
  )
}

