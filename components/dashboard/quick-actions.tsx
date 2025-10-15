/**
 * Ações Rápidas do Dashboard
 * 
 * Botões de acesso rápido para ações principais
 * 
 * @fileoverview Quick Actions Component
 * @author Rainer Teixeira
 */

"use client"

import { motion } from "framer-motion"
import { Plus, FileText, Settings, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface QuickActionsProps {
  onNewPost?: () => void
  onViewPosts?: () => void
  onViewStats?: () => void
  onSettings?: () => void
}

export function QuickActions({
  onNewPost,
  onViewPosts,
  onViewStats,
  onSettings
}: QuickActionsProps) {
  const actions = [
    {
      icon: <Plus className="w-5 h-5" />,
      label: "Novo Post",
      description: "Criar novo artigo",
      color: "from-cyan-500 to-blue-500",
      onClick: onNewPost
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: "Meus Posts",
      description: "Ver todos os posts",
      color: "from-purple-500 to-pink-500",
      onClick: onViewPosts
    },
    {
      icon: <BarChart className="w-5 h-5" />,
      label: "Estatísticas",
      description: "Análise e métricas",
      color: "from-orange-500 to-red-500",
      onClick: onViewStats
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: "Configurações",
      description: "Ajustes do blog",
      color: "from-green-500 to-emerald-500",
      onClick: onSettings
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                onClick={action.onClick}
                variant="outline"
                className="w-full h-auto p-4 flex flex-col items-start gap-2 hover:border-cyan-400/50 dark:hover:bg-cyan-400/5"
              >
                <div className={`p-2 rounded-lg bg-gradient-to-br ${action.color} text-white`}>
                  {action.icon}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

