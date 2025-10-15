/**
 * Help Center
 * 
 * Central de ajuda com dicas rápidas e links úteis
 * 
 * @fileoverview Help center component
 * @author Rainer Teixeira
 */

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, BookOpen, Video, MessageCircle, ExternalLink } from "lucide-react"
import Link from "next/link"

export function HelpCenter() {
  const resources = [
    {
      icon: BookOpen,
      title: "Documentação",
      description: "Guias completos de uso",
      link: "/docs"
    },
    {
      icon: Video,
      title: "Tutoriais",
      description: "Vídeos passo a passo",
      link: "/tutorials"
    },
    {
      icon: MessageCircle,
      title: "Suporte",
      description: "Fale com nossa equipe",
      link: "/contato"
    }
  ]

  return (
    <Card className="dark:bg-black/30 dark:border-purple-400/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 dark:text-purple-200">
          <HelpCircle className="h-5 w-5" />
          Central de Ajuda
        </CardTitle>
        <CardDescription>
          Precisa de ajuda? Acesse nossos recursos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {resources.map((resource, index) => {
          const Icon = resource.icon
          return (
            <Button
              key={index}
              asChild
              variant="outline"
              className="w-full justify-between dark:border-purple-400/20 dark:hover:bg-purple-400/10"
            >
              <Link href={resource.link}>
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  <div className="text-left">
                    <div className="font-medium text-sm">{resource.title}</div>
                    <div className="text-xs text-muted-foreground">{resource.description}</div>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          )
        })}
      </CardContent>
    </Card>
  )
}

