/**
 * About Page Component
 *
 * Página de apresentação com experiência profissional, skills e competências.
 * Inclui header com avatar animado, timeline de experiência, grid de tecnologias
 * sticky e CTAs profissionais (Download CV, Contato, Redes Sociais).
 *
 * @module app/sobre/page
 * @fileoverview Página sobre o desenvolvedor com apresentação completa
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Rota: /sobre
 * // Renderizada automaticamente pelo Next.js App Router
 * ```
 *
 * Características:
 * - Header com avatar profissional animado
 * - Cards de métricas impressionantes
 * - Timeline de experiência profissional
 * - Grid de tecnologias (tech stack) sticky
 * - Seção de competências por camada (frontend, backend, database, devops)
 * - CTAs profissionais (Download CV, Contato, Redes Sociais)
 * - Efeitos visuais premium com partículas
 * - Design responsivo e acessível
 */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Code2,
  Database,
  Download,
  GithubIcon,
  Globe,
  Linkedin,
  Mail,
  Monitor,
  Server,
  Zap,
} from 'lucide-react';

import { BackToTop, PageHeader, ParticlesEffect } from '@/components/ui';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BACKGROUND, GRADIENTS, GRADIENT_DIRECTIONS } from '@rainersoft/design-tokens';

import { SKILLS } from '@/components/icons/skills/skills-with-icons';
import {
  EXPERIENCE,
  PROFESSIONAL_METRICS,
  SITE_CONFIG,
  TECH_BY_LAYER,
} from '@/constants';

import { CTACard } from '@/components/sobre/cta-card';
import { ExperienceCard } from '@/components/sobre/experience-card';
import { MetricCard } from '@/components/sobre/metric-card';
import { SkillLayerCard } from '@/components/sobre/skill-layer-card';
import { TechStackCard } from '@/components/sobre/tech-stack-card';

/**
 * AboutPage Component
 *
 * Componente principal da página sobre com:
 * - Avatar profissional com animações e badge de status
 * - Cards de métricas impressionantes (projetos, código, tecnologias, performance)
 * - Timeline de experiência profissional com hover effects
 * - Tech stack organizado em grid sticky
 * - Competências por camada (frontend, backend, database, devops)
 * - CTAs profissionais (Download CV, Contato, Redes Sociais)
 * - Efeitos visuais premium com partículas animadas
 *
 * @component
 * @returns {JSX.Element} Página sobre completa
 *
 * @remarks
 * Este componente utiliza:
 * - Constantes EXPERIENCE e SKILLS para dados
 * - SITE_CONFIG para informações de contato
 * - Framer Motion para animações
 * - Design system com Tailwind CSS
 * - Acessibilidade WCAG AA compliant
 *
 * @see {@link EXPERIENCE} Array de experiências profissionais
 * @see {@link SKILLS} Array de tecnologias e skills
 * @see {@link SITE_CONFIG} Configurações centralizadas do site
 */
