/**
 * Technical Highlight Section Component
 *
 * Seção de diferenciais técnicos com cards animados e visual premium.
 * Apresenta, de forma clara e objetiva, os principais pilares técnicos do
 * portfólio por meio de cards interativos com ícones, badges, gradientes
 * personalizados e animações suaves, sempre com foco em performance.
 *
 * @module components/domain/home/technical-highlight
 * @fileoverview Seção de diferenciais técnicos com foco em qualidade de código,
 * arquitetura e confiabilidade
 * @author Rainer Teixeira <contato@rainersoft.com.br>
 * @version 3.2.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Usado na página inicial
 * <TechnicalHighlight />
 * ```
 *
 * Características:
 * - Cards de diferenciais com ícones e badges
 * - Gradientes personalizados por categoria
 * - Animações de entrada suaves
 * - Efeitos de hover interativos
 * - Layout responsivo em grid
 * - Suporte a tema claro/escuro
 * - Integração com design tokens
 */

'use client';

export const dynamic = 'force-dynamic';

import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, cn } from '@rainersoft/ui';
import { tokens } from '@rainersoft/design-tokens';
import { motion } from 'framer-motion';
import {
  Award,
  BookOpen,
  Code,
  GitBranch,
  Layers,
  Shield,
  Target,
  Zap,
} from 'lucide-react';
import { useTheme } from 'next-themes';

/* ------------------------------- CONSTANTS & TOKENS ------------------------------ */

/** Destructuring dos tokens de design para facilitar acesso */
const { 
  color: PALETA, 
  spacing: ESPACAMENTO, 
  typography: TIPOGRAFIA, 
  breakpoints: BREAKPOINTS 
} = tokens.primitives;

/**
 * Paletas de cores pré-definidas para gradientes dos cards
 * Cada paleta contém cores de início e fim para gradiente principal e do ícone
 */
const PALETAS = {
  cyanBlue: {
    colorFrom: PALETA.cyan[500],
    colorTo: PALETA.blue[600],
    iconColorFrom: PALETA.cyan[400],
    iconColorTo: PALETA.blue[500],
  },
  purplePink: {
    colorFrom: PALETA.purple[500],
    colorTo: PALETA.pink[600],
    iconColorFrom: PALETA.purple[400],
    iconColorTo: PALETA.pink[500],
  },
  green: {
    colorFrom: PALETA.green[500],
    colorTo: PALETA.emerald[600],
    iconColorFrom: PALETA.green[400],
    iconColorTo: PALETA.emerald[500],
  },
  orange: {
    colorFrom: PALETA.orange[500],
    colorTo: PALETA.yellow[600],
    iconColorFrom: PALETA.orange[400],
    iconColorTo: PALETA.yellow[500],
  },
  blue: {
    colorFrom: PALETA.blue[500],
    colorTo: PALETA.blue[700],
    iconColorFrom: PALETA.blue[400],
    iconColorTo: PALETA.blue[600],
  },
  red: {
    colorFrom: PALETA.red[500],
    colorTo: PALETA.pink[600],
    iconColorFrom: PALETA.red[400],
    iconColorTo: PALETA.pink[500],
  },
} as const;

/**
 * Valores de opacidade usados em diferentes elementos visuais
 * - light/dark: opacidades de fundo baseadas no tema
 * - badge/border: sufixos hexadecimais para transparência
 */
const OPACIDADES = {
  light: 0.12,
  dark: 0.08,
  badge: '1A',
  border: '4D',
} as const;

/**
 * Tamanhos reutilizáveis para elementos visuais
 */
const TAMANHOS = {
  grid: '48rem',
  icone: 'h-8 w-8',
  award: 'w-5 h-5',
  target: 'w-6 h-6',
} as const;

/**
 * Delays de animação para efeitos em sequência
 */
const DELAYS = {
  animacao: 0.1,
  subtitulo: 0.2,
  cta: 0.6,
} as const;

/**
 * Configurações padrão para animações do Framer Motion
 */
const MOTION_CONFIG = {
  viewport: { once: true },
  spring: { stiffness: 100 },
} as const;

/* ------------------------------- CSS CLASSES ------------------------------- */

/**
 * Classes CSS agrupadas para reutilização e manutenção
 */
