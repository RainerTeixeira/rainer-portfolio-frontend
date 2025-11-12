/**
 * Hero Section Component
 *
 * Componente de seção hero com design holográfico futurista, carousel animado
 * e conteúdo dinâmico rotativo. Primeira impressão visual da página inicial
 * com múltiplos slides e navegação por teclado.
 *
 * @module components/home/hero-section
 * @fileoverview Hero section com carousel animado e conteúdo dinâmico
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Usado na página inicial
 * <HeroSection />
 * ```
 *
 * Características:
 * - Carousel animado com múltiplos slides
 * - Design holográfico futurista
 * - Conteúdo dinâmico rotativo
 * - Animações suaves com Framer Motion
 * - Suporte a tema claro/escuro
 * - Navegação por teclado
 * - Loading state otimizado
 */

'use client';

import { cn } from '@/lib/utils';
import { hexToRGBA } from '@/lib/utils/design-tokens';
import {
  COLOR_BLUE,
  COLOR_CYAN,
  COLOR_EMERALD,
  COLOR_GREEN,
  GRADIENTS,
  GRADIENT_DIRECTIONS,
} from '@rainer/design-tokens';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { useEffect, useState, type CSSProperties } from 'react';
import { useCarouselKeyboard } from './hooks';

// ============================================================================
// Dynamic Imports
// ============================================================================

const Carousel = dynamic(() => import('./carousel'), {
  ssr: false,
  loading: () => <HeroLoadingState />,
});

// ============================================================================
// Constants
// ============================================================================

/**
 * Textos principais exibidos no hero
 */
const HERO_TITLES = [
  'TRANSFORME IDEIAS EM SOLUÇÕES DIGITAIS',
  'DESENVOLVIMENTO FULL-STACK PROFISSIONAL',
  'APLICAÇÕES WEB MODERNAS E ESCALÁVEIS',
  'CÓDIGO LIMPO, RESULTADOS IMPRESSIONANTES',
  'ARQUITETURA ROBUSTA E PERFORMANCE OTIMIZADA',
  'EXPERIÊNCIAS DIGITAIS QUE ENCANTAM',
  'TECNOLOGIA DE PONTA, ENTREGA GARANTIDA',
  'INOVAÇÃO E QUALIDADE EM CADA LINHA',
  'SOLUÇÕES COMPLETAS DO DESIGN AO DEPLOY',
  'EXPERTISE EM REACT, NEXT.JS E NODE.JS',
  'DASHBOARDS INTERATIVOS E INTELIGENTES',
  'APIS RESTFUL SEGURAS E DOCUMENTADAS',
  'INTEGRAÇÃO PERFEITA COM SERVIÇOS EXTERNOS',
  'AUTENTICAÇÃO E SEGURANÇA DE NÍVEL ENTERPRISE',
  'PROJETOS QUE RESOLVEM PROBLEMAS REAIS',
] as const;

/**
 * Subtítulos descritivos correspondentes aos títulos
 */
const HERO_SUBTITLES = [
  'Desenvolvedor Full-Stack especializado em criar aplicações web completas e profissionais.',
  'Domínio técnico avançado em React 19, Next.js 15, TypeScript, Node.js e bancos de dados.',
  'Arquiteturas escaláveis, componentizadas e preparadas para crescer com seu negócio.',
  'Código bem estruturado, documentado e seguindo as melhores práticas do mercado.',
  'Performance otimizada, SEO avançado e experiência do usuário excepcional.',
  'Interfaces modernas, responsivas e acessíveis que seus usuários vão adorar.',
  'Stack moderna, ferramentas profissionais e processos comprovados de desenvolvimento.',
  'Atenção aos detalhes, testes rigorosos e compromisso com a excelência técnica.',
  'Da análise de requisitos ao deploy em produção, acompanhamento completo do projeto.',
  'Especialista em ecossistema React com experiência comprovada em projetos reais.',
  'Painéis administrativos completos com gráficos, métricas e gestão de conteúdo.',
  'Backend robusto com NestJS, validação de dados, tratamento de erros e documentação.',
  'Conexão com APIs de terceiros, webhooks, autenticação OAuth e processamento de dados.',
  'Sistemas de login seguros com JWT, proteção de rotas e gerenciamento de permissões.',
  'Portfólio comprovado com aplicações funcionais que agregam valor ao negócio.',
] as const;

/**
 * Duração de cada slide em milissegundos
 */
const SLIDE_DURATION_MS = 6000;

// ============================================================================
// Types
// ============================================================================

