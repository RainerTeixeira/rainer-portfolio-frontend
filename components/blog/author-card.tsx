/**
 * Card do Autor
 * 
 * Exibe informações sobre o autor do post
 * 
 * @fileoverview Author card component
 * @author Rainer Teixeira
 */

"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GithubIcon, Linkedin, Twitter, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

interface AuthorCardProps {
  name?: string
  bio?: string
  avatar?: string
  role?: string
  social?: {
    github?: string
    linkedin?: string
    twitter?: string
    website?: string
  }
  className?: string
}

export function AuthorCard({
  name = "Rainer Teixeira",
  bio = "Desenvolvedor Full-Stack com projetos reais em React, Next.js, TypeScript e Node.js. Apaixonado por código limpo, arquitetura bem pensada e tecnologias modernas.",
  avatar = "/logo.png",
  role = "Desenvolvedor Full-Stack | Portfolio Comprovado",
  social = {
    github: "https://github.com/rainerteixeira",
    linkedin: "https://linkedin.com/in/rainerteixeira",
    website: "https://rainersoft.com.br"
  },
  className
}: AuthorCardProps) {
  return (
    <Card className={cn("dark:bg-black/50 dark:border-cyan-400/20", className)}>
      <CardContent className="p-6">
        <div className="flex gap-4 items-start">
          {/* Avatar */}
          <Avatar className="h-16 w-16 border-2 border-cyan-400/30">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>

          {/* Info */}
          <div className="flex-1 space-y-2">
            <div>
              <h3 className="font-bold text-lg dark:text-cyan-200">{name}</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">{role}</p>
            </div>
            <p className="text-sm dark:text-gray-300">{bio}</p>
            
            {/* Social Links */}
            <div className="flex items-center gap-2 pt-2">
              {social.github && (
                <Button variant="ghost" size="sm" asChild>
                  <a href={social.github} target="_blank" rel="noopener noreferrer">
                    <GithubIcon className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {social.linkedin && (
                <Button variant="ghost" size="sm" asChild>
                  <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {social.twitter && (
                <Button variant="ghost" size="sm" asChild>
                  <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {social.website && (
                <Button variant="ghost" size="sm" asChild>
                  <a href={social.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

