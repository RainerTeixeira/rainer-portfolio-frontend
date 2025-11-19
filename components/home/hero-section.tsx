/**
 * Hero Section Component
 *
 * Componente de seção hero com design holográfico futurista, carousel animado
 * e conteúdo dinâmico rotativo. Primeira impressão visual da página inicial
 * com múltiplos slides e navegação por teclado.
 *
 * @module components/home/hero-section
 * @fileoverview Hero section com carousel animado e conteúdo dinâmico
 * 
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
import { hexToRGBA } from '@/lib/utils/color-utils';
import {
  GRADIENTS,
  GRADIENT_DIRECTIONS,
  tokens,
} from '@rainersoft/design-tokens';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { useEffect, useState, type CSSProperties } from 'react';
// HeroLoadingState removido - não é mais necessário
import { useCarouselKeyboard } from './hooks';

// ============================================================================
// Dynamic Imports
// ============================================================================

// Importação dinâmica do carousel com tratamento de erro
const Carousel = dynamic(
  () => import('./carousel').catch(() => {
    // Em caso de erro, retornar componente vazio
    return { default: () => null };
  }),
  {
    ssr: false,
    loading: () => <div className="h-full w-full" />,
  }
);
  
// ============================================================================
// Constants
// ============================================================================

/**
 * Textos principais exibidos no hero
 */
const HERO_TITLES = [
  'TRANSFORME SUA VISÃO EM REALIDADE DIGITAL',
  'DESENVOLVIMENTO QUE ACELERA SEU NEGÓCIO',
  'APLICAÇÕES QUE IMPRESSIONAM E CONVERTEM',
  'CÓDIGO PREMIUM, RESULTADOS MENSURÁVEIS',
  'PERFORMANCE QUE SUPERA EXPECTATIVAS',
  'EXPERIÊNCIAS QUE SEUS CLIENTES AMAM',
  'TECNOLOGIA ESTRATÉGICA PARA CRESCER',
  'INOVAÇÃO QUE DIFERENCIA SUA MARCA',
  'DA ESTRATÉGIA AO SUCESSO EM PRODUÇÃO',
  'EXPERTISE REACT, NEXT.JS E NODE.JS',
  'DASHBOARDS QUE FACILITAM DECISÕES',
  'APIS ROBUSTAS E ESCALÁVEIS',
  'INTEGRAÇÃO PERFEITA COM SEU ECOSSISTEMA',
  'SEGURANÇA ENTERPRISE PARA SEU PRODUTO',
  'SOLUÇÕES QUE GERAM RESULTADOS REAIS',
] as const;

/**
 * Subtítulos descritivos correspondentes aos títulos
 */
const HERO_SUBTITLES = [
  'Parceiro técnico estratégico para empresas que querem sair na frente com aplicações web de alta performance que conquistam clientes e aumentam vendas.',
  'Stack completa React 19, Next.js 15, TypeScript e Node.js. Código profissional que escala com seu crescimento e reduz custos operacionais a longo prazo.',
  'Aplicações que impressionam visualmente, carregam instantaneamente e convertem visitantes em clientes fiéis. Design que vende, performance que retém.',
  'Desenvolvimento premium com padrões enterprise. Código limpo, testado e documentado que facilita manutenção e reduz bugs em até 80%.',
  'Sites 3x mais rápidos que a concorrência. SEO otimizado para ranquear no Google. Performance que aumenta conversões e reduz taxa de rejeição.',
  'Interfaces intuitivas que encantam usuários e aumentam engajamento. Design responsivo que funciona perfeitamente em todos dispositivos.',
  'Tecnologia moderna com ROI comprovado. Processos ágeis que entregam valor rapidamente e garantem comunicação transparente durante todo projeto.',
  'Testes automatizados, code review rigoroso e arquitetura sólida. Qualidade premium que minimiza problemas pós-lançamento.',
  'Acompanhamento completo: planejamento estratégico, desenvolvimento ágil, testes de qualidade, deploy seguro e suporte pós-lançamento.',
  'Especialista certificado em React e Next.js. Portfólio com +20 projetos reais em produção gerando resultados para empresas de diversos segmentos.',
  'Dashboards executivos com insights acionáveis. Visualizações de dados que facilitam tomada de decisão e aumentam produtividade do time.',
  'APIs REST escaláveis e seguras. Arquitetura robusta com NestJS que suporta alto volume de requisições e garante disponibilidade 99.9%.',
  'Integração profissional com Stripe, PayPal, AWS, Google APIs e mais. Conecte seu sistema com qualquer serviço externo de forma segura.',
  'Autenticação multi-fator, criptografia de dados sensíveis e proteção contra ataques. Segurança que protege seu negócio e gera confiança dos clientes.',
  'Projetos entregues no prazo que geraram +R$ 2M em faturamento para clientes. Aplicações que resolvem problemas reais e impulsionam crescimento.',
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
  readonly goToSlide?: (index: number) => void;
}

