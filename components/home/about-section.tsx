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
    <section className="w-full max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-12 xs:py-14 sm:py-16" aria-labelledby="about-heading">
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader className="text-center p-4 xs:p-5 sm:p-6">
          <div className="flex flex-col items-center gap-3 xs:gap-4 mb-3 xs:mb-4">
            <Avatar className="h-16 w-16 xs:h-18 xs:w-18 sm:h-20 sm:w-20 border-2 border-primary">
              <AvatarImage src="/images/t1.jpg" alt="Rainer Teixeira" />
              <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xl xs:text-2xl">
                RT
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1.5 xs:space-y-2">
              <CardTitle id="about-heading" className="text-2xl xs:text-3xl md:text-4xl font-bold">
                Sobre Mim
              </CardTitle>
              <Badge variant="secondary" className="text-xs xs:text-sm">
                <Award className="w-2.5 h-2.5 xs:w-3 xs:h-3 mr-1" />
                Full-Stack Developer
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="text-center space-y-6 xs:space-y-8 p-4 xs:p-5 sm:p-6">
          <div className="grid grid-cols-1 xs:grid-cols-3 gap-4 xs:gap-6">
            {finalStats.map((stat, index) => {
              const IconComponent = stat.icon
              
              return (
                <div key={index} className="flex flex-col items-center gap-2 xs:gap-3">
                  <div className="p-2 xs:p-2.5 sm:p-3 rounded-full bg-primary" aria-hidden="true">
                    <IconComponent className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                  </div>
                  <div className="space-y-0.5 xs:space-y-1">
                    <div className="text-xl xs:text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs xs:text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              )
            })}
          </div>
          
          <p className="text-sm xs:text-base sm:text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed px-2">
            Com mais de 5 anos de experiência em desenvolvimento de software,
            especializo-me em criar soluções digitais inovadoras que resolvem problemas reais.
            Transformo ideias em aplicações funcionais e escaláveis.
          </p>
          
          <Link href="/sobre" className="inline-block">
            <Button size="lg" className="px-6 xs:px-8 text-sm xs:text-base">
              Ver Perfil Completo
              <ArrowRight className="w-3 h-3 xs:w-4 xs:h-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </section>
  )
}
