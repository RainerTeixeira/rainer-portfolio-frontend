import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Code, Cloud, Zap, Briefcase, Sparkles, Star, LucideIcon
} from "lucide-react"

interface Service {
  title: string
  description: string
  icon: LucideIcon
  badge: string
  features: string[]
}

export function Highlights() {
  const services: Service[] = [
    {
      title: "Desenvolvimento Web & Mobile",
      description: "Criação de sites, sistemas e aplicativos personalizados.",
      icon: Code,
      badge: "Popular",
      features: ["React & Next.js", "React Native", "TypeScript", "PWA"]
    },
    {
      title: "Cloud Computing",
      description: "Otimização e migração para ambientes de nuvem.",
      icon: Cloud,
      badge: "AWS Certified",
      features: ["AWS Solutions", "Azure Services", "Docker", "Kubernetes"]
    },
    {
      title: "Automação de Processos",
      description: "Desenvolvimento de scripts e ferramentas para automatizar tarefas.",
      icon: Zap,
      badge: "Eficiência",
      features: ["Python Scripts", "Workflow Automation", "API Integration", "Bots"]
    },
    {
      title: "Consultoria em TI",
      description: "Estratégias tecnológicas para impulsionar seu negócio.",
      icon: Briefcase,
      badge: "Estratégico",
      features: ["Tech Strategy", "Architecture Review", "Team Training", "Planning"]
    }
  ]

  return (
    <section className="w-full max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-12 xs:py-14 sm:py-16" aria-labelledby="services-heading">
      <header className="text-center mb-8 xs:mb-10 sm:mb-12">
        <Badge variant="secondary" className="mb-3 xs:mb-4 text-xs sm:text-sm">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
          Serviços
        </Badge>
        <h2 id="services-heading" className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-3 xs:mb-4">
          Soluções Tecnológicas
        </h2>
        <p className="text-base xs:text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
          Soluções tecnológicas completas para impulsionar seu negócio
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-6 sm:gap-8" role="list">
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </section>
  )
}

// Componente de Card de Serviço
interface ServiceCardProps {
  service: Service
}

function ServiceCard({ service }: ServiceCardProps) {
  const IconComponent = service.icon
  
  return (
    <Card className="hover:shadow-lg transition-all duration-300" role="listitem">
      <CardHeader className="space-y-3 xs:space-y-4 p-4 xs:p-5 sm:p-6">
        <div className="flex flex-col xs:flex-row items-start justify-between gap-3 xs:gap-4">
          <div className="flex items-start gap-3 xs:gap-4 w-full">
            <div className="p-2 xs:p-2.5 sm:p-3 rounded-full bg-primary flex-shrink-0" aria-hidden="true">
              <IconComponent className="h-5 w-5 xs:h-6 xs:w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary-foreground" />
            </div>
            <div className="space-y-1.5 xs:space-y-2 flex-1 min-w-0">
              <CardTitle className="text-base xs:text-lg sm:text-xl font-semibold leading-tight">
                {service.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground text-xs xs:text-sm leading-relaxed">
                {service.description}
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="text-[10px] xs:text-xs self-start xs:self-auto flex-shrink-0">
            {service.badge}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 xs:space-y-4 p-4 xs:p-5 sm:p-6 pt-0">
        <Separator />
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-2.5">
          {service.features.map((feature) => (
            <div key={feature} className="flex items-center gap-1.5 xs:gap-2 text-muted-foreground">
              <Star className="h-2.5 w-2.5 xs:h-3 xs:w-3 text-primary flex-shrink-0" aria-hidden="true" />
              <span className="text-xs xs:text-sm leading-tight">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
