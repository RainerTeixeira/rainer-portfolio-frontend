import Carousel from '@/components/home/carousel';
import { Highlights } from "@/components/home/highlights"
import { AboutSection } from "@/components/home/about-section"
import { ContactSection } from "@/components/home/contact-section"

export default function Page() {
  return (
    <main className="w-full min-h-screen bg-background">
      {/* Hero Section - Carousel Principal */}
      <section 
        className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-black"
        role="banner"
        aria-label="Seção principal de apresentação cyberpunk"
      >
        <div className="absolute inset-0 w-full h-full">
          <Carousel 
            autoPlayInterval={5000}
            enableAutoPlay={true}
          />
        </div>
        
        {/* Indicador de scroll cyberpunk */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30">
          <div className="animate-bounce">
            <div className="w-8 h-12 border-2 border-cyan-400 rounded-full flex justify-center relative">
              <div className="w-1 h-4 bg-cyan-400 rounded-full mt-3 animate-pulse glow-cyan"></div>
              {/* Efeito de brilho */}
              <div className="absolute inset-0 rounded-full border border-cyan-400/50 animate-ping"></div>
            </div>
          </div>
          <div className="text-center mt-2">
            <span className="font-mono text-cyan-400 text-xs animate-pulse">SCROLL</span>
          </div>
        </div>

        {/* Efeitos de borda da tela */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-60"></div>
      </section>
      
      {/* Conteúdo Principal */}
      <div className="relative z-10 bg-gradient-to-b from-background to-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 space-y-16 sm:space-y-20 lg:space-y-24">
          {/* Seção de Destaques */}
          <section aria-labelledby="highlights-heading">
            <Highlights />
          </section>
          
          {/* Seção Sobre */}
          <section aria-labelledby="about-heading">
            <AboutSection />
          </section>
          
          {/* Seção de Contato */}
          <section aria-labelledby="contact-heading">
            <ContactSection />
          </section>
        </div>
      </div>
    </main>
  )
}