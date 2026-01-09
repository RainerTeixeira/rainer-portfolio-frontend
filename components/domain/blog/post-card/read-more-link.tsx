/**
 * Componente de Link "Ler Mais" do PostCard
 *
 * Componente de link com animação de seta e efeito gradient.
 * Design minimalista com transições suaves e acessibilidade.
 * 
 * @module components/domain/blog/post-card/read-more-link
 * @fileoverview Componente de link "Ler mais" com animação
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 * 
 * @example
 * ```tsx
 * <ReadMoreLink
 *   link="/blog/post-url"
 *   accentCyan="#00bcd4"
 *   accentPurple="#7c3aed"
 *   accentPink="#ec4899"
 * />
 * ```
 */

'use client';

import { cn } from '@rainersoft/ui';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

/**
 * Propriedades do componente ReadMoreLink
 * 
 * @interface ReadMoreLinkProps
 * @property {string} link - URL completa do post para navegação
 * @property {string} accentCyan - Cor primária para gradientes
 * @property {string} accentPurple - Cor secundária para gradientes
 * @property {string} accentPink - Cor de destaque para gradientes
 */
export interface ReadMoreLinkProps {
  link: string;
  accentCyan: string;
  accentPurple: string;
  accentPink: string;
}

/**
 * Componente ReadMoreLink
 * 
 * Renderiza link "Ler mais" com:
 * - Texto "Ler mais" com animação de seta
 * - Efeito gradient no hover
 * - Transições suaves com Framer Motion
 * - Acessibilidade completa com ARIA labels
 * 
 * @function ReadMoreLink
 * @param {ReadMoreLinkProps} props - Propriedades do link
 * @returns {JSX.Element} Link "Ler mais" renderizado
 */
export function ReadMoreLink({
  link,
  accentCyan,
  accentPurple,
  accentPink,
}: ReadMoreLinkProps) {
  return (
    <motion.div
      className={cn(
        'inline-flex items-center gap-2 text-sm font-medium font-mono',
        'text-cyan-600 dark:text-cyan-400',
        'group-hover:text-cyan-500 dark:group-hover:text-cyan-300',
        'transition-colors duration-200'
      )}
      aria-label={`Ler mais sobre: ${link}`}
    >
      <span>Ler mais</span>
      <motion.div
        animate={{ x: [0, 4, 0] }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: 'easeInOut',
        }}
        aria-hidden="true"
      >
        <ArrowRight className="w-4 h-4" />
      </motion.div>
    </motion.div>
  );
}
