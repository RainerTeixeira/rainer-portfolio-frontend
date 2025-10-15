/**
 * About Page Component
 * 
 * Página de apresentação profissional com experiência e skills.
 * Exibe trajetória profissional, tecnologias e call-to-actions.
 * 
 * Características:
 * - Header com avatar profissional
 * - Cards de métricas impressionantes
 * - Timeline de experiência profissional
 * - Grid de tecnologias (tech stack)
 * - Seção de competências por camada (frontend, backend, database, devops)
 * - CTAs (Download CV, Contato, Redes Sociais)
 * - Efeitos visuais premium
 * 
 * @fileoverview Página sobre o desenvolvedor
 * @author Rainer Teixeira
 * @version 1.0.0
 */

// ============================================================================
// Next.js Imports
// ============================================================================

import Image from "next/image"
import Link from "next/link"

// ============================================================================
// Icons
// ============================================================================

import { Download, Mail, GithubIcon, Linkedin, Globe } from "lucide-react"

// ============================================================================
// UI Components
// ============================================================================

import { ParticlesEffect, PageHeader, BackToTop } from "@/components/ui"
import { Button } from "@/components/ui/button"

// ============================================================================
// Constants & Config
// ============================================================================

import { SKILLS, EXPERIENCE } from "@/constants"

// ============================================================================
// Constants
// ============================================================================

/**
 * Dados das métricas profissionais
 */
const PROFESSIONAL_METRICS = {
  projects: {
    value: '10+',
    label: 'Projetos Completos',
    gradient: 'from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400',
    iconColor: 'from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500'
  },
  linesOfCode: {
    value: '50K+',
    label: 'Linhas de Código',
    gradient: 'from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400',
    iconColor: 'from-green-500 to-emerald-600 dark:from-green-400 dark:to-emerald-500'
  },
  technologies: {
    value: '20+',
    label: 'Tecnologias',
    gradient: 'from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400',
    iconColor: 'from-orange-500 to-amber-600 dark:from-orange-400 dark:to-amber-500'
  },
  lighthouseScore: {
    value: '95+',
    label: 'Lighthouse Score',
    gradient: 'from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400',
    iconColor: 'from-purple-500 to-pink-600 dark:from-purple-400 dark:to-pink-500'
  }
} as const

/**
 * Tecnologias por camada
 */
const TECH_BY_LAYER = {
  frontend: ["React", "Next.js", "TypeScript", "React Native", "Tailwind CSS", "Framer Motion"],
  backend: ["Node.js", "Python", "Express", "REST APIs", "GraphQL", "WebSockets"],
  database: ["PostgreSQL", "MongoDB", "Redis", "Prisma ORM", "SQL", "NoSQL"],
  devops: ["AWS", "Azure", "Docker", "Kubernetes", "CI/CD", "GitHub Actions"]
} as const

// ============================================================================
// Main Component
// ============================================================================

