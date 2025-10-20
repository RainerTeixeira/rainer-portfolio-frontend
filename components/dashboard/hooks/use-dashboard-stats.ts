/**
 * Hook para Estatísticas Gerais do Dashboard
 * 
 * Busca e gerencia estatísticas principais do blog/portfólio,
 * incluindo métricas de posts, engajamento e comparações temporais.
 * 
 * Métricas Fornecidas:
 * - 📝 Total de posts publicados
 * - 👁️ Total de visualizações
 * - ❤️ Total de curtidas
 * - 💬 Total de comentários
 * - 📊 Variações percentuais (comparado ao período anterior)
 * 
 * Funcionalidades:
 * - Carregamento automático na montagem do componente
 * - Estados de loading e erro gerenciados
 * - Função de refresh para atualização manual
 * - Dados de variação para indicadores de tendência
 * 
 * Uso principal:
 * - Cards de estatísticas no dashboard
 * - Métricas de overview
 * - Indicadores de desempenho
 * 
 * @fileoverview Hook para estatísticas principais do dashboard
 * @author Rainer Teixeira
 * @version 1.0.0
 */

"use client"

import { useState, useEffect } from "react"

/**
 * Interface das estatísticas do dashboard
 * 
 * @interface DashboardStats
 * @property {number} totalPosts - Total de posts publicados
 * @property {number} totalViews - Total de visualizações de todos os posts
 * @property {number} totalLikes - Total de curtidas recebidas
 * @property {number} totalComments - Total de comentários recebidos
 * @property {number} [postsChange] - Variação % de posts (comparado ao período anterior)
 * @property {number} [viewsChange] - Variação % de views (comparado ao período anterior)
 * @property {number} [likesChange] - Variação % de likes (comparado ao período anterior)
 * @property {number} [commentsChange] - Variação % de comentários (comparado ao período anterior)
 */
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

/**
 * Hook useDashboardStats
 * 
 * Carrega e gerencia as estatísticas principais do dashboard.
 * Faz requisição à API `/api/dashboard/stats` e fornece os dados
 * formatados com estados de loading e erro.
 * 
 * Comportamento:
 * - Carrega automaticamente ao montar o componente
 * - Retorna null para stats durante o loading
 * - Fornece mensagem de erro se a requisição falhar
 * - Permite refresh manual dos dados
 * 
 * @returns {Object} Objeto com estatísticas e controles
 * @returns {DashboardStats | null} stats - Dados das estatísticas (null durante loading)
 * @returns {boolean} isLoading - Indica se está carregando os dados
 * @returns {string | null} error - Mensagem de erro (null se não houver erro)
 * @returns {Function} refreshStats - Função para recarregar as estatísticas
 * 
 * @example
 * // Uso básico em cards de estatísticas
 * import { useDashboardStats } from '@/components/dashboard/hooks'
 * 
 * function StatsCards() {
 *   const { stats, isLoading, error } = useDashboardStats()
 *   
 *   if (isLoading) return <LoadingSkeleton />
 *   if (error) return <ErrorMessage message={error} />
 *   if (!stats) return null
 *   
 *   return (
 *     <div className="grid grid-cols-4 gap-4">
 *       <StatCard 
 *         title="Posts" 
 *         value={stats.totalPosts} 
 *         change={stats.postsChange}
 *       />
 *       <StatCard 
 *         title="Views" 
 *         value={stats.totalViews} 
 *         change={stats.viewsChange}
 *       />
 *       <StatCard 
 *         title="Likes" 
 *         value={stats.totalLikes} 
 *         change={stats.likesChange}
 *       />
 *       <StatCard 
 *         title="Comentários" 
 *         value={stats.totalComments}
 *         change={stats.commentsChange}
 *       />
 *     </div>
 *   )
 * }
 * 
 * @example
 * // Uso com refresh manual
 * function DashboardOverview() {
 *   const { stats, refreshStats, isLoading } = useDashboardStats()
 *   
 *   return (
 *     <div>
 *       <button onClick={refreshStats} disabled={isLoading}>
 *         {isLoading ? 'Carregando...' : 'Atualizar Stats'}
 *       </button>
 *       {stats && (
 *         <div>
 *           <p>Total de Posts: {stats.totalPosts}</p>
 *           <p>Total de Views: {stats.totalViews.toLocaleString()}</p>
 *         </div>
 *       )}
 *     </div>
 *   )
 * }
 * 
 * @example
 * // Uso com indicadores de tendência
 * function TrendIndicator() {
 *   const { stats } = useDashboardStats()
 *   
 *   const getTrendIcon = (change?: number) => {
 *     if (!change) return '→'
 *     return change > 0 ? '↑' : '↓'
 *   }
 *   
 *   return (
 *     <div>
 *       <p>
 *         Views: {stats?.totalViews} 
 *         <span className={stats?.viewsChange && stats.viewsChange > 0 ? 'text-green-500' : 'text-red-500'}>
 *           {getTrendIcon(stats?.viewsChange)} {stats?.viewsChange}%
 *         </span>
 *       </p>
 *     </div>
 *   )
 * }
 * 
 * @see {@link /api/dashboard/stats} - Endpoint da API
 */
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

