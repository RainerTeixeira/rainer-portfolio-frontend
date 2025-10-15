/**
 * Seção Sobre Mim (About Section)
 * 
 * Card de apresentação pessoal/profissional redesenhado com visual premium
 * 
 * @fileoverview Seção de apresentação profissional na home
 * @author Rainer Teixeira
 */

"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Target, Code, Rocket, ArrowRight, Sparkles, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

export const AboutSection = memo(function AboutSection() {
  const stats = [
    {
      icon: Target,
      value: "10+",
      label: "Projetos Full-Stack",
      gradient: "from-cyan-500 to-blue-600",
      iconBg: "from-cyan-400 to-blue-500"
    },
    {
      icon: Code,
      value: "50K+",
      label: "Linhas de Código",
      gradient: "from-purple-500 to-pink-600",
      iconBg: "from-purple-400 to-pink-500"
    },
    {
      icon: Rocket,
      value: "20+",
      label: "Tecnologias",
      gradient: "from-orange-500 to-amber-600",
      iconBg: "from-orange-400 to-amber-500"
    }
  ]

  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Brilho de fundo */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 dark:from-cyan-400/5 dark:via-purple-400/5 dark:to-pink-400/5 blur-3xl"></div>
        
        {/* Header da seção */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-white font-bold text-sm mb-8 shadow-xl"
          >
            <Sparkles className="w-5 h-5" />
            Conheça Meu Trabalho
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
          >
            Sobre Mim
          </motion.h2>
        </div>

        {/* Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 relative">
          {/* Coluna 1: Avatar + Info (2 colunas) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="relative bg-card/80 dark:bg-black/60 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-border/50 dark:border-cyan-400/30 shadow-2xl overflow-hidden">
              {/* Brilho de fundo */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 dark:from-cyan-400/10 dark:via-purple-400/10 dark:to-pink-400/10"></div>
              
              <div className="relative z-10 text-center">
                {/* Avatar Premium */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-8">
                  {/* Círculo externo animado */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-spin-slow opacity-60 blur-md"></div>
                  
                  {/* Avatar */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-2xl group-hover:scale-105 transition-transform duration-500">
                    <Image
                      src="/images/t1.jpg"
                      alt="Rainer Teixeira - Desenvolvedor Full-Stack"
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  </div>
                  
                  {/* Badge de status */}
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl shadow-green-500/50 border-4 border-background animate-pulse">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Nome e título */}
                <h3 className="text-2xl sm:text-3xl font-black mb-3 text-foreground dark:text-white">
                  Rainer Teixeira
                </h3>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 dark:from-cyan-400/20 dark:to-purple-400/20 border border-cyan-400/30 mb-6">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                  <span className="text-sm font-bold text-foreground dark:text-cyan-300">
                    Desenvolvedor Full-Stack
                  </span>
                </div>

                {/* CTA Button */}
                <Button 
                  asChild 
                  className="w-full group/btn bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white shadow-xl shadow-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/40 transition-all duration-300"
                >
                  <Link href="/sobre">
                    Ver Perfil Completo
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Coluna 2: Stats + Bio (3 colunas) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="group/stat"
                  >
                    <div className="relative bg-card/80 dark:bg-black/60 backdrop-blur-xl rounded-2xl p-6 border border-border/50 dark:border-cyan-400/20 hover:border-primary dark:hover:border-cyan-400/60 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 overflow-hidden text-center">
                      {/* Brilho de fundo */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover/stat:opacity-10 transition-opacity duration-500`}></div>
                      
                      <div className="relative z-10">
                        {/* Ícone */}
                        <div className="relative mb-4">
                          <div className={`absolute inset-0 bg-gradient-to-br ${stat.iconBg} rounded-xl blur-md opacity-40`}></div>
                          <div className={`relative inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.iconBg} shadow-lg group-hover/stat:scale-110 group-hover/stat:rotate-6 transition-all duration-300`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        
                        {/* Valor */}
                        <div className={`text-3xl sm:text-4xl font-black mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                          {stat.value}
                        </div>
                        
                        {/* Label */}
                        <div className="text-xs sm:text-sm font-semibold text-muted-foreground dark:text-gray-300 group-hover/stat:text-foreground dark:group-hover/stat:text-white transition-colors">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Bio Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="relative bg-card/80 dark:bg-black/60 backdrop-blur-xl rounded-2xl p-8 border border-border/50 dark:border-purple-400/30 shadow-xl overflow-hidden"
            >
              {/* Brilho de fundo */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-cyan-500/5 dark:from-purple-400/10 dark:via-pink-400/5 dark:to-cyan-400/10"></div>
              
              <div className="relative z-10 space-y-4">
                <p className="text-base sm:text-lg text-muted-foreground dark:text-gray-300 leading-relaxed">
                  <span className="font-bold text-foreground dark:text-cyan-200">Desenvolvedor Full-Stack</span> com domínio técnico comprovado através de projetos reais. 
                  Desenvolvi sistemas enterprise completos: <span className="font-semibold text-foreground/90 dark:text-purple-200">portfólio profissional com PWA + blog + autenticação + dashboard admin</span> (este site!), 
                  dashboard de criptomoedas com backend NestJS + PostgreSQL, planejador financeiro full-stack e mais.
                </p>
                
                <p className="text-sm sm:text-base text-muted-foreground dark:text-gray-300 leading-relaxed">
                  Stack completa: <span className="font-semibold text-foreground/90 dark:text-pink-200">React 19, Next.js 15, TypeScript, Node.js, NestJS, PostgreSQL, Prisma ORM, Docker e CI/CD</span>. 
                  Arquitetura modular, código limpo, documentação completa e <span className="font-bold text-foreground dark:text-cyan-200">resultado que impressiona</span>.
                </p>

                <div className="pt-4 flex items-center justify-center gap-2 text-sm font-medium">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-cyan-500/5 dark:from-cyan-400/20 dark:to-cyan-400/10 border border-cyan-400/30">
                    <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span className="text-foreground dark:text-cyan-300">Lighthouse 95+</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-purple-500/5 dark:from-purple-400/20 dark:to-purple-400/10 border border-purple-400/30">
                    <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-foreground dark:text-purple-300">WCAG AA</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
})
