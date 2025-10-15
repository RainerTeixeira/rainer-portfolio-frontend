/**
 * Hook para Estatísticas do Dashboard
 * 
 * Hook personalizado para buscar e gerenciar estatísticas do dashboard
 * 
 * @fileoverview Dashboard stats hook
 * @author Rainer Teixeira
 */

"use client"

import { useState, useEffect } from "react"

interface DashboardStats {
  totalPosts: number
  totalViews: number
  totalLikes: number
  totalComments: number
  postsChange?: number
  viewsChange?: number
  likesChange?: number
  commentsChange?: number
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadStats()
  }, [])

  async function loadStats() {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/dashboard/stats")
      
      if (!response.ok) {
        throw new Error("Erro ao carregar estatísticas")
      }

      const data = await response.json()
      setStats(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao carregar estatísticas"
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  function refreshStats() {
    loadStats()
  }

  return {
    stats,
    isLoading,
    error,
    refreshStats,
  }
}

