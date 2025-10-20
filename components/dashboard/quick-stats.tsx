/**
 * Estatísticas Rápidas do Dashboard
 * 
 * Cards com métricas principais do blog
 * 
 * @fileoverview Quick Stats Component
 * @author Rainer Teixeira
 */

"use client"

import { motion } from "framer-motion"
import { 
  FileText, 
  Eye, 
  Heart, 
  MessageSquare,
  TrendingUp,
  TrendingDown
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Stat {
  label: string
  value: string | number
  change?: number
  icon: React.ReactNode
  color: string
}

interface QuickStatsProps {
  stats?: Stat[]
}

export function QuickStats({ stats }: QuickStatsProps) {
  // Stats padrão
  const defaultStats: Stat[] = [
    {
      label: "Total de Posts",
      value: 4,
      change: 12,
      icon: <FileText className="w-5 h-5" />,
      color: "from-cyan-500 to-blue-500"
    },
    {
      label: "Visualizações",
      value: "2.4k",
      change: 8,
      icon: <Eye className="w-5 h-5" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      label: "Curtidas",
      value: 156,
      change: -3,
      icon: <Heart className="w-5 h-5" />,
      color: "from-orange-500 to-red-500"
    },
    {
      label: "Comentários",
      value: 42,
      change: 15,
      icon: <MessageSquare className="w-5 h-5" />,
      color: "from-green-500 to-emerald-500"
    }
  ]

  const displayStats = stats || defaultStats

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {displayStats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            delay: index * 0.1 
          }}
        >
          <Card className="relative overflow-hidden border-2 hover:shadow-lg dark:hover:shadow-cyan-400/10 transition-all duration-300 hover:scale-105">
            {/* Gradiente de fundo */}
            <div className={cn(
              "absolute top-0 right-0 w-32 h-32 opacity-10",
              "bg-gradient-to-br rounded-full blur-2xl",
              stat.color
            )} />

            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <div className={cn(
                  "p-3 rounded-lg bg-gradient-to-br",
                  stat.color,
                  "text-white"
                )}>
                  {stat.icon}
                </div>

                {stat.change !== undefined && (
                  <div className={cn(
                    "flex items-center gap-1 text-sm font-medium",
                    stat.change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  )}>
                    {stat.change >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {Math.abs(stat.change)}%
                  </div>
                )}
              </div>

              <div>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