export default function AboutPage() {
  return (
    <div className={cn('min-h-screen', BACKGROUND.FULL)}>
      {/* Efeito de partículas decorativas no background (visível apenas no dark mode) */}
      <ParticlesEffect variant="alt1" />

      {/* Cabeçalho da página com avatar profissional */}
      <PageHeader
        title="Rainer Teixeira"
        description="Desenvolvedor Full-Stack especializado em criar aplicações web completas e profissionais. Domínio técnico em React, Next.js, TypeScript, Node.js e bancos de dados. Do planejamento ao deploy, transformo ideias em soluções digitais modernas, escaláveis e de alta performance que resolvem problemas reais."
      >
        {/* Avatar profissional com efeitos modernos e animados */}
        <div className="relative w-36 h-36 sm:w-40 sm:h-40 mx-auto group/avatar">
          {/* Círculo externo animado */}
          <div
            className={cn(
              'absolute inset-0 rounded-full animate-spin-slow opacity-75 blur-md',
              GRADIENTS.DECORATIVE_PRIMARY
            )}
          ></div>

          {/* Avatar principal */}
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-2xl">
            <div
              className={cn(
                'absolute inset-0 dark:opacity-40 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-500',
                GRADIENT_DIRECTIONS.TO_BR,
                'from-cyan-400/20 via-purple-400/20 to-pink-400/20'
              )}
            ></div>
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
          <div
            className={cn(
              'absolute -bottom-1 -right-1 w-10 h-10 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 border-4 border-background animate-pulse',
              GRADIENTS.DECORATIVE_GREEN_EMERALD
            )}
          >
            <span className="text-white text-lg font-bold">✓</span>
          </div>
        </div>
      </PageHeader>

      {/** Seção de métricas impressionantes */}
      <section
        aria-labelledby="metrics-heading"
        className="max-w-7xl mx-auto px-6 py-12 relative z-10"
      >
        <div className="text-center mb-8">
          <h2
            id="metrics-heading"
            className="text-3xl font-bold mb-2 dark:text-cyan-200"
          >
            Números que Impressionam
          </h2>
          <p className="text-muted-foreground">
            Resultados reais de projetos desenvolvidos
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {PROFESSIONAL_METRICS.map((metric, index) => (
            <MetricCard
              key={index}
              icon={metric.icon}
              value={metric.value}
              label={metric.label}
              gradient={metric.gradient}
              iconColor={metric.iconColor}
            />
          ))}
        </div>
      </section>

      {/** Conteúdo principal */}
      <section
        aria-labelledby="experience-heading"
        className="max-w-7xl mx-auto px-6 py-12 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/** Seção de Experiência - 2 colunas */}
          <div className="lg:col-span-2 space-y-6">
            {/* Título da seção */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className={cn(
                  'h-1 w-12 rounded-full',
                  GRADIENT_DIRECTIONS.TO_RIGHT,
                  GRADIENTS.DECORATIVE_CYAN_PURPLE
                )}
              />
              <h2
                id="experience-heading"
                className="text-3xl sm:text-4xl font-black text-foreground dark:text-cyan-200"
              >
                Jornada Técnica
              </h2>
            </div>

            {/* Timeline de experiências */}
            <div className="space-y-6">
              {EXPERIENCE.map((exp, idx) => (
                <ExperienceCard
                  key={idx}
                  period={exp.period}
                  role={exp.role}
                  description={exp.description}
                />
              ))}
            </div>
          </div>

          {/** Seção de Tecnologias - 1 coluna */}
          <div className="space-y-6">
            <TechStackCard skills={SKILLS} />
          </div>
        </div>

        {/** Seção de Competências por Camada */}
        <section aria-labelledby="skills-heading" className="mt-16">
          {/* Título da seção */}
          <div className="text-center mb-12">
            <Badge
              variant="secondary"
              className={cn(
                'inline-flex items-center gap-2 px-6 py-2.5 mb-6 text-sm font-bold text-white shadow-lg',
                GRADIENTS.DECORATIVE_PRIMARY
              )}
            >
              <Code2 className="w-5 h-5" />
              Expertise Full-Stack
            </Badge>
            <h2
              id="skills-heading"
              className={cn(
                'text-3xl sm:text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent',
                GRADIENTS.TEXT_PRIMARY
              )}
            >
              Domínio Completo da Stack
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Do banco de dados à interface, desenvolvo todas as camadas com
              código limpo, documentado e testado
            </p>
          </div>

          {/* Grid de competências por camada */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <SkillLayerCard
              icon={Monitor}
              title="Frontend"
              subtitle="Interface & Experiência do Usuário"
              description="Interfaces responsivas e performáticas com React, Next.js e TypeScript. Componentização avançada, PWAs instaláveis e design systems profissionais."
              technologies={TECH_BY_LAYER.frontend}
              gradient="from-cyan-500/0 to-blue-500/0 dark:from-cyan-400/0 dark:to-blue-400/0"
              iconGradient="from-cyan-400 to-blue-500"
              borderColor="dark:border-cyan-400/20 hover:border-cyan-500 dark:hover:border-cyan-400/60"
              shadowColor="hover:shadow-cyan-500/20"
              badgeColor="bg-cyan-500/10 dark:bg-cyan-400/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/30 dark:border-cyan-400/30 hover:bg-cyan-500/20 dark:hover:bg-cyan-400/25"
            />

            <SkillLayerCard
              icon={Server}
              title="Backend"
              subtitle="APIs & Lógica de Negócio"
              description="APIs RESTful bem estruturadas com Node.js e NestJS, autenticação JWT, integração com bancos de dados e validações robustas."
              technologies={TECH_BY_LAYER.backend}
              gradient="from-green-500/0 to-emerald-500/0 dark:from-green-400/0 dark:to-emerald-400/0"
              iconGradient="from-green-400 to-emerald-500"
              borderColor="dark:border-green-400/20 hover:border-green-500 dark:hover:border-green-400/60"
              shadowColor="hover:shadow-green-500/20"
              badgeColor="bg-green-500/10 dark:bg-green-400/15 text-green-700 dark:text-green-300 border-green-500/30 dark:border-green-400/30 hover:bg-green-500/20 dark:hover:bg-green-400/25"
            />

            <SkillLayerCard
              icon={Database}
              title="Database"
              subtitle="Modelagem & Persistência"
              description="Bancos de dados relacionais (PostgreSQL) e NoSQL (MongoDB) com Prisma ORM. Modelagem de dados, queries otimizadas e migrations profissionais."
              technologies={TECH_BY_LAYER.database}
              gradient="from-orange-500/0 to-amber-500/0 dark:from-orange-400/0 dark:to-amber-400/0"
              iconGradient="from-orange-400 to-amber-500"
              borderColor="dark:border-orange-400/20 hover:border-orange-500 dark:hover:border-orange-400/60"
              shadowColor="hover:shadow-orange-500/20"
              badgeColor="bg-orange-500/10 dark:bg-orange-400/15 text-orange-700 dark:text-orange-300 border-orange-500/30 dark:border-orange-400/30 hover:bg-orange-500/20 dark:hover:bg-orange-400/25"
            />

            <SkillLayerCard
              icon={Zap}
              title="DevOps & Cloud"
              subtitle="Deploy & Infraestrutura"
              description="Deploy automatizado com Vercel e GitHub Actions, containerização com Docker, Git flow profissional e versionamento organizado."
              technologies={TECH_BY_LAYER.devops}
              gradient="from-purple-500/0 to-pink-500/0 dark:from-purple-400/0 dark:to-pink-400/0"
              iconGradient="from-purple-400 to-pink-500"
              borderColor="dark:border-purple-400/20 hover:border-purple-500 dark:hover:border-purple-400/60"
              shadowColor="hover:shadow-purple-500/20"
              badgeColor="bg-purple-500/10 dark:bg-purple-400/15 text-purple-700 dark:text-purple-300 border-purple-500/30 dark:border-purple-400/30 hover:bg-purple-500/20 dark:hover:bg-purple-400/25"
            />
          </div>

          {/* Card de destaque final */}
          <Card className="mt-12 relative shadow-2xl dark:shadow-cyan-400/10 bg-card/90 dark:bg-black/60 backdrop-blur-xl border-2 border-border/50 dark:border-cyan-400/30">
            <div
              className={cn(
                'absolute inset-0 blur-3xl',
                BACKGROUND.GRADIENT_OVERLAY
              )}
            />
            <CardContent className="relative p-8 sm:p-12">
              <div className="text-center max-w-4xl mx-auto">
                <CardTitle
                  className={cn(
                    'text-2xl sm:text-3xl font-black mb-6 bg-clip-text text-transparent',
                    GRADIENTS.TEXT_PRIMARY
                  )}
                >
                  Desenvolvedor Full-Stack Completo
                </CardTitle>
                <div className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 space-y-4">
                  <p>
                    Projeto estruturas de banco de dados, desenvolvo APIs REST
                    com autenticação JWT, crio interfaces responsivas otimizadas
                    para performance e SEO, implemento validações robustas e
                    configuro deploy automatizado.
                  </p>
                  <p className="font-bold text-foreground dark:text-cyan-200">
                    Código limpo, bem documentado e pronto para produção.
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className={cn(
                    'inline-flex items-center gap-3 px-6 py-3 text-sm font-bold border border-cyan-400/30',
                    BACKGROUND.GRADIENT_OVERLAY
                  )}
                >
                  <Zap className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  <span className="text-foreground dark:text-cyan-300">
                    Projetos que falam por si - Veja no GitHub
                  </span>
                </Badge>
              </div>
            </CardContent>
          </Card>
        </section>
      </section>

      {/* Call to Action - Cards redesenhados */}
      <section
        aria-labelledby="cta-heading"
        className="max-w-7xl mx-auto px-6 py-12 relative z-10"
      >
        <h2 id="cta-heading" className="sr-only">
          Ações Disponíveis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Download CV */}
          <CTACard
            icon={Download}
            title="Baixar Currículo"
            description="Documento completo com experiência técnica detalhada e portfólio de projetos"
            action={
              <Button
                asChild
                className={cn(
                  'w-full text-white shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300',
                  GRADIENTS.BUTTON_CYAN_BLUE
                )}
              >
                <a href="/Curriculo_Rainer_Teixeira.pdf" download>
                  <Download className="mr-2 h-5 w-5" />
                  Download PDF
                </a>
              </Button>
            }
            gradient="from-cyan-500/0 to-blue-500/0 dark:from-cyan-400/0 dark:to-blue-400/0"
            iconGradient="from-cyan-400 to-blue-500"
            borderColor="dark:border-cyan-400/20 hover:border-cyan-500 dark:hover:border-cyan-400/60"
            shadowColor="hover:shadow-cyan-500/20"
            titleColor="dark:text-cyan-200"
          />

          {/* Contato */}
          <CTACard
            icon={Mail}
            title="Vamos Conversar"
            description="Interessado em projetos, parcerias ou consultoria técnica? Vamos conversar!"
            action={
              <Button
                asChild
                className={cn(
                  'w-full text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300',
                  GRADIENTS.BUTTON_PURPLE_PINK
                )}
              >
                <Link href="/contato">
                  <Mail className="mr-2 h-5 w-5" />
                  Entrar em Contato
                </Link>
              </Button>
            }
            gradient="from-purple-500/0 to-pink-500/0 dark:from-purple-400/0 dark:to-pink-400/0"
            iconGradient="from-purple-400 to-pink-500"
            borderColor="dark:border-purple-400/20 hover:border-purple-500 dark:hover:border-purple-400/60"
            shadowColor="hover:shadow-purple-500/20"
            titleColor="dark:text-purple-200"
          >
            <div className="mb-6 space-y-2 text-xs text-muted-foreground dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" />
                <a
                  href={`mailto:${SITE_CONFIG.contact.email.address}`}
                  className="hover:text-primary transition-colors"
                >
                  {SITE_CONFIG.contact.email.address}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href={`tel:${SITE_CONFIG.contact.phone.number.replace(/\s/g, '')}`}
                  className="hover:text-primary transition-colors"
                >
                  {SITE_CONFIG.contact.phone.number}
                </a>
                {SITE_CONFIG.contact.phone.whatsapp && (
                  <span className="text-green-500">• WhatsApp</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>
                  {SITE_CONFIG.contact.location.city},{' '}
                  {SITE_CONFIG.contact.location.country}
                </span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  {SITE_CONFIG.contact.workingHours.days} -{' '}
                  {SITE_CONFIG.contact.workingHours.hours}
                </span>
              </div>
            </div>
          </CTACard>

          {/* Social Links */}
          <CTACard
            icon={Globe}
            title="Redes Sociais"
            description="Conecte-se e acompanhe meus projetos nas redes sociais"
            action={
              <div className="flex gap-3">
                <Button
                  asChild
                  size="icon"
                  className={cn(
                    'flex-1 h-12 border border-gray-700/50 shadow-lg',
                    GRADIENT_DIRECTIONS.TO_BR,
                    'from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800'
                  )}
                >
                  <a
                    href={SITE_CONFIG.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                  >
                    <GithubIcon className="h-5 w-5 text-white" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="icon"
                  className={cn(
                    'flex-1 h-12 border border-blue-500/50 shadow-lg',
                    GRADIENT_DIRECTIONS.TO_BR,
                    'from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600'
                  )}
                >
                  <a
                    href={SITE_CONFIG.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5 text-white" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="icon"
                  className={cn(
                    'flex-1 h-12 border border-pink-400/50 shadow-lg',
                    GRADIENT_DIRECTIONS.TO_BR,
                    'from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500'
                  )}
                >
                  <a
                    href={SITE_CONFIG.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Website"
                  >
                    <Globe className="h-5 w-5 text-white" />
                  </a>
                </Button>
              </div>
            }
            gradient="from-pink-500/0 to-rose-500/0 dark:from-pink-400/0 dark:to-rose-400/0"
            iconGradient="from-pink-400 to-rose-500"
            borderColor="dark:border-pink-400/20 hover:border-pink-500 dark:hover:border-pink-400/60"
            shadowColor="hover:shadow-pink-500/20"
            titleColor="dark:text-pink-200"
          />
        </div>
      </section>

      {/* Back to Top */}
      <BackToTop />
    </div>
  );
}
