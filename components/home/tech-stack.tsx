/**
 * Tech Stack Showcase
 * 
 * Carrossel horizontal de tecnologias dominadas com logos e animação suave
 * 
 * @fileoverview Tech stack carousel component
 * @author Rainer Teixeira
 */

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"
import { SITE_CONFIG, SKILLS } from "@/constants"

export function TechStackShowcase() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'

  // Usa SKILLS da constante (com ícones)
  const technologies = SKILLS

  // Duplicate technologies for infinite scroll effect
  const duplicatedTech = [...technologies, ...technologies]

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <Badge className={`${isDark ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/50 text-cyan-200' : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/50 text-blue-700'}`}>
              <Sparkles className="h-3 w-3 mr-1" />
              Stack Tecnológico
            </Badge>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold dark:text-cyan-200 dark:font-mono mb-4"
          >
            Tecnologias Dominadas
          </motion.h2>
          <p className="text-muted-foreground dark:text-gray-400 max-w-2xl mx-auto">
            Stack moderna para desenvolvimento full-stack com foco em performance e escalabilidade
          </p>
        </div>

        {/* Infinite Carousel */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />
          
          {/* Carousel Container */}
          <div className="overflow-hidden py-4">
            <motion.div
              className="flex gap-6"
              animate={{
                x: [0, -50 * technologies.length],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
            >
              {duplicatedTech.map((tech, index) => (
                <Card
                  key={`${tech.name}-${index}`}
                  className="flex-shrink-0 w-[280px] dark:bg-black/30 dark:border-cyan-400/20 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
                >
                  <CardContent className="p-6">
                    {/* Icon */}
                    <div className="relative mb-4">
                      <div className={`w-20 h-20 mx-auto rounded-xl bg-gradient-to-br ${tech.color} p-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <div className="text-white">
                          {tech.icon}
                        </div>
                      </div>
                      {/* Glow Effect */}
                      <div className={`absolute inset-0 w-20 h-20 mx-auto rounded-xl bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300`} />
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="font-bold text-lg mb-1 dark:text-gray-100 group-hover:text-cyan-400 transition-colors">
                        {tech.name}
                      </h3>
                      <Badge 
                        variant="outline" 
                        className="text-xs dark:border-cyan-400/30 dark:text-gray-400"
                      >
                        {tech.category}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap justify-center gap-8 text-center"
        >
          <div>
            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Tecnologias
            </div>
            <div className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
              {SITE_CONFIG.experience}
            </div>
          </div>
          <div className="w-px bg-border dark:bg-cyan-400/20" />
          <div>
            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Experiência
            </div>
            <div className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
              {SITE_CONFIG.experience}
            </div>
          </div>
          <div className="w-px bg-border dark:bg-cyan-400/20" />
          <div>
            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Projetos Completos
            </div>
            <div className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
              {SITE_CONFIG.projects}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
