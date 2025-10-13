/**
 * Componente PostCard (Card de Post de Blog)
 * 
 * Card visual para exibir preview de posts de blog/artigos.
 * Inclui imagem de destaque, categoria, data, título, descrição e link.
 * 
 * Características:
 * - Imagem de destaque responsiva (Next.js Image)
 * - Badge de categoria
 * - Data de publicação
 * - Hover com elevação (translateY) e sombra
 * - Link "Ler mais" opcional
 * - Overflow hidden para imagem não vazar
 * 
 * @fileoverview Card de preview de post de blog
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { CARD_CLASSES } from "@/lib/utils"

/**
 * Props do componente PostCard
 * 
 * @interface PostCardProps
 * @property {string} title - Título do post
 * @property {string} description - Descrição/resumo do post
 * @property {string} [date] - Data de publicação (formato livre)
 * @property {string} [category] - Categoria do post (ex: "Tutorial", "Notícia")
 * @property {string} [link] - URL completa do post
 * @property {string} [image] - URL da imagem de destaque
 */
interface PostCardProps {
  title: string
  description: string
  date?: string
  category?: string
  link?: string
  image?: string
}

/**
 * Componente PostCard
 * 
 * Renderiza card de preview de post com imagem, metadados e descrição.
 * Otimizado para grids responsivos de posts.
 * 
 * Efeitos visuais:
 * - Hover: elevação (-translate-y-1) e sombra aumentada
 * - Transição suave de 300ms
 * - Imagem com object-cover para manter proporção
 * 
 * @param {PostCardProps} props - Propriedades do card
 * @returns {JSX.Element} Card de post
 * 
 * @example
 * <PostCard 
 *   title="Como usar Next.js 14"
 *   description="Aprenda os fundamentos do App Router..."
 *   date="15 de março, 2024"
 *   category="Tutorial"
 *   image="/posts/nextjs.jpg"
 *   link="/blog/nextjs-14"
 * />
 */
export function PostCard({ title, description, date, category, link, image }: PostCardProps) {
  return (
    <Card className={`${CARD_CLASSES.full} hover:-translate-y-1 overflow-hidden`}>
      {/** 
       * Imagem de destaque (opcional)
       * - Altura fixa de 192px (h-48)
       * - Next.js Image para otimização
       * - object-cover para manter proporção
       * - sizes responsivo para diferentes viewports
       */}
      {image && (
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      
      {/** 
       * Header com metadados e título
       * - Badge de categoria à esquerda
       * - Data à direita
       * - Título abaixo
       */}
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          {category && (
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
          )}
          {date && (
            <span className="text-xs text-muted-foreground">{date}</span>
          )}
        </div>
        <CardTitle className="text-xl leading-tight">{title}</CardTitle>
      </CardHeader>
      
      {/** 
       * Conteúdo com descrição e link
       */}
      <CardContent className="space-y-4">
        <CardDescription className="text-sm leading-relaxed">
          {description}
        </CardDescription>
        {/** Link "Ler mais" com seta (opcional) */}
        {link && (
          <a 
            href={link} 
            className="inline-flex items-center text-sm font-medium text-primary hover:underline transition-colors"
            aria-label={`Ler mais sobre ${title}`}
          >
            Ler mais →
          </a>
        )}
      </CardContent>
    </Card>
  )
}
