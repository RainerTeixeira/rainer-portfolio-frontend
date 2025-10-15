/**
 * Stats Showcase
 * 
 * Seção com números/estatísticas impressionantes
 * 
 * @fileoverview Stats showcase component
 * @author Rainer Teixeira
 */

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Code, Star, Trophy, Zap, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

export function StatsShowcase() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'

  const stats = [
    {
      icon: Code,
      value: "50K+",
      label: "Linhas de Código",
      gradient: "from-cyan-500 to-blue-600",
      iconBg: "from-cyan-400 to-blue-500",
      glowColor: "cyan-500"
    },
    {
      icon: Users,
      value: "10+",
      label: "Projetos Completos",
      gradient: "from-purple-500 to-pink-600",
      iconBg: "from-purple-400 to-pink-500",
      glowColor: "purple-500"
    },
    {
      icon: Star,
      value: "95+",
      label: "Lighthouse Score",
      gradient: "from-yellow-500 to-orange-600",
      iconBg: "from-yellow-400 to-orange-500",
      glowColor: "yellow-500"
    },
    {
      icon: Trophy,
      value: "200+",
      label: "Componentes Criados",
      gradient: "from-green-500 to-emerald-600",
      iconBg: "from-green-400 to-emerald-500",
      glowColor: "green-500"
    },
    {
      icon: Zap,
      value: "< 2s",
      label: "Tempo de Carregamento",
      gradient: "from-orange-500 to-red-600",
      iconBg: "from-orange-400 to-red-500",
      glowColor: "orange-500"
    },
    {
      icon: Globe,
      value: "20+",
      label: "Tecnologias Dominadas",
      gradient: "from-pink-500 to-rose-600",
      iconBg: "from-pink-400 to-rose-500",
      glowColor: "pink-500"
    }
  ]

  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header com efeito WOW */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full ${isDark ? 'bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400' : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'} text-white font-bold text-sm mb-8 shadow-xl`}
          >
            <Trophy className="w-5 h-5" />
            Métricas de Impacto
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
          >
            Números que Falam
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Métricas reais dos projetos que comprovam <span className="font-bold text-foreground dark:text-cyan-200">domínio técnico avançado</span> e capacidade de entregar software de qualidade
          </motion.p>
        </div>

        {/* Stats Grid Redesenhado */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                className="group"
              >
                <div className="relative">
                  {/* Brilho de fundo */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.iconBg} rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                  
                  {/* Card */}
                  <Card className={cn(
                    "relative bg-card/80 dark:bg-black/60 backdrop-blur-xl",
                    "border border-border/50 dark:border-cyan-400/20",
                    "hover:border-primary dark:hover:border-cyan-400/60",
                    "transition-all duration-500",
                    "hover:shadow-2xl hover:-translate-y-2",
                    "overflow-hidden"
                  )}>
                    {/* Brilho interno */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    <CardContent className="p-6 sm:p-8 text-center relative z-10">
                      {/* Ícone com efeito premium */}
                      <div className="relative mb-6">
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.iconBg} rounded-2xl blur-md opacity-40`}></div>
                        <div className={`relative inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.iconBg} shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                          <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                        </div>
                      </div>
                      
                      {/* Valor */}
                      <div className={`text-4xl sm:text-5xl font-black mb-3 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                        {stat.value}
                      </div>
                      
                      {/* Label */}
                      <div className="text-sm sm:text-base font-semibold text-muted-foreground dark:text-gray-300 group-hover:text-foreground dark:group-hover:text-white transition-colors">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