interface HeroContentOverlayProps {
  readonly currentSlideIndex: number;
  readonly isDarkTheme: boolean;
}

// ============================================================================
// Components
// ============================================================================

/**
 * Estado de carregamento exibido enquanto o carousel é carregado
 */
function HeroLoadingState() {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDarkTheme = isMounted && resolvedTheme === 'dark';

  return (
    <div
      className={`relative w-full h-svh flex items-center justify-center overflow-hidden ${isDarkTheme ? 'bg-black' : 'bg-white'}`}
      role="status"
      aria-label="Carregando conteúdo principal"
    >
      <div className="text-center space-y-6">
        {/* Spinner animado com duplo anel */}
        <div className="relative" aria-hidden="true">
          <div
            className={`w-20 h-20 border-4 ${isDarkTheme ? 'border-cyan-400' : 'border-blue-500'} border-t-transparent rounded-full animate-spin mx-auto`}
          />
          <div
            className={cn(
              'absolute inset-0 w-20 h-20 border-4 border-b-transparent rounded-full animate-spin mx-auto',
              '[animation-direction:reverse]',
              isDarkTheme ? 'border-pink-400' : 'border-purple-600'
            )}
          />
        </div>

        {/* Texto de carregamento */}
        <p
          className={`${isDarkTheme ? 'text-cyan-300' : 'text-blue-600'} font-mono text-sm tracking-wider animate-pulse`}
        >
          INICIALIZANDO SISTEMA...
        </p>
      </div>
    </div>
  );
}

/**
 * Overlay de conteúdo do hero com animações
 */
