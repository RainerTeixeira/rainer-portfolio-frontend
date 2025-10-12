import { ContactForm } from "@/components/contato/contact-form"
import Image from "next/image"

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header da página */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="relative mb-8">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Image
                src="/images/delivery.svg"
                alt="Ícone de comunicação"
                fill
                className="object-contain"
                sizes="96px"
              />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contato</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Vamos conversar sobre seu próximo projeto! Entre em contato e vamos transformar suas ideias em realidade digital.
          </p>
        </div>
      </div>

      {/* Conteúdo da página */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <ContactForm />
      </div>
    </div>
  )
}