const classes = {
  card: cn(
    'relative h-full flex flex-col bg-card/80 dark:bg-black/60 backdrop-blur-xl',
    'border border-border/50 dark:border-cyan-400/20',
    'hover:border-primary dark:hover:border-cyan-400/60',
    'transition-all duration-500 hover:shadow-2xl hover:-translate-y-2',
    'overflow-hidden'
  ),
  badge: 'px-3 py-1 rounded-full text-xs font-bold',
  titulo: 'font-black group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors leading-tight mb-3',
  descricao: 'grow',
  iconEffect: 'relative inline-flex p-4 rounded-2xl shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300',
  glow: {
    icon: 'absolute inset-0 rounded-2xl blur-md opacity-40',
    card: 'absolute inset-0 rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500',
    inner: 'absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500',
  },
  cta: cn(
    'inline-flex items-center gap-3 px-8 py-4 rounded-2xl',
    'bg-linear-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10',
    'dark:from-cyan-400/20 dark:via-purple-400/20 dark:to-pink-400/20',
    'border-2 border-cyan-400/30'
  ),
  headerBadge: 'inline-flex items-center gap-2 rounded-full text-white font-bold text-sm shadow-xl px-6 py-2.5 mb-8',
  gradientText: 'bg-linear-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent',
} as const;

/* ------------------------------- TYPES ------------------------------- */

/**
 * Interface para os dados de entrada de um diferencial
 */
interface DifferentialInput {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  badge: string;
  colorFrom: string;
  colorTo: string;
  iconColorFrom: string;
  iconColorTo: string;
}

/**
 * Interface para um diferencial com gradientes calculados
 */
interface Differential extends Omit<DifferentialInput, 'colorFrom' | 'colorTo' | 'iconColorFrom' | 'iconColorTo'> {
  gradient: string;
  iconBg: string;
}

/* ------------------------------- UTILITIES ------------------------------- */

/**
 * Cria uma string de gradiente linear CSS
 * @param from - Cor inicial do gradiente
 * @param to - Cor final do gradiente
 * @param deg - Ângulo do gradiente (padrão: 135deg)
 * @returns String CSS para gradiente linear
 */
const criarGradiente = (from: string, to: string, deg = 135): string => 
  `linear-gradient(${deg}deg, ${from}, ${to})`;

/**
 * Retorna a cor apropriada baseada no tema atual
 * @param isDark - Indica se o tema atual é escuro
 * @param light - Cor para tema claro
 * @param dark - Cor para tema escuro
 * @returns A cor correspondente ao tema
 */
const corPorTema = (isDark: boolean, light: string, dark: string): string => 
  isDark ? dark : light;

/* ------------------------------- MOTION PRESETS ------------------------------- */

/**
 * Presets de animação reutilizáveis para Framer Motion
 */
const motionPresets = {
  fadeIn: (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: MOTION_CONFIG.viewport,
    transition: { delay },
  }),
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: MOTION_CONFIG.viewport,
  },
  card: (index: number) => ({
    initial: { opacity: 0, y: 30, scale: 0.9 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: MOTION_CONFIG.viewport,
    transition: { 
      delay: index * DELAYS.animacao, 
      type: 'spring' as const, 
      stiffness: MOTION_CONFIG.spring.stiffness 
    },
  }),
} as const;

/* ------------------------------- DATA ------------------------------- */

/**
 * Converte um DifferentialInput em Differential com gradientes calculados
 * @param input - Dados de entrada do diferencial
 * @returns Diferencial com gradientes calculados
 */
const criarDiferencial = (input: DifferentialInput): Differential => {
  const { colorFrom, colorTo, iconColorFrom, iconColorTo, ...rest } = input;
  return {
    ...rest,
    gradient: criarGradiente(colorFrom, colorTo),
    iconBg: criarGradiente(iconColorFrom, iconColorTo),
  };
};

/**
 * Lista de diferenciais técnicos exibidos na seção
 */