function HeroContentOverlay({
  currentSlideIndex,
  isDarkTheme,
}: HeroContentOverlayProps) {
  const [hasMounted, setHasMounted] = useState(false);

  // Durante SSR, sempre usar tema claro para garantir consistência
  const safeIsDarkTheme = hasMounted ? isDarkTheme : false;

  // Marcar como montado após primeiro render no cliente (após hidratação)
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Garantir índice estável durante SSR (sempre 0)
  // Isso garante que o conteúdo seja idêntico entre servidor e cliente
  // Durante SSR e primeiro render: stableIndex = 0
  // Após hidratação: stableIndex = currentSlideIndex (com validação)
  const displayIndex = hasMounted ? currentSlideIndex : 0;
  const safeIndex = Math.max(0, Math.min(displayIndex, HERO_TITLES.length - 1));
  const stableIndex = hasMounted ? safeIndex : 0;
  const displayTitle = HERO_TITLES[stableIndex];
  const displaySubtitle = HERO_SUBTITLES[stableIndex];

  // Estilos base que são sempre aplicados (consistentes entre SSR e client)
  // Durante SSR e primeiro render do cliente, sempre usar tema claro (false)
  // para garantir que os estilos sejam idênticos
  // Nota: Não incluir opacity/transform aqui - deixar Framer Motion gerenciar
  const titleStyle: CSSProperties = {
    fontSize: 'clamp(1.75rem, 7vw + 0.5rem, 5rem)',
    textShadow: safeIsDarkTheme
      ? `0 0 30px ${hexToRGBA(COLOR_CYAN[300], 0.7)}, 0 0 50px ${hexToRGBA(COLOR_CYAN[400], 0.5)}`
      : `0 0 30px ${hexToRGBA(COLOR_BLUE[500], 0.6)}, 0 0 50px ${hexToRGBA(COLOR_BLUE[600], 0.4)}`,
    lineHeight: 1.05,
  };

  const subtitleStyle: CSSProperties = {
    fontSize: 'clamp(1rem, 3.5vw + 0.3rem, 2rem)',
    textShadow: safeIsDarkTheme
      ? `0 0 20px ${hexToRGBA(COLOR_EMERALD[400], 0.6)}`
      : `0 0 20px ${hexToRGBA(COLOR_GREEN[500], 0.5)}`,
    lineHeight: 1.3,
  };

  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none p-3 xs:p-4 sm:p-5 md:p-7 lg:p-9 xl:p-11"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="relative z-10 w-full max-w-[95vw] xs:max-w-[93vw] sm:max-w-[88vw] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto pointer-events-auto">
        <div
          className="text-center relative z-20 flex flex-col justify-center items-center min-h-[400px] px-6 xs:px-8 sm:px-10 md:px-12 lg:px-14 xl:px-18 space-y-6 xs:space-y-7 sm:space-y-9 md:space-y-11 lg:space-y-13 xl:space-y-15"
          style={{
            paddingTop: 'clamp(2.5rem, 8vh, 7rem)',
            paddingBottom: 'clamp(2.5rem, 8vh, 7rem)',
          }}
        >
          {/* Título principal - Key baseado no índice para permitir animações entre slides */}
          <motion.h1
            key={`title-${stableIndex}`}
            initial={hasMounted ? { opacity: 0, y: 30, scale: 0.9 } : false}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={
              hasMounted ? { delay: 0.3, duration: 0.7 } : { duration: 0 }
            }
            className={cn(
              'font-black font-mono tracking-tight leading-none px-2 xs:px-3 sm:px-4 md:px-0',
              'text-transparent bg-clip-text',
              GRADIENTS.TEXT_PRIMARY
            )}
            style={titleStyle}
            suppressHydrationWarning
          >
            {displayTitle}
          </motion.h1>

          {/* Subtítulo - Key baseado no índice para permitir animações entre slides */}
          <motion.h2
            key={`subtitle-${stableIndex}`}
            initial={hasMounted ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={
              hasMounted ? { delay: 0.5, duration: 0.6 } : { duration: 0 }
            }
            className={`font-semibold font-mono px-3 xs:px-4 sm:px-6 ${
              safeIsDarkTheme ? 'text-green-400' : 'text-green-600'
            }`}
            style={subtitleStyle}
            suppressHydrationWarning
          >
            {displaySubtitle}
          </motion.h2>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

/**
 * Componente principal do Hero Section
 *
 * Renderiza uma seção hero full-screen com:
 * - Carousel animado de fundo
 * - Conteúdo dinâmico rotativo
 * - Suporte a tema claro/escuro
 * - Gradientes de overlay
 */
export function HeroSection() {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  // Previne erro de hidratação SSR
  useEffect(() => {
    setIsMounted(true);
  }, []);

  /* ==========================================================
     HOOK DE NAVEGAÇÃO POR TECLADO COM AUTOPLAY 🎹
     ========================================================== */
  const {
    currentSlide: currentSlideIndex,
    pauseAutoplay,
    resumeAutoplay,
  } = useCarouselKeyboard({
    slideCount: HERO_TITLES.length,
    initialSlide: 0, // Sempre começar no slide 0 para SSR
    autoplay: false, // Iniciar manualmente após hidratação
    autoplayInterval: SLIDE_DURATION_MS,
    loop: true,
    pauseOnInteraction: false, // Não pausar ao navegar (manter fluidez)
    respectReducedMotion: true,
    onSlideChange: index => {
      console.log(
        `[Hero] Slide ${index + 1}/${HERO_TITLES.length}: ${HERO_TITLES[index]}`
      );
    },
  });

  // Durante SSR, sempre usar índice 0 para garantir hidratação correta
  const safeSlideIndex = isMounted ? currentSlideIndex : 0;
  const isDarkTheme = isMounted && resolvedTheme === 'dark';

  // Iniciar autoplay apenas após hidratação completa
  useEffect(() => {
    if (!isMounted) return undefined;

    // Delay para garantir que a hidratação terminou antes de iniciar autoplay
    const timer = setTimeout(() => {
      resumeAutoplay();
    }, 1000);
    return () => clearTimeout(timer);
  }, [isMounted, resumeAutoplay]);

  return (
    <header
      className={`relative w-full h-svh sm:h-screen flex items-center justify-center overflow-hidden ${isDarkTheme ? 'bg-black' : 'bg-white'}`}
      style={{
        minHeight: 'max(100svh, 600px)',
        maxHeight: '100svh',
      }}
      aria-label="Seção principal de apresentação"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
    >
      {/* Layer 1: Carousel de fundo (z-0) */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Carousel />
      </div>

      {/* Layer 2: Gradiente de overlay (z-5) */}
      <div
        className={cn(
          'absolute inset-0 z-5 pointer-events-none',
          GRADIENT_DIRECTIONS.TO_BOTTOM,
          'from-black/50 via-transparent to-black/60'
        )}
        aria-hidden="true"
      />

      {/* Layer 3: Conteúdo principal (z-20) */}
      <HeroContentOverlay
        currentSlideIndex={safeSlideIndex}
        isDarkTheme={isDarkTheme}
      />

      {/* Layer 4: Gradiente inferior (z-15) */}
      <div
        className={cn(
          'absolute bottom-0 left-0 right-0 h-32 z-15 pointer-events-none',
          GRADIENT_DIRECTIONS.TO_TOP,
          'from-black/80 via-black/40 to-transparent'
        )}
        aria-hidden="true"
      />
    </header>
  );
}
