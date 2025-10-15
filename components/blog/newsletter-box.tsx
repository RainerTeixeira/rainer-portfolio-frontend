/**
 * Newsletter Signup Box
 * 
 * Caixa para captura de emails e inscrição na newsletter
 * 
 * @fileoverview Newsletter subscription component
 * @author Rainer Teixeira
 */

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, Send, Check } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface NewsletterBoxProps {
  title?: string
  description?: string
  className?: string
}

export function NewsletterBox({
  title = "📬 Receba conteúdo técnico no seu email",
  description = "Cadastre-se para receber novos artigos, tutoriais e dicas de desenvolvimento. 100% conteúdo de qualidade, zero spam!",
  className
}: NewsletterBoxProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!email || !email.includes("@")) {
      toast.error("Por favor, insira um email válido")
      return
    }

    setIsLoading(true)

    try {
      // TODO: Implementar API de newsletter
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simular API

      toast.success("Inscrição realizada com sucesso!")
      setIsSubscribed(true)
      setEmail("")
    } catch (error) {
      toast.error("Erro ao se inscrever. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubscribed) {
    return (
      <Card className={cn(
        "dark:bg-gradient-to-br dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-400/30",
        className
      )}>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 text-green-600 dark:text-green-400">
            <Check className="h-6 w-6" />
            <div>
              <p className="font-semibold">Inscrição confirmada! ✅</p>
              <p className="text-sm text-muted-foreground">
                Você receberá nossos melhores conteúdos por email.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn(
      "dark:bg-gradient-to-br dark:from-purple-900/20 dark:to-pink-900/20 dark:border-purple-400/30",
      className
    )}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 dark:text-purple-200">
          <Mail className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription className="dark:text-gray-300">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="dark:bg-black/30 dark:border-purple-400/30"
          />
          <Button 
            type="submit" 
            disabled={isLoading}
            className="gap-2 dark:bg-purple-600 dark:hover:bg-purple-700"
          >
            {isLoading ? (
              "Enviando..."
            ) : (
              <>
                <Send className="h-4 w-4" />
                Inscrever
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