/**
 * Componente principal da About Page
 * 
 * Renderiza apresentação profissional completa com:
 * - Avatar com animações
 * - Métricas profissionais
 * - Timeline de experiência
 * - Tech stack organizado
 * - Competências por camada
 * - CTAs de ação
 * 
 * @returns Página sobre completa
 */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-gradient-to-b dark:from-black dark:via-gray-900 dark:to-black">
      {/** Efeito de partículas decorativas (dark mode) */}
      <ParticlesEffect variant="alt1" />
      
      {/** Header da página com avatar */}
      <PageHeader
        title="Rainer Teixeira"
        description="Desenvolvedor Full-Stack especializado em criar experiências digitais completas e profissionais. Do design ao deploy, transformo ideias em aplicações web modernas, escaláveis e de alta performance."
      >
        {/** Avatar com efeitos modernos e animados */}
        <div className="relative w-36 h-36 sm:w-40 sm:h-40 mx-auto group/avatar">
          {/* Círculo externo animado */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-spin-slow opacity-75 blur-md"></div>
          
          {/* Avatar principal */}
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-purple-400/20 to-pink-400/20 dark:opacity-40 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-500"></div>
            <Image
              src="/images/t2.jpg"
              alt="Rainer Teixeira - Desenvolvedor Full-Stack"
              fill
              className="object-cover relative z-10 group-hover/avatar:scale-110 transition-transform duration-500"
              sizes="(max-width: 640px) 144px, 160px"
              priority
            />
          </div>
          
          {/* Badge de status - online/disponível */}
          <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 border-4 border-background animate-pulse">
            <span className="text-white text-lg font-bold">✓</span>
          </div>
        </div>
      </PageHeader>

      {/** Seção de métricas impressionantes */}
      <div className="max-w-7xl mx-auto px-6 pb-12 relative z-10">
        <div className="relative">
          {/* Brilho de fundo */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 dark:from-cyan-400/5 dark:via-purple-400/5 dark:to-pink-400/5 blur-3xl"></div>
          
          {/* Card de métricas */}
          <div className="relative bg-card/80 dark:bg-black/60 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border border-border/50 dark:border-cyan-400/30 shadow-2xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {/* Métrica 1: Projetos */}
              <div className="text-center group/metric transform hover:scale-105 transition-all duration-300">
                <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl rotate-6 group-hover/metric:rotate-12 transition-transform duration-300 opacity-20"></div>
                  <div className="relative bg-gradient-to-br from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 rounded-2xl p-4 shadow-xl shadow-cyan-500/30">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent mb-2">
                  10+
                </div>
                <div className="text-sm sm:text-base font-semibold text-muted-foreground dark:text-gray-300">
                  Projetos Completos
                </div>
              </div>

              {/* Métrica 2: Linhas de Código */}
              <div className="text-center group/metric transform hover:scale-105 transition-all duration-300">
                <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl rotate-6 group-hover/metric:rotate-12 transition-transform duration-300 opacity-20"></div>
                  <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-400 dark:to-emerald-500 rounded-2xl p-4 shadow-xl shadow-green-500/30">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent mb-2">
                  50K+
                </div>
                <div className="text-sm sm:text-base font-semibold text-muted-foreground dark:text-gray-300">
                  Linhas de Código
                </div>
              </div>

              {/* Métrica 3: Tecnologias */}
              <div className="text-center group/metric transform hover:scale-105 transition-all duration-300">
                <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl rotate-6 group-hover/metric:rotate-12 transition-transform duration-300 opacity-20"></div>
                  <div className="relative bg-gradient-to-br from-orange-500 to-amber-600 dark:from-orange-400 dark:to-amber-500 rounded-2xl p-4 shadow-xl shadow-orange-500/30">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-orange-600 to-amber-600 dark:from-orange-400 dark:to-amber-400 bg-clip-text text-transparent mb-2">
                  20+
                </div>
                <div className="text-sm sm:text-base font-semibold text-muted-foreground dark:text-gray-300">
                  Tecnologias
                </div>
              </div>

              {/* Métrica 4: Performance */}
              <div className="text-center group/metric transform hover:scale-105 transition-all duration-300">
                <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl rotate-6 group-hover/metric:rotate-12 transition-transform duration-300 opacity-20"></div>
                  <div className="relative bg-gradient-to-br from-purple-500 to-pink-600 dark:from-purple-400 dark:to-pink-500 rounded-2xl p-4 shadow-xl shadow-purple-500/30">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2">
                  95+
                </div>
                <div className="text-sm sm:text-base font-semibold text-muted-foreground dark:text-gray-300">
                  Lighthouse Score
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/** Conteúdo principal */}
      <div className="max-w-7xl mx-auto px-6 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/** Seção de Experiência - 2 colunas */}
          <div className="lg:col-span-2 space-y-6">
            {/* Título da seção */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-12 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
              <h2 className="text-3xl sm:text-4xl font-black text-foreground dark:text-cyan-200">
                Jornada Técnica
              </h2>
            </div>
            
            {/* Timeline de experiências */}
            <div className="space-y-6">
              {EXPERIENCE.map((exp, idx) => (
                <div 
                  key={idx} 
                  className="group/exp relative bg-card/80 dark:bg-black/40 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-border/50 dark:border-cyan-400/20 hover:border-primary dark:hover:border-cyan-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 overflow-hidden"
                >
                  {/* Brilho de fundo no hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-purple-500/0 to-pink-500/0 dark:from-cyan-400/0 dark:via-purple-400/0 dark:to-pink-400/0 group-hover/exp:from-cyan-500/5 group-hover/exp:via-purple-500/5 group-hover/exp:to-pink-500/5 dark:group-hover/exp:from-cyan-400/10 dark:group-hover/exp:via-purple-400/5 dark:group-hover/exp:to-pink-400/5 transition-all duration-500"></div>
                  
                  <div className="relative z-10">
                    {/* Barra lateral colorida */}
                    <div className="absolute -left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400 rounded-full"></div>
                    
                    {/* Badge de período */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 dark:from-cyan-400/20 dark:to-purple-400/20 border border-cyan-400/30 mb-4">
                      <svg className="w-4 h-4 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-bold text-cyan-700 dark:text-cyan-300">{exp.period}</span>
                    </div>
                    
                    {/* Título */}
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground dark:text-white mb-4 group-hover/exp:text-cyan-600 dark:group-hover/exp:text-cyan-300 transition-colors">
                      {exp.role}
                    </h3>
                    
                    {/* Descrição */}
                    <p className="text-sm sm:text-base text-muted-foreground dark:text-gray-300 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/** Seção de Tecnologias - 1 coluna */}
          <div className="space-y-6">
            {/* Título da seção */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground dark:text-purple-200">
                Tech Stack
              </h2>
            </div>
            
            {/* Card de tecnologias com grid */}
            <div className="sticky top-24 bg-card/80 dark:bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-border/50 dark:border-purple-400/20 shadow-xl">
              <div className="grid grid-cols-2 gap-3">
                {SKILLS.map((skill, idx) => (
                  <div 
                    key={idx}
                    className="group/skill flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-muted/50 to-transparent dark:from-purple-400/10 dark:to-transparent border border-border/30 dark:border-purple-400/20 hover:border-primary dark:hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 cursor-default"
                  >
                    {/* Ícone da tecnologia */}
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${skill.color} p-2 shadow-md group-hover/skill:scale-110 transition-transform`}>
                      <div className="text-white w-full h-full">
                        {skill.icon}
                      </div>
                    </div>
                    {/* Nome */}
                    <span className="text-sm font-bold text-foreground dark:text-gray-200 group-hover/skill:text-purple-600 dark:group-hover/skill:text-purple-300 transition-colors">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/** Seção de Competências por Camada */}
        <div className="mt-16">
          {/* Título da seção */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-white font-bold text-sm mb-6 shadow-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              Expertise Full-Stack
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Domínio Completo da Stack
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Do banco de dados à interface, desenvolvo todas as camadas com código limpo, documentado e testado
            </p>
          </div>

          {/* Grid de competências por camada */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Frontend */}
            <div className="group/layer relative bg-card/80 dark:bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-border/50 dark:border-cyan-400/20 hover:border-cyan-500 dark:hover:border-cyan-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 overflow-hidden">
              {/* Brilho de fundo */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 dark:from-cyan-400/0 dark:to-blue-400/0 group-hover/layer:from-cyan-500/10 group-hover/layer:to-blue-500/5 dark:group-hover/layer:from-cyan-400/10 dark:group-hover/layer:to-blue-400/5 transition-all duration-500"></div>
              
              <div className="relative z-10">
                {/* Header com ícone grande */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl blur-md opacity-40"></div>
                    <div className="relative p-4 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 shadow-xl group-hover/layer:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-foreground dark:text-cyan-200 mb-2 group-hover/layer:text-cyan-600 dark:group-hover/layer:text-cyan-300 transition-colors">
                      Frontend
                    </h3>
                    <p className="text-sm text-muted-foreground dark:text-gray-400 font-medium">
                      Interface & Experiência do Usuário
                    </p>
                  </div>
                </div>
                
                <p className="text-sm sm:text-base text-muted-foreground dark:text-gray-300 mb-6 leading-relaxed">
                  Interfaces responsivas e performáticas com React, Next.js e TypeScript. Componentização avançada, PWAs instaláveis e design systems profissionais.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {TECH_BY_LAYER.frontend.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 text-xs font-bold bg-cyan-500/10 dark:bg-cyan-400/15 text-cyan-700 dark:text-cyan-300 rounded-lg border border-cyan-500/30 dark:border-cyan-400/30 hover:bg-cyan-500/20 dark:hover:bg-cyan-400/25 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Backend */}
            <div className="group/layer relative bg-card/80 dark:bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-border/50 dark:border-green-400/20 hover:border-green-500 dark:hover:border-green-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-emerald-500/0 dark:from-green-400/0 dark:to-emerald-400/0 group-hover/layer:from-green-500/10 group-hover/layer:to-emerald-500/5 dark:group-hover/layer:from-green-400/10 dark:group-hover/layer:to-emerald-400/5 transition-all duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl blur-md opacity-40"></div>
                    <div className="relative p-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-400 dark:to-emerald-500 shadow-xl group-hover/layer:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-foreground dark:text-green-200 mb-2 group-hover/layer:text-green-600 dark:group-hover/layer:text-green-300 transition-colors">
                      Backend
                    </h3>
                    <p className="text-sm text-muted-foreground dark:text-gray-400 font-medium">
                      APIs & Lógica de Negócio
                    </p>
                  </div>
                </div>
                
                <p className="text-sm sm:text-base text-muted-foreground dark:text-gray-300 mb-6 leading-relaxed">
                  APIs RESTful bem estruturadas com Node.js e NestJS, autenticação JWT, integração com bancos de dados e validações robustas.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {TECH_BY_LAYER.backend.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 text-xs font-bold bg-green-500/10 dark:bg-green-400/15 text-green-700 dark:text-green-300 rounded-lg border border-green-500/30 dark:border-green-400/30 hover:bg-green-500/20 dark:hover:bg-green-400/25 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Database */}
            <div className="group/layer relative bg-card/80 dark:bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-border/50 dark:border-orange-400/20 hover:border-orange-500 dark:hover:border-orange-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-amber-500/0 dark:from-orange-400/0 dark:to-amber-400/0 group-hover/layer:from-orange-500/10 group-hover/layer:to-amber-500/5 dark:group-hover/layer:from-orange-400/10 dark:group-hover/layer:to-amber-400/5 transition-all duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl blur-md opacity-40"></div>
                    <div className="relative p-4 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 dark:from-orange-400 dark:to-amber-500 shadow-xl group-hover/layer:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-foreground dark:text-orange-200 mb-2 group-hover/layer:text-orange-600 dark:group-hover/layer:text-orange-300 transition-colors">
                      Database
                    </h3>
                    <p className="text-sm text-muted-foreground dark:text-gray-400 font-medium">
                      Modelagem & Persistência
                    </p>
                  </div>
                </div>
                
                <p className="text-sm sm:text-base text-muted-foreground dark:text-gray-300 mb-6 leading-relaxed">
                  Bancos de dados relacionais (PostgreSQL) e NoSQL (MongoDB) com Prisma ORM. Modelagem de dados, queries otimizadas e migrations profissionais.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {TECH_BY_LAYER.database.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 text-xs font-bold bg-orange-500/10 dark:bg-orange-400/15 text-orange-700 dark:text-orange-300 rounded-lg border border-orange-500/30 dark:border-orange-400/30 hover:bg-orange-500/20 dark:hover:bg-orange-400/25 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* DevOps & Cloud */}
            <div className="group/layer relative bg-card/80 dark:bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-border/50 dark:border-purple-400/20 hover:border-purple-500 dark:hover:border-purple-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 dark:from-purple-400/0 dark:to-pink-400/0 group-hover/layer:from-purple-500/10 group-hover/layer:to-pink-500/5 dark:group-hover/layer:from-purple-400/10 dark:group-hover/layer:to-pink-400/5 transition-all duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl blur-md opacity-40"></div>
                    <div className="relative p-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 dark:from-purple-400 dark:to-pink-500 shadow-xl group-hover/layer:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-foreground dark:text-purple-200 mb-2 group-hover/layer:text-purple-600 dark:group-hover/layer:text-purple-300 transition-colors">
                      DevOps & Cloud
                    </h3>
                    <p className="text-sm text-muted-foreground dark:text-gray-400 font-medium">
                      Deploy & Infraestrutura
                    </p>
                  </div>
                </div>
                
                <p className="text-sm sm:text-base text-muted-foreground dark:text-gray-300 mb-6 leading-relaxed">
                  Deploy automatizado com Vercel e GitHub Actions, containerização com Docker, Git flow profissional e versionamento organizado.
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {TECH_BY_LAYER.devops.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 text-xs font-bold bg-purple-500/10 dark:bg-purple-400/15 text-purple-700 dark:text-purple-300 rounded-lg border border-purple-500/30 dark:border-purple-400/30 hover:bg-purple-500/20 dark:hover:bg-purple-400/25 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card de destaque final */}
          <div className="mt-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 dark:from-cyan-400/10 dark:via-purple-400/10 dark:to-pink-400/10 blur-3xl"></div>
            <div className="relative bg-card/90 dark:bg-black/60 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border-2 border-border/50 dark:border-cyan-400/30 shadow-2xl">
              <div className="text-center max-w-4xl mx-auto">
                <h3 className="text-2xl sm:text-3xl font-black mb-6 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  Desenvolvedor Full-Stack Completo
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground dark:text-gray-300 leading-relaxed mb-8">
                  Projeto estruturas de banco de dados, desenvolvo APIs REST com autenticação JWT, crio interfaces responsivas otimizadas 
                  para performance e SEO, implemento validações robustas e configuro deploy automatizado. 
                  <span className="block mt-4 font-bold text-foreground dark:text-cyan-200">
                    Código limpo, bem documentado e pronto para produção.
                  </span>
                </p>
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 dark:from-cyan-400/20 dark:via-purple-400/20 dark:to-pink-400/20 border border-cyan-400/30">
                  <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-bold text-foreground dark:text-cyan-300">
                    Projetos que falam por si - Veja no GitHub
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action - Cards redesenhados */}
      <div className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Download CV */}
          <div className="group/cta relative bg-card/80 dark:bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-border/50 dark:border-cyan-400/20 hover:border-cyan-500 dark:hover:border-cyan-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 dark:from-cyan-400/0 dark:to-blue-400/0 group-hover/cta:from-cyan-500/10 group-hover/cta:to-blue-500/5 dark:group-hover/cta:from-cyan-400/10 dark:group-hover/cta:to-blue-400/5 transition-all duration-500"></div>
            
            <div className="relative z-10">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-lg opacity-30"></div>
                <div className="relative inline-flex p-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 shadow-xl">
                  <Download className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <h3 className="font-black text-xl mb-3 text-foreground dark:text-cyan-200 group-hover/cta:text-cyan-600 dark:group-hover/cta:text-cyan-300 transition-colors">
                Baixar Currículo
              </h3>
              <p className="text-sm text-muted-foreground dark:text-gray-300 mb-6 leading-relaxed">
                Documento completo com experiência técnica detalhada e portfólio de projetos
              </p>
              
              <Button asChild className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300">
                <a href="/Curriculo_Rainer_Teixeira.pdf" download>
                  <Download className="mr-2 h-5 w-5" />
                  Download PDF
                </a>
              </Button>
            </div>
          </div>

          {/* Contato */}
          <div className="group/cta relative bg-card/80 dark:bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-border/50 dark:border-purple-400/20 hover:border-purple-500 dark:hover:border-purple-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 dark:from-purple-400/0 dark:to-pink-400/0 group-hover/cta:from-purple-500/10 group-hover/cta:to-pink-500/5 dark:group-hover/cta:from-purple-400/10 dark:group-hover/cta:to-pink-400/5 transition-all duration-500"></div>
            
            <div className="relative z-10">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-lg opacity-30"></div>
                <div className="relative inline-flex p-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 dark:from-purple-400 dark:to-pink-500 shadow-xl">
                  <Mail className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <h3 className="font-black text-xl mb-3 text-foreground dark:text-purple-200 group-hover/cta:text-purple-600 dark:group-hover/cta:text-purple-300 transition-colors">
                Vamos Conversar
              </h3>
              <p className="text-sm text-muted-foreground dark:text-gray-300 mb-6 leading-relaxed">
                Interessado em projetos, parcerias ou consultoria técnica? Vamos conversar!
              </p>
              
              <Button asChild className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300">
                <Link href="/contato">
                  <Mail className="mr-2 h-5 w-5" />
                  Entrar em Contato
                </Link>
              </Button>
            </div>
          </div>

          {/* Social Links */}
          <div className="group/cta relative bg-card/80 dark:bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-border/50 dark:border-pink-400/20 hover:border-pink-500 dark:hover:border-pink-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-rose-500/0 dark:from-pink-400/0 dark:to-rose-400/0 group-hover/cta:from-pink-500/10 group-hover/cta:to-rose-500/5 dark:group-hover/cta:from-pink-400/10 dark:group-hover/cta:to-rose-400/5 transition-all duration-500"></div>
            
            <div className="relative z-10">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full blur-lg opacity-30"></div>
                <div className="relative inline-flex p-4 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 dark:from-pink-400 dark:to-rose-500 shadow-xl">
                  <Globe className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <h3 className="font-black text-xl mb-3 text-foreground dark:text-pink-200 group-hover/cta:text-pink-600 dark:group-hover/cta:text-pink-300 transition-colors">
                Redes Sociais
              </h3>
              <p className="text-sm text-muted-foreground dark:text-gray-300 mb-6 leading-relaxed">
                Conecte-se e acompanhe meus projetos nas redes sociais
              </p>
              
              <div className="flex gap-3">
                <Button asChild size="icon" className="flex-1 h-12 bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-gray-700/50 shadow-lg">
                  <a href="https://github.com/rainerteixeira" target="_blank" rel="noopener noreferrer" title="GitHub">
                    <GithubIcon className="h-5 w-5 text-white" />
                  </a>
                </Button>
                <Button asChild size="icon" className="flex-1 h-12 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 border border-blue-500/50 shadow-lg">
                  <a href="https://linkedin.com/in/rainerteixeira" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                    <Linkedin className="h-5 w-5 text-white" />
                  </a>
                </Button>
                <Button asChild size="icon" className="flex-1 h-12 bg-gradient-to-br from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 border border-pink-400/50 shadow-lg">
                  <a href="https://rainersoft.com.br" target="_blank" rel="noopener noreferrer" title="Website">
                    <Globe className="h-5 w-5 text-white" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <BackToTop />
    </div>
  )
}