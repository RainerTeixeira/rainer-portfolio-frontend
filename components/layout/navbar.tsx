/**
 * Barra de Navegação Principal
 * 
 * Componente de navbar responsivo com detecção de sistema operacional,
 * menu mobile animado, e estilos otimizados para cada plataforma.
 * 
 * Características:
 * - Detecção automática de SO (iOS, Android, Windows, macOS, Linux)
 * - Estilos específicos por plataforma (blur effects, heights, etc)
 * - Menu mobile animado com overlay
 * - Efeito de scroll (transparência aumenta ao rolar)
 * - Acessibilidade completa (ARIA, keyboard navigation)
 * - Animações Framer Motion
 * 
 * @fileoverview Componente de navegação principal responsivo
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { SITE_CONFIG, NAVIGATION } from "@/constants"

/**
 * Informações do sistema operacional
 * 
 * @typedef {Object} OSInfo
 * @property {"ios" | "android" | "windows" | "macos" | "linux" | "unknown"} os - Sistema operacional detectado
 * @property {boolean} isMobile - Se é dispositivo móvel
 * @property {boolean} isTouch - Se suporta toque
 */

/**
 * Hook useOSDetection
 * 
 * Detecta o sistema operacional, tipo de dispositivo e capacidade de toque
 * do usuário através do user agent e APIs do navegador.
 * 
 * Esta detecção permite aplicar estilos e comportamentos específicos
 * para cada plataforma, otimizando a experiência do usuário.
 * 
 * Detecções realizadas:
 * - Sistema operacional (iOS, Android, Windows, macOS, Linux)
 * - Dispositivo móvel vs desktop
 * - Suporte a touch screen
 * 
 * @returns {OSInfo} Objeto com informações do sistema operacional
 * 
 * @example
 * const { os, isMobile, isTouch } = useOSDetection()
 * 
 * if (os === 'ios') {
 *   // Aplicar estilos específicos para iOS
 * }
 */
function useOSDetection() {
  /**
   * Estado com informações do SO
   * Inicializado com valores "unknown" e false
   */
  const [osInfo, setOsInfo] = useState({
    os: "unknown" as "ios" | "android" | "windows" | "macos" | "linux" | "unknown",
    isMobile: false,
    isTouch: false
  })

  /**
   * Effect que detecta SO e capacidades do dispositivo
   * Executa apenas uma vez após montagem
   */
  useEffect(() => {
    /** User agent em lowercase para facilitar regex matching */
    const userAgent = navigator.userAgent.toLowerCase()
    
    /** Variável para armazenar o SO detectado */
    let os: "ios" | "android" | "windows" | "macos" | "linux" | "unknown" = "unknown"
    
    /** Detecta iOS (iPhone, iPad, iPod) */
    if (/iphone|ipad|ipod/.test(userAgent)) {
      os = "ios"
    } 
    /** Detecta Android */
    else if (/android/.test(userAgent)) {
      os = "android"
    } 
    /** Detecta Windows */
    else if (/windows/.test(userAgent)) {
      os = "windows"
    } 
    /** Detecta macOS */
    else if (/macintosh|mac os x/.test(userAgent)) {
      os = "macos"
    } 
    /** Detecta Linux */
    else if (/linux/.test(userAgent)) {
      os = "linux"
    }

    /**
     * Detecta se é dispositivo móvel
     * Combina regex de user agent com largura da janela
     */
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent) ||
                     (window.innerWidth <= 768)

    /**
     * Detecta suporte a toque
     * Testa múltiplas APIs para compatibilidade máxima
     */
    const isTouch = 'ontouchstart' in window || 
                    navigator.maxTouchPoints > 0 || 
                    // @ts-expect-error - msMaxTouchPoints existe em versões antigas do IE
                    navigator.msMaxTouchPoints > 0

    /** Atualiza estado com todas as informações detectadas */
    setOsInfo({ os, isMobile, isTouch })
  }, []) // Array vazio: executa apenas no mount

  return osInfo
}

