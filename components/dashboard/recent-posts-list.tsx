/**
 * Lista de Posts Recentes
 * 
 * Componente que exibe os posts recentes com ações rápidas
 * 
 * @fileoverview Recent Posts List Component
 * @author Rainer Teixeira
 */

"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Edit2, Trash2, Eye, Calendar, Tag } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { blogStore, type BlogPost } from "@/components/blog/lib/blog-store"
import { cn } from "@/lib/utils"

interface RecentPostsListProps {
  onEditPost?: (post: BlogPost) => void
  onDeletePost?: (postId: string) => void
  maxPosts?: number
}

export function RecentPostsList({ 
  onEditPost, 
  onDeletePost,
  maxPosts = 5 
}: RecentPostsListProps) {
  const posts = blogStore.getPosts().slice(0, maxPosts)

  if (posts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Posts Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum post criado ainda</p>
            <p className="text-sm mt-2">Comece criando seu primeiro post!</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Posts Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30,
                delay: index * 0.1 
              }}
              className={cn(
                "p-4 rounded-lg border-2 transition-all duration-300",
                "hover:border-cyan-400/50 dark:hover:border-cyan-400/50",
                "hover:shadow-md dark:hover:shadow-cyan-400/10",
                "hover:scale-[1.02]",
                "group"
              )}
            >
              <div className="flex items-start gap-4">
                {/* Imagem do Post */}
                {post.image && (
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 relative">
                    <Image 
                      src={post.image} 
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Informações do Post */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg line-clamp-1 dark:text-gray-100">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {post.description}
                      </p>
                    </div>

                    {/* Status */}
                    {post.published ? (
                      <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30">
                        Publicado
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Rascunho</Badge>
                    )}
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-muted-foreground">
                    {post.category && (
                      <div className="flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex items-center gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEditPost?.(post)}
                      className="gap-2 dark:border-cyan-400/30 dark:hover:bg-cyan-400/10"
                    >
                      <Edit2 className="w-3 h-3" />
                      Editar
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onDeletePost?.(post.id)}
                      className="gap-2 dark:border-red-400/30 dark:hover:bg-red-400/10 dark:text-red-400"
                    >
                      <Trash2 className="w-3 h-3" />
                      Deletar
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

