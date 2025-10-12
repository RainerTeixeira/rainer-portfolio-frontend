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
    <section className="w-full max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 py-12 xs:py-14 sm:py-16" aria-labelledby="contact-heading">
      <Card className="hover:shadow-lg transition-all duration-300">
        <CardHeader className="text-center p-4 xs:p-5 sm:p-6">
          <Badge variant="secondary" className="mb-3 xs:mb-4 w-fit mx-auto text-xs sm:text-sm">
            <Mail className="w-3 h-3 xs:w-4 xs:h-4 mr-1.5 xs:mr-2" />
            Contato
          </Badge>
          <CardTitle id="contact-heading" className="text-2xl xs:text-3xl font-bold">
            Entre em Contato
          </CardTitle>
          <p className="text-base xs:text-lg sm:text-xl text-muted-foreground mt-2 px-2">
            Pronto para transformar sua ideia em realidade?
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6 xs:space-y-8 p-4 xs:p-5 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 xs:gap-6">
            {contactInfo.map((item, index) => (
              <ContactCard key={index} item={item} />
            ))}
          </div>
          
          <Separator />
          
          <div className="text-center">
            <Link href="/contato">
              <Button size="lg" className="px-6 xs:px-8 text-sm xs:text-base">
                <Mail className="w-3 h-3 xs:w-4 xs:h-4 mr-2" />
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
      <CardContent className="p-4 xs:p-5 sm:p-6 space-y-3 xs:space-y-4">
        <div className="p-2 xs:p-2.5 sm:p-3 rounded-full bg-primary w-fit mx-auto">
          <IconComponent className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 text-primary-foreground" />
        </div>
        <div className="space-y-1 xs:space-y-2">
          <h3 className="font-semibold text-base xs:text-lg">{item.title}</h3>
          <p className="text-muted-foreground text-xs xs:text-sm leading-relaxed break-words">{item.content}</p>
        </div>
      </CardContent>
    </Card>
  )
}
