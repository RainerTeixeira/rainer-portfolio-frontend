import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, LucideIcon } from "lucide-react"
import Link from "next/link"

interface ContactInfo {
  icon: LucideIcon
  title: string
  content: string
}

export function ContactSection() {
  const contactInfo: ContactInfo[] = [
    {
      icon: Mail,
      title: "Email",
      content: "suporte@rainersoft.com.br"
    },
    {
      icon: Phone,
      title: "Telefone",
      content: "+(55) 24 99913-7382"
    },
    {
      icon: MapPin,
      title: "Localização",
      content: "Volta Redonda, RJ - Brasil"
    }
  ]

  return (
    <section className="max-w-7xl mx-auto px-6 py-16" aria-labelledby="contact-heading">
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader className="text-center">
          <Badge variant="secondary" className="mb-4 w-fit mx-auto">
            <Mail className="w-4 h-4 mr-2" />
            Contato
          </Badge>
          <CardTitle id="contact-heading" className="text-3xl font-bold">
            Entre em Contato
          </CardTitle>
          <p className="text-xl text-muted-foreground mt-2">
            Pronto para transformar sua ideia em realidade?
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((item, index) => (
              <ContactCard key={index} item={item} />
            ))}
          </div>
          
          <Separator />
          
          <div className="text-center">
            <Link href="/contato">
              <Button size="lg" className="px-8">
                <Mail className="w-4 h-4 mr-2" />
                Enviar Mensagem
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

function ContactCard({ item }: { item: ContactInfo }) {
  const IconComponent = item.icon
  
  return (
    <Card className="text-center hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6 space-y-4">
        <div className="p-3 rounded-full bg-primary w-fit mx-auto">
          <IconComponent className="h-6 w-6 text-primary-foreground" />
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{item.title}</h3>
          <p className="text-muted-foreground text-sm">{item.content}</p>
        </div>
      </CardContent>
    </Card>
  )
}
