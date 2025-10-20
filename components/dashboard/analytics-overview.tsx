/**
 * Analytics Overview
 * 
 * Cards com métricas de analytics do blog
 * 
 * @fileoverview Analytics overview component
 * @author Rainer Teixeira
 */

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Eye, Heart, MessageSquare, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface AnalyticsOverviewProps {
  className?: string
}

export function AnalyticsOverview({ className }: AnalyticsOverviewProps) {
  // Mock data - substituir por dados reais da API
  const metrics = [
    {
      title: "Visualizações Totais",
      value: "12.5K",
      change: "+20.1%",
      trend: "up",
      icon: Eye,
      color: "text-cyan-500"
    },
    {
      title: "Visitantes Únicos",
      value: "3.2K",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "text-purple-500"
    },
    {
      title: "Curtidas",
      value: "847",
      change: "+12.5%",
      trend: "up",
      icon: Heart,
      color: "text-pink-500"
    },
    {
      title: "Comentários",
      value: "234",
      change: "+8.2%",
      trend: "up",
      icon: MessageSquare,
      color: "text-orange-500"
    },
    {
      title: "Compartilhamentos",
      value: "156",
      change: "+25.7%",
      trend: "up",
      icon: Share2,
      color: "text-green-500"
    },
    {
      title: "Taxa de Engajamento",
      value: "68%",
      change: "+5.4%",
      trend: "up",
      icon: TrendingUp,
      color: "text-blue-500"
    }
  ]

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {metrics.map((metric, index) => {
        const Icon = metric.icon
        return (
          <Card key={index} className="dark:bg-black/30 dark:border-cyan-400/20 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <Icon className={cn("h-4 w-4", metric.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold dark:text-gray-100">
                {metric.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className={cn(
                  "font-medium",
                  metric.trend === "up" ? "text-green-500" : "text-red-500"
                )}>
                  {metric.change}
                </span>
                {" "}vs mês anterior
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

