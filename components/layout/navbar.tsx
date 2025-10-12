"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { SITE_CONFIG, NAVIGATION } from "@/constants"

// Hook para detecção de SO
function useOSDetection() {
  const [osInfo, setOsInfo] = useState({
    os: "unknown" as "ios" | "android" | "windows" | "macos" | "linux" | "unknown",
    isMobile: false,
    isTouch: false
  })

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    
    let os: "ios" | "android" | "windows" | "macos" | "linux" | "unknown" = "unknown"
    
    if (/iphone|ipad|ipod/.test(userAgent)) {
      os = "ios"
    } else if (/android/.test(userAgent)) {
      os = "android"
    } else if (/windows/.test(userAgent)) {
      os = "windows"
    } else if (/macintosh|mac os x/.test(userAgent)) {
      os = "macos"
    } else if (/linux/.test(userAgent)) {
      os = "linux"
    }

    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent) ||
                     (window.innerWidth <= 768)

    const isTouch = 'ontouchstart' in window || 
                    navigator.maxTouchPoints > 0 || 
                    // @ts-ignore
                    navigator.msMaxTouchPoints > 0

    setOsInfo({ os, isMobile, isTouch })
  }, [])

  return osInfo
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { os, isMobile, isTouch } = useOSDetection()

  // Detectar scroll para efeito de transparência
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Fechar menu mobile ao clicar em um link
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  // Fechar menu ao pressionar Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isMobileMenuOpen])

  // Bloquear scroll quando menu estiver aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  // Configurações de estilo baseadas no SO
  const getNavbarStyles = () => {
    const baseStyles = "sticky top-0 z-50 w-full border-b transition-all duration-300"
    
    switch (os) {
      case "ios":
        return {
          className: `${baseStyles} bg-background/80 backdrop-blur-xl shadow-sm ${
            isScrolled ? "bg-background/95 shadow-lg" : ""
          }`,
          style: {
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)"
          }
        }
      case "android":
        return {
          className: `${baseStyles} bg-background/90 backdrop-blur-md ${
            isScrolled ? "bg-background/95 shadow-md" : ""
          }`
        }
      default:
        return {
          className: `${baseStyles} bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
            isScrolled ? "shadow-lg" : ""
          }`
        }
    }
  }

  const getHeightClass = () => {
    if (isMobile) {
      return os === "ios" ? "h-16" : "h-14"
    }
    return "h-14"
  }

  const navbarStyles = getNavbarStyles()
  const heightClass = getHeightClass()

  return (
    <>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex ${heightClass} items-center justify-between`}>
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link 
                href="/" 
                className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-1"
                aria-label="Ir para página inicial"
              >
                <Image
                  src="/logo.png"
                  alt={`${SITE_CONFIG.name} - Logo`}
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain transition-all duration-300 dark:brightness-0 dark:invert dark:contrast-200 dark:hue-rotate-180"
                  priority
                />
                <span className={`
                  text-lg font-bold transition-colors hidden sm:block
                  ${os === "ios" ? "font-semibold tracking-tight" : ""}
                  ${os === "android" ? "font-medium" : ""}
                `}>
                  {SITE_CONFIG.name}
                </span>
              </Link>
            </motion.div>
            
            {/* Menu Desktop */}
            <nav className="hidden md:flex items-center space-x-1" aria-label="Menu principal">
              {NAVIGATION.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <Link
                    href={item.href}
                    className={`
                      relative px-3 py-2 text-sm font-medium transition-all duration-200
                      hover:text-primary focus:outline-none focus:ring-2 
                      focus:ring-primary focus:ring-offset-2 rounded-md
                      ${os === "ios" ? "hover:bg-accent/50 active:scale-95" : ""}
                      ${os === "android" ? "hover:bg-accent rounded-lg" : ""}
                    `}
                  >
                    {item.name}
                    
                    {/* Efeito de hover específico do Android */}
                    {os === "android" && (
                      <motion.div
                        className="absolute inset-0 bg-primary/10 rounded-lg"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
              
              {/* Toggle de tema para desktop */}
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
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative z-50"
                aria-label={isMobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
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
        {process.env.NODE_ENV === "development" && (
          <div className="absolute top-full left-4 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-b-md z-50">
            {os} • {isMobile ? "mobile" : "desktop"} • {isTouch ? "touch" : "no-touch"}
          </div>
        )}


      </motion.header>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
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
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background border-l border-border z-50 md:hidden shadow-2xl"
              style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                backgroundColor: "rgba(255, 255, 255, 0.8)"
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação"
            >
              <div className="flex flex-col h-full">
                {/* Header do menu */}
                <header className="flex items-center justify-between p-4 border-b border-border">
                  <h2 className="text-lg font-semibold">Menu</h2>
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
                <nav className="flex-1 px-4 py-6" aria-label="Navegação principal">
                  <ul className="space-y-2" role="list">
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
                        <Link
                          href={item.href}
                          onClick={handleMobileLinkClick}
                          className="flex items-center w-full px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-95"
                        >
                          <span className="text-left">{item.name}</span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Footer do menu */}
                <footer className="p-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Sistema: {os.toUpperCase()}
                    </span>
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