const DIFERENCIAIS: Differential[] = [
  {
    id: 'codigo-limpo',
    icon: Code,
    title: 'Código Limpo e Documentado',
    description:
      'TypeScript com tipagem completa, arquitetura modular e documentação detalhada. Cada função comentada, variáveis descritivas e estrutura que facilita manutenção. Código profissional que outros desenvolvedores entendem rapidamente.',
    badge: 'Best Practices',
    ...PALETAS.cyanBlue,
  },
  {
    id: 'performance',
    icon: Zap,
    title: 'Performance Excepcional',
    description:
      'Sites que carregam em menos de 2 segundos. Lighthouse Score 95+, otimização de imagens, lazy loading inteligente e cache estratégico. SEO avançado que melhora ranking no Google e aumenta conversões.',
    badge: 'Ultra Rápido',
    ...PALETAS.purplePink,
  },
  {
    id: 'seguranca',
    icon: Shield,
    title: 'Segurança Avançada',
    description:
      'Autenticação JWT segura, criptografia de dados sensíveis, proteção contra ataques XSS e CSRF. Validações robustas no frontend e backend. Aplicações protegidas seguindo padrões OWASP.',
    badge: 'Protegido',
    ...PALETAS.green,
  },
  {
    id: 'documentacao',
    icon: BookOpen,
    title: 'Documentação Completa',
    description:
      'README detalhado, comentários em cada função, documentação de APIs com Swagger. Instruções claras de instalação e uso. Facilito a vida de quem vai dar manutenção no futuro.',
    badge: 'Bem Documentado',
    ...PALETAS.orange,
  },
  {
    id: 'arquitetura',
    icon: Layers,
    title: 'Arquitetura Escalável',
    description:
      'Componentes React reutilizáveis, separação clara entre camadas, padrões de design aplicados. Código modular preparado para crescer sem complicações. Arquitetura que facilita adição de novas funcionalidades.',
    badge: 'Escalável',
    ...PALETAS.blue,
  },
  {
    id: 'versionamento',
    icon: GitBranch,
    title: 'Versionamento Profissional',
    description:
      'Git flow organizado, commits semânticos descritivos, branches bem estruturadas. Código versionado no GitHub com histórico limpo. Pull requests detalhados que facilitam code review e colaboração em equipe.',
    badge: 'Git Flow',
    ...PALETAS.red,
  },
].map(criarDiferencial);

/* ------------------------------- SUBCOMPONENTS ------------------------------- */

/**
 * Componente para exibir o badge de categoria de um diferencial
 * @param props - Propriedades do componente
 * @param props.texto - Texto a ser exibido no badge
 * @param props.isDark - Indica se o tema atual é escuro
 */
const BadgeDiferencial = React.memo(({ texto, isDark }: { texto: string; isDark: boolean }) => (
  <div
    className={classes.badge}
    style={{
      background: criarGradiente(PALETA.cyan[500] + OPACIDADES.badge, PALETA.purple[500] + OPACIDADES.badge),
      border: `1px solid ${PALETA.cyan[400]}${OPACIDADES.border}`,
      color: corPorTema(isDark, PALETA.cyan[700], PALETA.cyan[300]),
    }}
    aria-label={texto}
    role="status"
  >
    {texto}
  </div>
));

/**
 * Componente para exibir ícone com efeitos visuais
 * @param props - Propriedades do componente
 * @param props.Icon - Componente de ícone do Lucide React
 * @param props.iconBg - Gradiente de fundo para o ícone
 */
const IconeComEfeito = ({ Icon, iconBg }: { 
  Icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
}) => (
  <div className="relative mb-6">
    <div className={classes.glow.icon} style={{ background: iconBg }} />
    <div className={classes.iconEffect} style={{ background: iconBg }}>
      <Icon className={TAMANHOS.icone} aria-hidden />
    </div>
  </div>
);

/**
 * Componente de cartão individual para cada diferencial técnico
 * @param props - Propriedades do componente
 * @param props.diferencial - Dados do diferencial a ser exibido
 * @param props.index - Índice para animação escalonada
 * @param props.isDark - Indica se o tema atual é escuro
 */
const CardDiferencial = React.memo(({ 
  diferencial, 
  index, 
  isDark 
}: { 
  diferencial: Differential; 
  index: number; 
  isDark: boolean; 
}) => (
  <motion.div {...motionPresets.card(index)} className="group" role="article">
    <div className="relative h-full">
      <div className={classes.glow.card} style={{ background: diferencial.iconBg }} />
      <Card className={classes.card}>
        <div className={classes.glow.inner} style={{ background: diferencial.gradient }} />
        <CardContent className="p-8 relative z-10 flex flex-col">
          <div className="absolute top-4 right-4">
            <BadgeDiferencial texto={diferencial.badge} isDark={isDark} />
          </div>
          
          <IconeComEfeito Icon={diferencial.icon} iconBg={diferencial.iconBg} />
          
          <h3 
            className={classes.titulo}
            style={{
              fontSize: TIPOGRAFIA.fontSize.base,
              color: corPorTema(isDark, PALETA.gray[900], PALETA.white),
            }}
          >
            {diferencial.title}
          </h3>
          
          <p 
            className={classes.descricao}
            style={{
              fontSize: TIPOGRAFIA.fontSize.sm,
              color: corPorTema(isDark, PALETA.gray[600], PALETA.gray[300]),
              lineHeight: TIPOGRAFIA.lineHeight.relaxed,
            }}
          >
            {diferencial.description}
          </p>
        </CardContent>
      </Card>
    </div>
  </motion.div>
));

