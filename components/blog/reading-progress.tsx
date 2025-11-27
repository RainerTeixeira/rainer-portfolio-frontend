/**
 * Reading Progress Component
 *
 * Barra de progresso de leitura que indica o progresso de leitura do artigo.
 * Barra fixa no topo com animação suave, suporta elemento específico ou página
 * inteira.
 *
 * @module components/blog/reading-progress
 * @fileoverview Barra de progresso de leitura com animação
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Barra de progresso padrão
 * <ReadingProgress />
 *
 * // Barra de progresso para elemento específico
 * <ReadingProgress target={articleRef} height={4} />
 * ```
 *
 * Características:
 * - Barra fixa no topo da página
 * - Animação suave com Framer Motion
 * - Suporte a elemento específico ou página inteira
 * - Altura configurável
 * - Integração com useScroll do Framer Motion
 * - Performance otimizada
 */

'use client';

import { cn } from '@/lib/portfolio';
import { GRADIENT_DIRECTIONS } from '@rainersoft/design-tokens';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ReadingProgressProps {
  target?: React.RefObject<HTMLElement>;
  className?: string;
  height?: number;
}

export function ReadingProgress({
  target,
  className,
  height = 3,
}: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll(target ? { target } : undefined);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    return scrollYProgress.on('change', latest => {
      setProgress(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <>
      {/* Barra de progresso fixa no topo */}
      <motion.div
        className={cn(
          'fixed top-0 left-0 right-0 z-50 origin-left',
          `${GRADIENT_DIRECTIONS.TO_RIGHT} from-cyan-400 via-purple-400 to-pink-400`,
          className
        )}
        style={{
          scaleX,
          height: `${height}px`,
        }}
      />

      {/* Indicador de porcentagem (opcional) */}
      {progress > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-20 right-4 z-40 bg-background/95 backdrop-blur-sm border-2 rounded-full px-3 py-1.5 shadow-lg"
        >
          <span
            className={cn(
              'text-xs font-bold bg-clip-text text-transparent',
              `${GRADIENT_DIRECTIONS.TO_RIGHT} from-cyan-400 via-purple-400 to-pink-400`
            )}
          >
            {progress}%
          </span>
        </motion.div>
      )}
    </>
  );
}


