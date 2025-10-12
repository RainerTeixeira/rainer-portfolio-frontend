import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Target, Lightbulb, Rocket, Award, ArrowRight, LucideIcon } from "lucide-react"
import Link from "next/link"

interface AboutSectionProps {
  stats?: Array<{
    icon: LucideIcon
    value: string
    label: string
  }>
}

export function AboutSection({ stats }: AboutSectionProps) {
  const defaultStats = [
    { icon: Target, value: "5+ Anos", label: "Experiência" },
    { icon: Lightbulb, value: "100+", label: "Projetos" },
    { icon: Rocket, value: "50+", label: "Clientes" }
  ]

  const finalStats = stats || defaultStats

  return (
    <section className="max-w-7xl mx-auto px-6 py-16" aria-labelledby="about-heading">
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader className="text-center">
          <div className="flex flex-col items-center gap-4 mb-4">
            <Avatar className="h-20 w-20 border-2 border-primary">
              <AvatarImage src="/images/t1.jpg" alt="Rainer Teixeira" />
              <AvatarFallback className="bg-primary text-primary-foreground font-bold text-2xl">
                RT
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <CardTitle id="about-heading" className="text-3xl md:text-4xl font-bold">
                Sobre Mim
              </CardTitle>
              <Badge variant="secondary" className="text-sm">
                <Award className="w-3 h-3 mr-1" />
                Full-Stack Developer
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="text-center space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {finalStats.map((stat, index) => {
              const IconComponent = stat.icon
              
              return (
                <div key={index} className="flex flex-col items-center gap-3">
                  <div className="p-3 rounded-full bg-primary" aria-hidden="true">
                    <IconComponent className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              )
            })}
          </div>
          
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Com mais de 5 anos de experiência em desenvolvimento de software,
            especializo-me em criar soluções digitais inovadoras que resolvem problemas reais.
            Transformo ideias em aplicações funcionais e escaláveis.
          </p>
          
          <Link href="/sobre" className="inline-block">
            <Button size="lg" className="px-8">
              Ver Perfil Completo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </section>
  )
}
