/**
 * Seção de Contato
 * 
 * Seção de contato redesenhada com visual premium
 * 
 * @fileoverview Seção de contato resumida na home
 * @author Rainer Teixeira
 */

"use client"

import { memo, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Send, MessageSquare, Zap } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export const ContactSection = memo(function ContactSection() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "suporte@rainersoft.com.br",
      gradient: "from-cyan-500 to-blue-600",
      iconBg: "from-cyan-400 to-blue-500",
      href: "mailto:suporte@rainersoft.com.br"
    },
    {
      icon: Phone,
      title: "Telefone",
      content: "+55 24 99913-7382",
      gradient: "from-purple-500 to-pink-600",
      iconBg: "from-purple-400 to-pink-500",
      href: "tel:+5524999137382"
    },
    {
      icon: MapPin,
      title: "Localização",
      content: "Volta Redonda, RJ",
      gradient: "from-orange-500 to-amber-600",
      iconBg: "from-orange-400 to-amber-500",
      href: null
    }
  ]

  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Brilho de fundo */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 dark:from-cyan-400/5 dark:via-purple-400/5 dark:to-pink-400/5 blur-3xl"></div>
        
        <div className="relative">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full ${isDark ? 'bg-gradient-to-r from-green-400 via-emerald-400 to-green-500' : 'bg-gradient-to-r from-green-500 via-emerald-500 to-green-600'} text-white font-bold text-sm mb-8 shadow-xl`}
            >
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              Disponível para Contato
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Vamos Trabalhar
              </span>
              <br />
              <span className="text-foreground dark:text-white">
                Juntos
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-4"
            >
              Procuro oportunidades de <span className="font-bold text-foreground dark:text-cyan-200">desenvolvimento full-stack</span> onde possa 
              aplicar minhas habilidades e crescer profissionalmente. Vamos conversar!
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-sm sm:text-base text-muted-foreground dark:text-gray-400 max-w-2xl mx-auto"
            >
              <span className="font-semibold text-foreground dark:text-purple-200">Especializado em:</span> Desenvolvimento web full-stack, 
              APIs REST, PWAs, dashboards administrativos e integrações com sistemas externos.
            </motion.p>
          </div>

          {/* Grid de cards de contato */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactInfo.map((item, index) => {
              const Icon = item.icon
              const content = item.href ? (
                <a 
                  href={item.href} 
                  className="hover:underline hover:text-foreground dark:hover:text-white transition-colors"
                >
                  {item.content}
                </a>
              ) : (
                <span>{item.content}</span>
              )

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="group/contact"
                >
                  <div className="relative h-full">
                    {/* Brilho de fundo */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.iconBg} rounded-2xl blur-2xl opacity-0 group-hover/contact:opacity-20 transition-opacity duration-500`}></div>
                    
                    {/* Card */}
                    <div className={cn(
                      "relative h-full bg-card/80 dark:bg-black/60 backdrop-blur-xl",
                      "border border-border/50 dark:border-cyan-400/20",
                      "hover:border-primary dark:hover:border-cyan-400/60",
                      "rounded-2xl p-8",
                      "transition-all duration-500",
                      "hover:shadow-2xl hover:-translate-y-1",
                      "overflow-hidden text-center"
                    )}>
                      {/* Brilho interno */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover/contact:opacity-10 transition-opacity duration-500`}></div>
                      
                      <div className="relative z-10">
                        {/* Ícone */}
                        <div className="relative mb-6">
                          <div className={`absolute inset-0 bg-gradient-to-br ${item.iconBg} rounded-xl blur-md opacity-40`}></div>
                          <div className={`relative inline-flex p-4 rounded-xl bg-gradient-to-br ${item.iconBg} shadow-xl group-hover/contact:scale-110 transition-transform duration-300`}>
                            <Icon className="h-7 w-7 text-white" />
                          </div>
                        </div>
                        
                        {/* Título */}
                        <h3 className="text-lg font-black mb-3 text-foreground dark:text-white">
                          {item.title}
                        </h3>
                        
                        {/* Conteúdo */}
                        <div className="text-sm font-medium text-muted-foreground dark:text-gray-300">
                          {content}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* CTA Final */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="text-center"
          >
            <div className="relative bg-card/90 dark:bg-black/60 backdrop-blur-xl rounded-3xl p-8 sm:p-10 border-2 border-border/50 dark:border-cyan-400/30 shadow-2xl overflow-hidden max-w-4xl mx-auto">
              {/* Brilho de fundo */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 dark:from-cyan-400/10 dark:via-purple-400/10 dark:to-pink-400/10"></div>
              
              <div className="relative z-10">
                <p className="text-base sm:text-lg text-muted-foreground dark:text-gray-300 mb-8 leading-relaxed">
                  <span className="font-bold text-foreground dark:text-cyan-200">Resposta em até 24 horas.</span> Entre em contato sem compromisso 
                  para conversarmos sobre oportunidades, projetos ou colaborações.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    asChild 
                    size="lg"
                    className={`group/btn gap-3 text-lg px-10 py-6 ${isDark ? 'bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 shadow-cyan-500/30 hover:shadow-cyan-500/50' : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 shadow-blue-500/30 hover:shadow-blue-500/50'} text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105`}
                  >
                    <Link href="/contato">
                      <MessageSquare className="h-6 w-6" />
                      <span className="font-bold">Iniciar Conversa</span>
                      <Send className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  
                  <Button 
                    asChild 
                    variant="outline"
                    size="lg"
                    className="gap-3 text-lg px-10 py-6 border-2 dark:border-cyan-400/50 dark:hover:bg-cyan-400/10 dark:hover:border-cyan-400/80 backdrop-blur-sm hover:scale-105 transition-all duration-300 font-semibold"
                  >
                    <a href="mailto:suporte@rainersoft.com.br">
                      <Mail className="h-6 w-6" />
                      Enviar Email Direto
                    </a>
                  </Button>
                </div>

                {/* Trust badge */}
                <div className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-400/20 dark:to-emerald-400/20 border border-green-400/30">
                  <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-bold text-foreground dark:text-green-300">
                    Pronto para começar imediatamente
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
})
