/**
 * Hook para Dados de Analytics do Dashboard
 * 
 * Hook personalizado que busca e gerencia dados de analytics do blog,
 * incluindo visualizações (views) e engajamento (likes e comentários).
 * 
 * Funcionalidades:
 * - Carrega dados de visualizações por data
 * - Carrega dados de engajamento (likes e comentários)
 * - Permite filtrar por período (7, 30 ou 90 dias)
 * - Gerencia estados de loading e erro
 * - Fornece função de refresh para recarregar dados
 * 
 * Uso principal:
 * - Gráficos de analytics no dashboard
 * - Métricas de desempenho de posts
 * - Relatórios e visualizações de dados
 * 
 * @fileoverview Analytics data hook para dashboard
 * @author Rainer Teixeira
 * @version 1.0.0
 */

"use client"

import { useState, useEffect, useCallback } from "react"

/**
 * Dados de visualizações por data
 * 
 * @interface ViewsData
 * @property {string} date - Data no formato YYYY-MM-DD
 * @property {number} views - Total de visualizações na data
 * @property {number} [uniqueViews] - Visualizações únicas (opcional)
 */
interface ViewsData {
  date: string
  views: number
  uniqueViews?: number
}

/**
 * Dados de engajamento por data
 * 
 * @interface EngagementData
 * @property {string} date - Data no formato YYYY-MM-DD
 * @property {number} likes - Total de curtidas na data
 * @property {number} comments - Total de comentários na data
 */
interface EngagementData {
  date: string
  likes: number
  comments: number
}

/**
 * Período de tempo para análise
 * 
 * @type Period
 * @description
 * - "7d": Últimos 7 dias
 * - "30d": Últimos 30 dias (padrão)
 * - "90d": Últimos 90 dias
 */
type Period = "7d" | "30d" | "90d"

/**
 * Hook useAnalyticsData
 * 
 * Busca e gerencia dados de analytics do blog para exibição no dashboard.
 * Realiza chamada à API `/api/dashboard/analytics` e organiza os dados
 * de visualizações e engajamento.
 * 
 * @param {Period} [period="30d"] - Período de análise (7d, 30d ou 90d)
 * 
 * @returns {Object} Objeto com dados e funções de analytics
 * @returns {ViewsData[]} viewsData - Array com dados de visualizações por data
 * @returns {EngagementData[]} engagementData - Array com dados de engajamento por data
 * @returns {boolean} isLoading - Indica se está carregando dados
 * @returns {string | null} error - Mensagem de erro (null se não houver erro)
 * @returns {Function} refreshData - Função para recarregar os dados
 * 
 * @example
 * // Uso básico com período padrão (30 dias)
 * import { useAnalyticsData } from '@/components/dashboard/hooks'
 * 
 * function AnalyticsChart() {
 *   const { viewsData, engagementData, isLoading, error } = useAnalyticsData()
 *   
 *   if (isLoading) return <Spinner />
 *   if (error) return <Error message={error} />
 *   
 *   return (
 *     <LineChart data={viewsData} />
 *   )
 * }
 * 
 * @example
 * // Uso com período personalizado e refresh
 * function CustomAnalytics() {
 *   const [period, setPeriod] = useState<Period>("7d")
 *   const { viewsData, engagementData, refreshData } = useAnalyticsData(period)
 *   
 *   return (
 *     <div>
 *       <select onChange={(e) => setPeriod(e.target.value as Period)}>
 *         <option value="7d">7 dias</option>
 *         <option value="30d">30 dias</option>
 *         <option value="90d">90 dias</option>
 *       </select>
 *       <button onClick={refreshData}>Atualizar</button>
 *       <Chart data={viewsData} />
 *     </div>
 *   )
 * }
 * 
 * @see {@link /api/dashboard/analytics} - Endpoint da API
 */
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

