/**
 * Componente PostCard (Card de Post de Blog)
 * 
 * Card visual para exibir preview de posts de blog/artigos.
 * Inclui imagem de destaque, categoria, data, título, descrição e link.
 * 
 * Características:
 * - Imagem de destaque responsiva (Next.js Image)
 * - Badge de categoria com cores vibrantes
 * - Data de publicação
 * - Hover com elevação, escala e efeitos neon
 * - Link "Ler mais" opcional
 * - Visual cyberpunk: gradientes, sombras neon, bordas luminosas
 * - Animações suaves com Framer Motion
 * 
 * @fileoverview Card de preview de post de blog com estilo cyberpunk
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, Tag } from "lucide-react"
import { CARD_CLASSES, cn } from "@/lib/utils"
import { LikeButton, ShareButton, BookmarkButton, ReadingTime } from "./social"

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
 * @property {string} [postId] - ID do post para interações sociais
 * @property {number} [likes] - Número de curtidas
 * @property {boolean} [isLiked] - Se o post está curtido pelo usuário
 * @property {boolean} [isBookmarked] - Se o post está salvo pelo usuário
 * @property {string | object} [content] - Conteúdo do post para calcular tempo de leitura
 * @property {boolean} [showSocialActions] - Se deve mostrar ações sociais (curtir, compartilhar, etc)
 */
interface PostCardProps {
  title: string
  description?: string
  date?: string
  category?: string
  link?: string
  image?: string
  postId?: string
  likes?: number
  isLiked?: boolean
  isBookmarked?: boolean
  content?: string | object
  showSocialActions?: boolean
}

/**
 * Componente PostCard
 * 
 * Renderiza card de preview de post com imagem, metadados e descrição.
 * Otimizado para grids responsivos de posts com visual cyberpunk.
 * 
 * Efeitos visuais:
 * - Hover: elevação, escala (1.02x) e brilho neon
 * - Transição suave com spring animation
 * - Imagem com overlay gradient no hover
 * - Bordas luminosas no dark mode
 * - Badges com cores vibrantes
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
export function PostCard({ 
  title, 
  description, 
  date, 
  category, 
  link, 
  image,
  postId,
  likes = 0,
  isLiked = false,
  isBookmarked = false,
  content,
  showSocialActions = false
}: PostCardProps) {
  const CardWrapper = link ? Link : 'div'
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      className="group"
    >
      <CardWrapper 
        href={link || "#"}
        className="block"
      >
        <Card 
          className={cn(
            CARD_CLASSES.full,
            "overflow-hidden relative",
            "border-border dark:border-cyan-400/20",
            "hover:border-cyan-400/50 dark:hover:border-cyan-400/60",
            "hover:shadow-2xl hover:shadow-cyan-500/20",
            "transition-all duration-300",
            "bg-gradient-to-br from-background via-background to-background/95",
            "dark:from-black dark:via-gray-900 dark:to-black"
          )}
        >
          {/* Glow Effect Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-purple-500/0 to-pink-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
          
          {/** Imagem de destaque com overlay gradient */}
          {image && (
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Overlay gradient escuro */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              
              {/* Borda neon superior */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}
          
          {/** Header com metadados e título */}
          <CardHeader className="space-y-4 relative z-10">
            {/* Metadados */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              {category && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-1"
                >
                  <Tag className="w-3 h-3 text-cyan-400" />
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "text-xs font-mono",
                      "bg-gradient-to-r from-cyan-500/10 to-purple-500/10",
                      "border border-cyan-400/30",
                      "text-cyan-600 dark:text-cyan-300",
                      "hover:from-cyan-500/20 hover:to-purple-500/20",
                      "transition-all duration-200"
                    )}
                  >
                    {category}
                  </Badge>
                </motion.div>
              )}
              {date && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground dark:text-gray-400">
                  <Calendar className="w-3 h-3" />
                  <span className="font-mono">{date}</span>
                </div>
              )}
            </div>
            
            {/* Título com gradient no hover */}
            <CardTitle 
              className={cn(
                "text-xl leading-tight transition-all duration-300",
                "group-hover:text-transparent group-hover:bg-clip-text",
                "group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-purple-400 group-hover:to-pink-400",
                "dark:text-gray-100"
              )}
            >
              {title}
            </CardTitle>
          </CardHeader>
          
          {/** Conteúdo com descrição e link */}
          <CardContent className="space-y-4 relative z-10">
            {description && (
              <CardDescription 
                className={cn(
                  "text-sm leading-relaxed line-clamp-3",
                  "dark:text-gray-400"
                )}
              >
                {description}
              </CardDescription>
            )}

            {/* Tempo de leitura */}
            {content && (
              <ReadingTime content={content} className="text-xs" />
            )}

            {/* Ações sociais */}
            {showSocialActions && postId && (
              <div 
                className="flex items-center justify-between gap-2 pt-2 border-t border-border/50"
                onClick={(e) => e.preventDefault()} // Impede navegação ao clicar nos botões
              >
                <div className="flex items-center gap-1">
                  <LikeButton 
                    postId={postId} 
                    initialLikes={likes} 
                    initialIsLiked={isLiked}
                    variant="compact"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <BookmarkButton 
                    postId={postId}
                    initialIsBookmarked={isBookmarked}
                    variant="ghost"
                    size="sm"
                    showLabel={false}
                  />
                  {link && (
                    <ShareButton 
                      url={link}
                      title={title}
                      description={description}
                      variant="ghost"
                      size="sm"
                      showLabel={false}
                    />
                  )}
                </div>
              </div>
            )}
            
            {/** Link "Ler mais" com animação de seta */}
            {link && (
              <motion.div 
                className={cn(
                  "inline-flex items-center gap-2 text-sm font-medium font-mono",
                  "text-cyan-600 dark:text-cyan-400",
                  "group-hover:text-cyan-500 dark:group-hover:text-cyan-300",
                  "transition-colors duration-200"
                )}
              >
                <span>Ler mais</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5,
                    ease: "easeInOut"
                  }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.div>
            )}
          </CardContent>

          {/* Borda neon inferior */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Card>
      </CardWrapper>
    </motion.div>
  )
}
