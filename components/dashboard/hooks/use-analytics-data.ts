/**
 * Hook para Dados de Analytics
 * 
 * Hook personalizado para buscar dados de analytics (views, engagement)
 * 
 * @fileoverview Analytics data hook
 * @author Rainer Teixeira
 */

"use client"

import { useState, useEffect, useCallback } from "react"

interface ViewsData {
  date: string
  views: number
  uniqueViews?: number
}

interface EngagementData {
  date: string
  likes: number
  comments: number
}

type Period = "7d" | "30d" | "90d"

export function useAnalyticsData(period: Period = "30d") {
  const [viewsData, setViewsData] = useState<ViewsData[]>([])
  const [engagementData, setEngagementData] = useState<EngagementData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/dashboard/analytics?period=${period}`)
      
      if (!response.ok) {
        throw new Error("Erro ao carregar dados de analytics")
      }

      const data = await response.json()
      setViewsData(data.views || [])
      setEngagementData(data.engagement || [])
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao carregar dados de analytics"
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [period])

  useEffect(() => {
    loadData()
  }, [loadData])

  function refreshData() {
    loadData()
  }

  return {
    viewsData,
    engagementData,
    isLoading,
    error,
    refreshData,
  }
}