/* ------------------------------- MAIN COMPONENT ------------------------------- */
/**
 * Componente principal da seção de diferenciais técnicos
 * Responsável por gerenciar o estado do tema, gradientes e renderizar toda a seção
 */
export function TechnicalHighlight() {

  const { resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);
  
  // Sincroniza o estado do tema com o servidor
  useEffect(() => {
    setIsDark(resolvedTheme === 'dark');
  }, [resolvedTheme]);
  
  // Gradientes memoizados para evitar recálculos desnecessários
  const gradientes = useMemo(() => ({
    principal: criarGradiente(
      isDark ? PALETA.cyan[400] : PALETA.cyan[500],
      isDark ? PALETA.pink[400] : PALETA.pink[500]
    ),
    cabecalho: criarGradiente(
      isDark ? PALETA.cyan[400] : PALETA.blue[500],
      isDark ? PALETA.pink[400] : PALETA.purple[500]
    ),
  }), [isDark]);

  // Estilos de container organizados para fácil manutenção
  const containerStyles = {
    secao: { paddingTop: ESPACAMENTO[20], paddingBottom: ESPACAMENTO[24] },
    wrapper: { maxWidth: BREAKPOINTS['7xl'], paddingLeft: ESPACAMENTO[6], paddingRight: ESPACAMENTO[6] },
    header: { marginBottom: ESPACAMENTO[16] },
    grid: { gap: ESPACAMENTO[6] },
    titulo: { fontSize: TIPOGRAFIA.fontSize['5xl'], marginBottom: ESPACAMENTO[6] },
    subtitulo: { 
      fontSize: TIPOGRAFIA.fontSize.lg, 
      maxWidth: TAMANHOS.grid, 
      lineHeight: TIPOGRAFIA.lineHeight.relaxed 
    },
  } as const;

  return (
    <section className="relative overflow-hidden" style={containerStyles.secao}>
      <div className="mx-auto" style={containerStyles.wrapper}>
        {/* Background com gradiente e blur */}
        <div 
          className="absolute inset-0 blur-3xl" 
          style={{ 
            background: gradientes.principal,
            opacity: isDark ? OPACIDADES.dark : OPACIDADES.light 
          }} 
          aria-hidden 
        />

        {/* Header da seção */}
        <div className="text-center" style={containerStyles.header}>
          <motion.div {...motionPresets.scaleIn} className={classes.headerBadge} style={{ background: gradientes.cabecalho }}>
            <Award className={TAMANHOS.award} aria-hidden />
            Diferenciais Técnicos
          </motion.div>

          <motion.h2 {...motionPresets.fadeIn()} className="font-black bg-clip-text text-transparent" style={containerStyles.titulo}>
            Código de Qualidade Superior
          </motion.h2>

          <motion.p {...motionPresets.fadeIn(DELAYS.subtitulo)} className="mx-auto" style={containerStyles.subtitulo}>
            Desenvolvimento profissional com{' '}
            <span className="font-bold text-foreground dark:text-cyan-200">React, Next.js e Node.js</span>{' '}
            seguindo as melhores práticas do mercado
          </motion.p>
        </div>

        {/* Grid de cards de diferenciais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch" style={containerStyles.grid}>
          {DIFERENCIAIS.map((diferencial, index) => (
            <CardDiferencial 
              key={diferencial.id} 
              diferencial={diferencial} 
              index={index} 
              isDark={isDark} 
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div {...motionPresets.fadeIn(DELAYS.cta)} className="mt-16 text-center">
          <div className={classes.cta}>
            <Target className={TAMANHOS.target} />
            <span className="text-base font-bold">
              Desenvolvimento full-stack com{' '}
              <span className={classes.gradientText}>React, Next.js e Node.js</span> para seu próximo projeto
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
