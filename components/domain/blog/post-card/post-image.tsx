/**
 * Componente de Imagem do PostCard
 *
 * Componente de imagem com efeitos visuais premium:
 * - Overlay gradient com glow effect
 * - Borda neon superior animada
 * - Hover com escala e transições suaves
 * - Suporte a Next.js Image otimizado
 * 
 * @module components/domain/blog/post-card/post-image
 * @fileoverview Componente de imagem com efeitos visuais premium
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 * 
 * @example
 * ```tsx
 * <PostImage
 *   image="/posts/nextjs.jpg"
 *   title="Como usar Next.js 14"
 *   accentCyan="#00bcd4"
 *   accentPurple="#7c3aed"
 *   accentPink="#ec4899"
 * />
 * ```
 */

'use client';

export const dynamic = 'force-dynamic';

import Image from 'next/image';
import { cn } from '@rainersoft/ui';

/**
 * Propriedades do componente PostImage
 * 
 * @interface PostImageProps
 * @property {string} image - URL da imagem de destaque
 * @property {string} title - Texto alt para acessibilidade
 * @property {string} accentCyan - Cor primária para gradientes
 * @property {string} accentPurple - Cor secundária para gradientes
 * @property {string} accentPink - Cor de destaque para gradientes
 */
export interface PostImageProps {
  image?: string;
  title: string;
  accentCyan: string;
  accentPurple: string;
  accentPink: string;
}

/**
 * Componente PostImage
 * 
 * Renderiza imagem de destaque com efeitos visuais premium:
 * - Overlay gradient com glow effect
 * - Borda neon superior animada
 * - Hover com escala e transições suaves
 * - Next.js Image para otimização
 * 
 * @function PostImage
 * @param {PostImageProps} props - Propriedades do componente
 * @returns {JSX.Element} Imagem com efeitos renderizada
 */
export function PostImage({
  image,
  title,
  accentCyan,
  accentPurple,
  accentPink,
}: PostImageProps) {
  if (!image) return null;

  return (
    <div className="relative h-48 w-full overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={false}
      />
      
      {/* Overlay gradient escuro */}
      <div
        className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"
        aria-hidden="true"
      />
      
      {/* Borda neon superior */}
      <div
        className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(to right, ${accentCyan}, ${accentPurple}, ${accentPink})`,
        }}
        aria-hidden="true"
      />
    </div>
  );
}

