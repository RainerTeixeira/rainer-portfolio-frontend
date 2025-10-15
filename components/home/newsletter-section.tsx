/**
 * Seção de Newsletter
 * 
 * Seção dedicada para assinatura de newsletter na página principal.
 * Integrada ao design do portfólio com visual moderno e responsivo.
 * Inclui formulário completo com validação e diferentes variantes.
 * 
 * @fileoverview Seção de newsletter na home com formulário integrado
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

"use client"

import { memo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Sparkles, Newspaper, CheckCircle2, Loader2, AlertCircle } from "lucide-react"
import { SECTION_CLASSES, CARD_CLASSES, cn } from "@/lib/utils"

/**
 * Schema de validação do formulário de newsletter
 */
const newsletterSchema = z.object({
  email: z.string().email("Email inválido"),
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres").optional(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "Você deve aceitar os termos"
  })
})

type NewsletterFormValues = z.infer<typeof newsletterSchema>

/**
 * Props do formulário interno
 */
interface NewsletterFormProps {
  variant?: "default" | "inline" | "minimal"
  showName?: boolean
  className?: string
}

/**
 * Componente de Formulário de Newsletter
 * 
 * Formulário interno com 3 variantes de layout:
 * - default: Card completo com todos os campos
 * - inline: Layout horizontal compacto (usado na seção principal)
 * - minimal: Layout mínimo para footers e sidebars
 * 
 * @param {NewsletterFormProps} props - Propriedades do formulário
 * @returns {JSX.Element} Formulário de newsletter
 */
