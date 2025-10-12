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
    <section className="max-w-7xl mx-auto px-6 py-16" aria-labelledby="services-heading">
      <header className="text-center mb-12">
        <Badge variant="secondary" className="mb-4">
          <Sparkles className="w-4 h-4 mr-2" />
          Serviços
        </Badge>
        <h2 id="services-heading" className="text-4xl font-bold mb-4">
          Soluções Tecnológicas
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Soluções tecnológicas completas para impulsionar seu negócio
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" role="list">
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
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary" aria-hidden="true">
              <IconComponent className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-xl font-semibold">
                {service.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {service.description}
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {service.badge}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Separator />
        <div className="grid grid-cols-2 gap-2">
          {service.features.map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-muted-foreground">
              <Star className="h-3 w-3 text-primary" aria-hidden="true" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