// ============================================================================
// Components
// ============================================================================

// HeroLoadingState removido - loading acontece apenas no loading-screen

/**
 * Overlay de conteúdo do hero com animações
 */
function HeroContentOverlay({
  currentSlideIndex,
  isDarkTheme,
  goToSlide,
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

  // Estilos dos tokens (sem inline styles)
  const titleStyle: CSSProperties = {
    fontSize: tokens.hero.title.fontSize.clamp,
    lineHeight: tokens.hero.title.lineHeight,
    letterSpacing: tokens.hero.title.letterSpacing,
    wordSpacing: tokens.hero.title.wordSpacing,
    textShadow: safeIsDarkTheme
      ? tokens.hero.title.textShadow.dark
      : tokens.hero.title.textShadow.light,
    filter: tokens.hero.title.filter,
  };

  const subtitleStyle: CSSProperties = {
    fontSize: tokens.hero.subtitle.fontSize.clamp,
    lineHeight: tokens.hero.subtitle.lineHeight,
    letterSpacing: tokens.hero.subtitle.letterSpacing,
    textShadow: safeIsDarkTheme
      ? tokens.hero.subtitle.textShadow.dark
      : tokens.hero.subtitle.textShadow.light,
    maxWidth: tokens.hero.subtitle.maxWidth,
  };

  return (
    <>
      <div
        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none p-3 xs:p-4 sm:p-5 md:p-7 lg:p-9 xl:p-11"
        aria-live="polite"
        aria-atomic="true"
      >
      <div className="relative z-10 w-full mx-auto pointer-events-auto" style={{ maxWidth: tokens.hero.container.maxWidth.lg }}>
        <div
          className="text-center relative z-20 flex flex-col justify-center items-center"
          style={{
            paddingTop: tokens.hero.container.padding.top,
            paddingBottom: tokens.hero.container.padding.bottom,
            paddingLeft: tokens.hero.container.padding.x.mobile,
            paddingRight: tokens.hero.container.padding.x.mobile,
            gap: tokens.hero.container.gap,
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
              'font-extrabold tracking-tight px-2 sm:px-0',
              'text-white drop-shadow-lg',
              'cyberpunk-title'
            )}
            style={titleStyle}
            suppressHydrationWarning
          >
            {displayTitle}
          </motion.h1>

          {/* Subtítulo - Key baseado no índice para permitir animações entre slides */}
          <motion.p
            key={`subtitle-${stableIndex}`}
            initial={hasMounted ? { opacity: 0, y: 20 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={
              hasMounted ? { delay: 0.5, duration: 0.6 } : { duration: 0 }
            }
            className="font-normal text-emerald-400 dark:text-emerald-400 px-4 sm:px-0 max-w-4xl mx-auto"
            style={subtitleStyle}
            suppressHydrationWarning
          >
            {displaySubtitle}
          </motion.p>
        </div>
      </div>
      </div>
    </>
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
    goToNext,
    goToPrevious,
    goToSlide,
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
      {/* Carousel renderiza diretamente - loading acontece apenas no loading-screen */}
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
        goToSlide={goToSlide}
      />

      {/* Controles de navegação - Profissionais */}
      {isMounted && (
        <>
          {/* Botão Anterior */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 group"
            aria-label="Slide anterior"
          >
            <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full backdrop-blur-md bg-black/30 dark:bg-black/50 border border-cyan-400/30 dark:border-cyan-400/50 transition-all duration-300 hover:scale-110 hover:bg-black/50 dark:hover:bg-black/70 hover:border-cyan-400/60">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400 transition-transform group-hover:-translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <div className="absolute inset-0 rounded-full blur-md bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>
          </button>

          {/* Botão Próximo */}
          <button
            onClick={goToNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 group"
            aria-label="Próximo slide"
          >
            <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full backdrop-blur-md bg-black/30 dark:bg-black/50 border border-cyan-400/30 dark:border-cyan-400/50 transition-all duration-300 hover:scale-110 hover:bg-black/50 dark:hover:bg-black/70 hover:border-cyan-400/60">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400 transition-transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <div className="absolute inset-0 rounded-full blur-md bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>
          </button>
        </>
      )}

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