function NewsletterForm({ 
  variant = "default",
  showName = false,
  className 
}: NewsletterFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
      name: "",
      acceptTerms: false,
    },
  })

  const acceptTerms = watch("acceptTerms")

  async function onSubmit(data: NewsletterFormValues) {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Erro ao inscrever")
      }

      setSuccess(true)
      reset()
    } catch (err: any) {
      setError(err.message || "Erro ao inscrever. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Variante inline (usado na seção principal)
  if (variant === "inline") {
    return (
      <div className={cn("space-y-3", className)}>
        {success ? (
          <Alert className="border-green-500">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-700 dark:text-green-400">
              Inscrição confirmada! Verifique seu email.
            </AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2">
              <Input
                {...register("email")}
                type="email"
                placeholder="seu@email.com"
                disabled={isSubmitting}
                className={errors.email ? "border-destructive" : ""}
              />
              <Button type="submit" disabled={isSubmitting || !acceptTerms}>
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Mail className="h-4 w-4" />
                )}
              </Button>
            </div>

            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms-inline"
                checked={acceptTerms}
                onCheckedChange={(checked) => setValue("acceptTerms", checked as boolean)}
                disabled={isSubmitting}
              />
              <label
                htmlFor="terms-inline"
                className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Aceito receber emails com novidades
              </label>
            </div>
          </form>
        )}
      </div>
    )
  }

  // Variante minimal (para footers/sidebars)
  if (variant === "minimal") {
    return (
      <div className={cn("space-y-2", className)}>
        {success ? (
          <p className="text-sm text-green-600 dark:text-green-400 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Inscrito com sucesso!
          </p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
            <Input
              {...register("email")}
              type="email"
              placeholder="seu@email.com"
              disabled={isSubmitting}
              className="text-sm"
            />
            <Button type="submit" size="sm" disabled={isSubmitting || !acceptTerms}>
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Inscrever"
              )}
            </Button>
          </form>
        )}
      </div>
    )
  }

  // Variante default (card completo)
  return (
    <Card className={cn("border-2", className)}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500">
            <Mail className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle>Newsletter</CardTitle>
            <CardDescription>
              Receba conteúdos exclusivos no seu email
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {success ? (
          <Alert className="border-green-500">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-700 dark:text-green-400">
              <strong>Inscrição confirmada!</strong>
              <br />
              Enviamos um email de confirmação. Verifique sua caixa de entrada.
            </AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {showName && (
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Nome (opcional)
                </label>
                <Input
                  {...register("name")}
                  id="name"
                  placeholder="Seu nome"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="seu@email.com"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setValue("acceptTerms", checked as boolean)}
                disabled={isSubmitting}
              />
              <label
                htmlFor="terms"
                className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Aceito receber emails com novidades e conteúdos exclusivos
              </label>
            </div>

            {errors.acceptTerms && (
              <p className="text-sm text-destructive">{errors.acceptTerms.message}</p>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting || !acceptTerms}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Inscrevendo...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Inscrever-se
                </>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Seus dados estão seguros. Cancele a inscrição a qualquer momento.
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  )
}

/**
 * Componente NewsletterSection
 * 
 * Renderiza seção completa de newsletter com call-to-action visual atraente.
 * Inclui formulário integrado com variante "inline" para melhor UX.
 * 
 * Estrutura:
 * 1. Card principal com gradiente e efeitos visuais premium
 * 2. Header com badge, ícone animado, título e descrição
 * 3. Formulário de inscrição inline integrado
 * 4. Grid de benefícios com ícones e animações
 * 5. Texto de segurança/privacidade
 * 
 * Otimizado com React.memo para performance.
 * 
 * @returns {JSX.Element} Seção de newsletter completa
 * 
 * @example
 * import { NewsletterSection } from '@/components/home'
 * 
 * <NewsletterSection />
 */
export const NewsletterSection = memo(function NewsletterSection() {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Brilho de fundo */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 dark:from-cyan-400/5 dark:via-purple-400/5 dark:to-pink-400/5 blur-3xl"></div>
        
        <div className="relative">
          {/* Card principal premium */}
          <div className="relative bg-card/90 dark:bg-black/70 backdrop-blur-2xl rounded-[32px] p-10 sm:p-14 lg:p-16 border-2 border-border/50 dark:border-cyan-400/30 shadow-2xl overflow-hidden">
            {/* Partículas decorativas */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            <div className="relative z-10">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-white font-bold text-sm shadow-xl">
                  <Mail className="w-5 h-5" />
                  Newsletter Exclusiva
                </div>
              </motion.div>

              {/* Título e descrição */}
              <div className="text-center mb-12">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight"
                >
                  <span className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                    Fique por Dentro
                  </span>
                  <br />
                  <span className="text-foreground dark:text-white">
                    das Novidades
                  </span>
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-base sm:text-lg lg:text-xl text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
                >
                  Receba <span className="font-bold text-foreground dark:text-cyan-200">conteúdos exclusivos</span> sobre desenvolvimento web, 
                  tutoriais práticos de React e Next.js, recursos de aprendizado e atualizações sobre meus novos projetos.
                </motion.p>
              </div>

              {/* Formulário */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="max-w-2xl mx-auto mb-10"
              >
                <NewsletterForm variant="inline" />
              </motion.div>
              
              {/* Grid de benefícios melhorado */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
              >
                {[
                  { 
                    icon: Sparkles, 
                    text: "Tutoriais Práticos",
                    gradient: "from-cyan-500 to-blue-600",
                    iconBg: "from-cyan-400 to-blue-500"
                  },
                  { 
                    icon: Newspaper, 
                    text: "Novos Projetos",
                    gradient: "from-purple-500 to-pink-600",
                    iconBg: "from-purple-400 to-pink-500"
                  },
                  { 
                    icon: Mail, 
                    text: "Recursos Exclusivos",
                    gradient: "from-orange-500 to-amber-600",
                    iconBg: "from-orange-400 to-amber-500"
                  }
                ].map((benefit, index) => {
                  const IconComponent = benefit.icon
                  return (
                    <div 
                      key={index}
                      className="group/benefit relative bg-card/60 dark:bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-border/50 dark:border-cyan-400/20 hover:border-primary dark:hover:border-cyan-400/60 transition-all duration-300 hover:shadow-xl overflow-hidden text-center"
                    >
                      {/* Brilho de fundo */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover/benefit:opacity-10 transition-opacity duration-500`}></div>
                      
                      <div className="relative z-10">
                        {/* Ícone */}
                        <div className="relative mb-4">
                          <div className={`absolute inset-0 bg-gradient-to-br ${benefit.iconBg} rounded-xl blur-md opacity-40`}></div>
                          <div className={`relative inline-flex p-3 rounded-xl bg-gradient-to-br ${benefit.iconBg} shadow-lg group-hover/benefit:scale-110 transition-transform duration-300`}>
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        
                        {/* Texto */}
                        <span className="text-sm font-bold text-foreground dark:text-gray-200 group-hover/benefit:text-foreground dark:group-hover/benefit:text-white transition-colors">
                          {benefit.text}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </motion.div>
              
              {/* Texto de privacidade melhorado */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-10 text-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 dark:bg-black/40 border border-border/50 dark:border-cyan-400/20">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                  <span className="text-xs font-medium text-muted-foreground dark:text-gray-400">
                    🔒 Dados 100% seguros • Cancele quando quiser • Sem spam
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

/**
 * Exporta também o formulário separadamente para uso em outras partes da aplicação
 */
export { NewsletterForm }
