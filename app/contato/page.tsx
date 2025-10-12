import { ContactForm } from "@/components/contato/contact-form"
import Image from "next/image"

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-gradient-to-b dark:from-black dark:via-gray-900 dark:to-black">
      {/* Efeito de partículas sutis - apenas no dark */}
      <div className="fixed inset-0 pointer-events-none opacity-0 dark:opacity-100">
        <div className="absolute top-32 left-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute top-60 right-1/4 w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-60 left-1/5 w-0.5 h-0.5 bg-pink-400 rounded-full animate-pulse opacity-45" style={{ animationDelay: '3s' }}></div>
      </div>
      
      {/* Header da página */}
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="text-center mb-12">
          <div className="relative mb-8">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 dark:from-cyan-400/20 dark:to-purple-400/20 rounded-full blur-xl opacity-0 dark:opacity-100"></div>
              <Image
                src="/images/delivery.svg"
                alt="Ícone de comunicação"
                fill
                className="object-contain relative z-10 filter dark:brightness-0 dark:invert"
                sizes="96px"
              />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground dark:text-cyan-200 dark:font-mono dark:tracking-wider">Contato</h1>
          <div className="w-32 h-1 bg-gradient-to-r from-primary to-primary dark:from-cyan-400 dark:to-purple-400 mx-auto mb-6"></div>
          <p className="text-muted-foreground dark:text-gray-300 text-lg max-w-2xl mx-auto dark:font-mono">
            Vamos conversar sobre seu próximo projeto! Entre em contato e vamos transformar suas ideias em realidade digital.
          </p>
        </div>
      </div>

      {/* Conteúdo da página */}
      <div className="max-w-7xl mx-auto px-6 pb-16 relative z-10">
        <ContactForm />
      </div>
    </div>
  )
}