/**
 * Componente Navbar
 * 
 * Barra de navegação principal da aplicação com comportamento
 * responsivo e adaptativo baseado no sistema operacional.
 * 
 * Estados gerenciados:
 * - isScrolled: se a página foi rolada (para efeitos visuais)
 * - isMobileMenuOpen: se o menu mobile está aberto
 * - Informações do SO via useOSDetection
 * 
 * Comportamentos:
 * - Desktop: menu horizontal sempre visível
 * - Mobile: menu hamburguer que abre sidebar
 * - Bloqueia scroll quando menu mobile está aberto
 * - Fecha menu ao pressionar ESC
 * - Ajusta blur e sombras baseado no SO
 * 
 * @returns {JSX.Element} Barra de navegação completa
 * 
 * @example
 * // Usado automaticamente no layout.tsx
 * <header>
 *   <Navbar />
 * </header>
 */
export function Navbar() {
  /** Estado que indica se a página foi rolada (para efeitos visuais) */
  const [isScrolled, setIsScrolled] = useState(false)
  
  /** Estado que controla abertura do menu mobile */
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  /** Informações do sistema operacional e dispositivo */
  const { os, isMobile, isTouch } = useOSDetection()

  /**
   * Effect: Detectar scroll para efeito de transparência
   * 
   * Adiciona listener de scroll que marca navbar como "scrolled"
   * quando a página é rolada mais de 10px, permitindo aplicar
   * estilos diferentes (mais opacidade, sombra maior, etc)
   */
  useEffect(() => {
    /**
     * Handler de scroll
     * Define isScrolled baseado na posição vertical da página
     */
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    /** Adiciona listener com opção passive para melhor performance */
    window.addEventListener("scroll", handleScroll, { passive: true })
    
    /** Cleanup: remove listener ao desmontar */
    return () => window.removeEventListener("scroll", handleScroll)
  }, []) // Array vazio: configura apenas uma vez

  /**
   * Callback para fechar menu mobile ao clicar em um link
   * 
   * Executado quando usuário clica em qualquer link de navegação
   * no menu mobile, fechando o menu automaticamente
   */
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  /**
   * Effect: Fechar menu ao pressionar tecla Escape
   * 
   * Adiciona acessibilidade por teclado permitindo que usuários
   * fechem o menu mobile pressionando ESC
   */
  useEffect(() => {
    /**
     * Handler de teclado
     * Fecha menu se ESC for pressionado e menu estiver aberto
     */
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    /** Adiciona listener global de teclado */
    document.addEventListener("keydown", handleEscape)
    
    /** Cleanup: remove listener ao desmontar */
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isMobileMenuOpen]) // Reage a mudanças no estado do menu

  /**
   * Effect: Bloquear scroll quando menu mobile estiver aberto
   * 
   * Previne que o usuário role a página de fundo enquanto
   * navega no menu mobile, melhorando a UX
   */
  useEffect(() => {
    /**
     * Controla overflow do body baseado no estado do menu
     * - Menu aberto: overflow hidden (sem scroll)
     * - Menu fechado: overflow unset (scroll normal)
     */
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    /** Cleanup: sempre restaura scroll ao desmontar */
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen]) // Reage a mudanças no estado do menu

  /**
   * Retorna estilos específicos baseados no sistema operacional
   * 
   * Cada SO recebe otimizações específicas:
   * - iOS: blur extra forte (20px) com webkit prefix
   * - Android: blur médio sem webkit
   * - Outros: blur com feature query fallback
   * 
   * @returns {{className: string, style?: Object}} Objeto com className e style inline
   */
  const getNavbarStyles = () => {
    /** Estilos base aplicados a todos os SOs */
    const baseStyles = "sticky top-0 z-50 w-full border-b border-border/40 dark:border-cyan-400/20 transition-all duration-300"
    
    /** Switch baseado no SO detectado */
    switch (os) {
      case "ios":
        /**
         * iOS: Blur extra forte com webkit prefix
         * Safari iOS tem melhor suporte a backdrop-filter com prefixo
         */
        return {
          className: `${baseStyles} bg-background/80 dark:bg-black/80 backdrop-blur-xl shadow-sm dark:shadow-cyan-500/10 ${
            isScrolled ? "bg-background/95 dark:bg-black/95 shadow-lg dark:shadow-cyan-500/20" : ""
          }`,
          style: {
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)"
          }
        }
      case "android":
        /**
         * Android: Blur médio sem webkit prefix
         * Chrome Android funciona bem com backdrop-filter padrão
         */
        return {
          className: `${baseStyles} bg-background/90 dark:bg-black/90 backdrop-blur-md dark:shadow-cyan-500/10 ${
            isScrolled ? "bg-background/95 dark:bg-black/95 shadow-md dark:shadow-cyan-500/20" : ""
          }`
        }
      default:
        /**
         * Outros SOs: Blur com feature query
         * Usa supports-[backdrop-filter] para fallback gracioso
         */
        return {
          className: `${baseStyles} bg-background/95 dark:bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:supports-[backdrop-filter]:bg-black/60 dark:shadow-cyan-500/10 ${
            isScrolled ? "shadow-lg dark:shadow-cyan-500/20" : ""
          }`
        }
    }
  }

  /**
   * Retorna altura apropriada baseada no SO e tipo de dispositivo
   * 
   * iOS mobile requer altura maior (64px) para acomodar
   * a interface nativa do Safari
   * 
   * @returns {string} Classe Tailwind de altura
   */
  const getHeightClass = () => {
    if (isMobile) {
      /** iOS: altura 64px (h-16) para acomodar Safari UI */
      return os === "ios" ? "h-16" : "h-14"
    }
    /** Desktop: altura padrão 56px (h-14) */
    return "h-14"
  }

  /** Estilos computados baseados no SO atual */
  const navbarStyles = getNavbarStyles()
  
  /** Classe de altura computada baseada no SO e dispositivo */
  const heightClass = getHeightClass()

  /**
   * Renderização do componente
   * 
   * Estrutura:
   * 1. Header principal (desktop e mobile)
   * 2. Menu mobile animado (via AnimatePresence)
   */
  return (
    <>
      {/**
       * Header principal animado com Framer Motion
       * 
       * Animações:
       * - initial: inicia 100px acima e invisível
       * - animate: move para posição normal (y:0) e torna visível
       * - transition: efeito spring com stiffness 300
       * - delay: 0.1s para não aparecer instantaneamente
       */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30,
          delay: 0.1
        }}
        className={navbarStyles.className}
        style={navbarStyles.style}
        role="banner"
      >
        {/**
         * Container com largura máxima e padding responsivo
         * max-w-7xl: largura máxima de 1280px
         * mx-auto: centraliza horizontalmente
         * px-responsivo: padding lateral adaptável
         */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/**
           * Flex container para logo e navegação
           * - Altura dinâmica baseada em SO
           * - items-center: alinhamento vertical centralizado
           * - justify-between: logo à esquerda, menu à direita
           */}
          <div className={`flex ${heightClass} items-center justify-between`}>
            {/* Logo */}
            {/**
             * Logo animado com hover e tap effects
             * 
             * Animações Framer Motion:
             * - whileHover: escala ligeiramente ao passar mouse (1.05x)
             * - whileTap: reduz ao clicar (0.95x) para feedback tátil
             * - Spring animation para movimento natural
             */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {/**
               * Link para home com logo e nome
               * - gap-2: espaçamento entre logo e texto
               * - focus styles: anel de foco visível para acessibilidade
               * - aria-label: descrição para leitores de tela
               */}
              <Link 
                href="/" 
                className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-1"
                aria-label="Ir para página inicial"
              >
                {/**
                 * Imagem do logo
                 * - width/height: dimensões fixas para otimização
                 * - priority: carrega imediatamente (acima da dobra)
                 * - Filtros CSS no dark mode: inverte cores para tema cyberpunk
                 */}
                <Image
                  src="/logo.png"
                  alt={`${SITE_CONFIG.name} - Logo`}
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain transition-all duration-300 dark:brightness-0 dark:invert dark:contrast-200 dark:hue-rotate-180"
                  priority
                />
                {/**
                 * Nome da marca
                 * - hidden sm:block: oculto em mobile, visível de sm em diante
                 * - Estilos específicos por SO:
                 *   - iOS: font-semibold com tracking-tight
                 *   - Android: font-medium
                 * - Dark mode: texto cyan com fonte monoespaçada
                 */}
                <span className={`
                  text-lg font-bold transition-colors hidden sm:block text-foreground dark:text-cyan-200 dark:font-mono dark:tracking-wider
                  ${os === "ios" ? "font-semibold tracking-tight" : ""}
                  ${os === "android" ? "font-medium" : ""}
                `}>
                  {SITE_CONFIG.name}
                </span>
              </Link>
            </motion.div>
            
            {/* Menu Desktop */}
            {/**
             * Navegação desktop (oculta em mobile)
             * 
             * - hidden md:flex: oculto até md breakpoint
             * - items-center: alinhamento vertical
             * - space-x-1: espaçamento horizontal pequeno
             * - aria-label: identifica propósito para leitores de tela
             */}
            <nav className="hidden md:flex items-center space-x-1" aria-label="Menu principal">
              {/**
               * Mapeia itens de NAVIGATION
               * Cada link aparece com animação sequencial (stagger effect)
               */}
              {NAVIGATION.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {/**
                   * Link de navegação com estilos adaptativos
                   * 
                   * Estilos base:
                   * - px-3 py-2: padding interno
                   * - text-sm: texto pequeno
                   * - Cores responsivas ao hover
                   * - Focus ring para acessibilidade
                   * 
                   * Estilos específicos por SO:
                   * - iOS: background ao hover + escala ao clicar
                   * - Android: background ao hover + bordas arredondadas
                   */}
                  <Link
                    href={item.href}
                    className={`
                      relative px-3 py-2 text-sm font-medium transition-all duration-200 text-muted-foreground dark:text-gray-300 hover:text-primary dark:hover:text-cyan-300
                      focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-cyan-400 focus:ring-offset-2 rounded-md dark:font-mono
                      ${os === "ios" ? "hover:bg-accent dark:hover:bg-cyan-400/10 active:scale-95" : ""}
                      ${os === "android" ? "hover:bg-accent dark:hover:bg-cyan-400/10 rounded-lg" : ""}
                    `}
                  >
                    {item.name}
                    
                    {/* Efeito de hover específico do Android */}
                    {/**
                     * Overlay animado para Android
                     * Material Design ripple effect simulado
                     * Aparece apenas no hover, escala de 0 a 1
                     */}
                    {os === "android" && (
                      <motion.div
                        className="absolute inset-0 bg-primary/10 dark:bg-cyan-400/10 rounded-lg"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
              
              {/* Toggle de tema para desktop */}
              {/**
               * Botão de alternância de tema
               * Aparece por último com delay maior (0.5s)
               * Escala de 0.8 a 1.0 na entrada
               */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="ml-4"
              >
                <ThemeToggle />
              </motion.div>
            </nav>

            {/* Botão do menu mobile */}
            {/**
             * Container do botão hamburguer (visível apenas em mobile)
             * hidden em md+ (desktop)
             */}
            <div className="md:hidden">
              {/**
               * Botão hamburguer/close
               * 
               * - variant="ghost": estilo sem fundo
               * - size="icon": tamanho quadrado para ícone
               * - z-50: fica acima do overlay do menu
               * - Atributos ARIA completos para acessibilidade
               */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative z-50"
                aria-label={isMobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {/**
                 * Ícone animado (hamburguer <-> X)
                 * Rota 90° quando menu abre/fecha
                 */}
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/**
                   * Alterna entre ícone X (menu aberto) e Menu (menu fechado)
                   */}
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </motion.div>
              </Button>
            </div>
          </div>
        </div>


        {/* Informações de debug (apenas em desenvolvimento) */}
        {/**
         * Badge de debug no ambiente de desenvolvimento
         * Mostra SO, tipo de dispositivo e suporte a toque
         * Removido automaticamente em produção
         */}
        {process.env.NODE_ENV === "development" && (
          <div className="absolute top-full left-4 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-b-md z-50">
            {os} • {isMobile ? "mobile" : "desktop"} • {isTouch ? "touch" : "no-touch"}
          </div>
        )}


      </motion.header>

      {/* Menu Mobile */}
      {/**
       * AnimatePresence do Framer Motion
       * Gerencia animações de entrada/saída do menu mobile
       * Permite que elementos removidos do DOM sejam animados antes de desaparecer
       */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            {/**
             * Overlay escuro semi-transparente
             * 
             * Características:
             * - fixed inset-0: cobre toda a tela
             * - bg-black/50: preto com 50% de opacidade
             * - backdrop-blur-sm: desfoque leve do conteúdo
             * - z-40: abaixo do menu (z-50)
             * - onClick: fecha menu ao clicar fora
             * - aria-hidden: não deve ser anunciado por leitores de tela
             */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Menu Mobile */}
            {/**
             * Sidebar do menu mobile
             * 
             * Características:
             * - fixed top-0 right-0: fixado no canto superior direito
             * - h-full: altura total da viewport
             * - w-80 max-w-[85vw]: largura fixa com máximo responsivo
             * - Blur forte (20px) com prefixos webkit
             * - Spring animation para entrada suave
             * - role="dialog": modal dialog para acessibilidade
             * - aria-modal: indica que é modal (bloqueia foco)
             */}
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                mass: 0.8
              }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background/90 dark:bg-black/90 border-l border-border dark:border-cyan-400/20 z-50 md:hidden shadow-2xl dark:shadow-cyan-500/20"
              style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)"
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação"
            >
              {/**
               * Container flex vertical para estrutura do menu
               * Header, conteúdo e footer em coluna
               */}
              <div className="flex flex-col h-full">
                {/* Header do menu */}
                {/**
                 * Cabeçalho do menu mobile
                 * - flex: título à esquerda, botão fechar à direita
                 * - p-4: padding interno
                 * - border-b: linha separadora inferior
                 */}
                <header className="flex items-center justify-between p-4 border-b border-border dark:border-cyan-400/20">
                  {/** Título do menu em fonte mono no dark mode */}
                  <h2 className="text-lg font-semibold text-foreground dark:text-cyan-200 dark:font-mono">Menu</h2>
                  {/** Botão X para fechar menu */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Fechar menu"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </header>

                {/* Links de navegação */}
                {/**
                 * Área principal de navegação
                 * - flex-1: ocupa todo espaço disponível
                 * - px-4 py-6: padding generoso
                 * - aria-label: identifica para leitores de tela
                 */}
                <nav className="flex-1 px-4 py-6" aria-label="Navegação principal">
                  {/**
                   * Lista de links
                   * - space-y-2: espaçamento vertical entre itens
                   * - role="list": explicitamente uma lista para leitores de tela
                   */}
                  <ul className="space-y-2" role="list">
                    {/**
                     * Mapeia itens de navegação
                     * Cada item aparece com animação de slide da direita
                     * com delay sequencial (stagger)
                     */}
                    {NAVIGATION.map((item, index) => (
                      <motion.li
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          transition: { delay: index * 0.1 }
                        }}
                        className="w-full"
                      >
                        {/**
                         * Link de navegação mobile
                         * 
                         * - w-full: largura total do container
                         * - px-4 py-3: padding generoso para toque fácil
                         * - rounded-lg: bordas bem arredondadas
                         * - Hover: background e cor de texto
                         * - Focus: anel de foco visível
                         * - active:scale-95: feedback tátil ao tocar
                         * - onClick: fecha menu após clique
                         */}
                        <Link
                          href={item.href}
                          onClick={handleMobileLinkClick}
                          className="flex items-center w-full px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 hover:bg-accent dark:hover:bg-cyan-400/10 hover:text-accent-foreground dark:hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-cyan-400 focus:ring-offset-2 active:scale-95 text-foreground dark:text-gray-300 dark:font-mono"
                        >
                          <span className="text-left">{item.name}</span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Footer do menu */}
                {/**
                 * Rodapé do menu mobile
                 * 
                 * Mostra:
                 * - Sistema operacional detectado
                 * - Botão de alternância de tema
                 * 
                 * - p-4: padding interno
                 * - border-t: linha separadora superior
                 */}
                <footer className="p-4 border-t border-border dark:border-cyan-400/20">
                  <div className="flex items-center justify-between">
                    {/**
                     * Texto mostrando SO em uppercase
                     * Fonte mono no dark mode para estética cyberpunk
                     */}
                    <span className="text-sm text-muted-foreground dark:text-cyan-400 dark:font-mono">
                      Sistema: {os.toUpperCase()}
                    </span>
                    {/** Botão de alternância de tema */}
                    <ThemeToggle />
                  </div>
                </footer>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}


