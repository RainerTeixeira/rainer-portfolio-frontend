"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Formulário enviado:", formData)
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Formulário */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-2xl">Envie uma Mensagem</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Nome *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                placeholder="Seu nome completo"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                E-mail *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                placeholder="seu@email.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Assunto
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-3 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                placeholder="Sobre o que você gostaria de conversar?"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Mensagem *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full p-3 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent resize-none transition-colors"
                placeholder="Descreva seu projeto ou dúvida..."
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              Enviar Mensagem
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Informações de contato */}
      <div className="space-y-6">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl">Informações de Contato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Badge variant="secondary" className="text-xs">E-mail</Badge>
              <p className="text-muted-foreground">contato@rainersoft.com.br</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <Badge variant="secondary" className="text-xs">LinkedIn</Badge>
              <a 
                href="https://linkedin.com/in/rainerteixeira" 
                className="text-primary hover:underline transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/rainerteixeira
              </a>
            </div>
            <Separator />
            <div className="space-y-2">
              <Badge variant="secondary" className="text-xs">GitHub</Badge>
              <a 
                href="https://github.com/rainerteixeira" 
                className="text-primary hover:underline transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/rainerteixeira
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl">Tempo de Resposta</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              Normalmente respondo em até 24 horas durante dias úteis. 
              Para projetos urgentes, entre em contato via WhatsApp.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
