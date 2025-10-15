/**
 * Portfolio Showcase
 * 
 * Showcase de projetos em destaque
 * 
 * @fileoverview Portfolio showcase component
 * @author Rainer Teixeira
 */

"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ExternalLink, GithubIcon, Award, ArrowRight } from "lucide-react"

export function PortfolioShowcase() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'

  const projects = [
    {
      title: "Portfólio Enterprise",
      description: "Este site! Sistema completo com blog, dashboard admin, PWA, autenticação, editor Tiptap e Lighthouse 95+",
      image: "/images/b1.png",
      tags: ["Next.js 15", "React 19", "TypeScript", "Tailwind"],
      featured: true,
      github: "https://github.com/rainerteixeira/rainer-portfolio-frontend",
      demo: "https://rainersoft.com.br"
    },
    {
      title: "Dashboard Crypto",
      description: "Dashboard de criptomoedas com backend NestJS, PostgreSQL + Prisma, gráficos em tempo real e autenticação JWT",
      image: "/images/b2.png",
      tags: ["NestJS", "PostgreSQL", "Prisma", "Docker"],
      featured: true,
      github: "#"
    },
    {
      title: "Planejador Financeiro",
      description: "Sistema completo de planejamento financeiro pessoal com frontend React e backend Node.js robusto",
      image: "/images/b3.png",
      tags: ["React", "Node.js", "MongoDB", "Charts"],
      featured: true,
      github: "#"
    }
  ]

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className={`mb-4 ${isDark ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-400/50 text-cyan-200' : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/50 text-blue-700'}`}>
            <Award className="h-3 w-3 mr-1" />
            Portfolio Real
          </Badge>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold dark:text-cyan-200 dark:font-mono mb-4"
          >
            Projetos que Desenvolvi
          </motion.h2>
          <p className="text-muted-foreground dark:text-gray-400 max-w-2xl mx-auto">
            Sistemas full-stack complexos e funcionais que comprovam domínio técnico real. Código disponível no GitHub.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full dark:bg-black/40 dark:border-cyan-400/20 hover:shadow-xl transition-all overflow-hidden group">
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-black/60 to-transparent' : 'bg-gradient-to-t from-gray-900/50 to-transparent'}`} />
                  {project.featured && (
                    <Badge className={`absolute top-4 right-4 ${isDark ? 'bg-gradient-to-r from-cyan-500 to-purple-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'} text-white border-0 shadow-lg`}>
                      ⭐ Projeto Real
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2 dark:text-gray-100 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs dark:border-cyan-400/30">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 dark:border-cyan-400/30">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ver Projeto
                    </Button>
                    <Button size="sm" variant="ghost">
                      <GithubIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Ver Mais */}
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="dark:border-cyan-400/30 gap-2">
            <a href="https://github.com/rainerteixeira" target="_blank" rel="noopener noreferrer">
              <GithubIcon className="h-4 w-4" />
              Ver Mais no GitHub
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

