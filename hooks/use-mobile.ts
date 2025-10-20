/**
 * Hook para Detecção de Dispositivos Móveis
 * 
 * Custom hook que detecta se o usuário está em um dispositivo móvel
 * baseado na largura da viewport. Útil para renderização condicional
 * e ajustes de UI específicos para mobile.
 * 
 * @fileoverview Hook React para detecção responsiva de dispositivos móveis
 * @author Rainer Teixeira
 * @version 1.0.0
 * @since 1.0.0
 */

import * as React from "react"

/**
 * Breakpoint que define a largura máxima para dispositivos móveis
 * 
 * @constant
 * @type {number}
 * @default 768
 * 
 * @description
 * - Dispositivos com largura < 768px são considerados mobile
 * - 768px corresponde ao breakpoint 'md' do Tailwind CSS
 * - Alinha com o padrão da indústria (tablets em modo retrato)
 */
const MOBILE_BREAKPOINT = 768

/**
 * Hook useIsMobile
 * 
 * Detecta se o viewport atual é considerado mobile (< 768px).
 * Utiliza matchMedia API para detecção eficiente e reativa.
 * 
 * Características:
 * - Renderização inicial: undefined (SSR safe)
 * - Cliente: atualiza baseado na largura real
 * - Reativo: escuta mudanças de tamanho da janela
 * - Performance: usa matchMedia ao invés de resize event
 * 
 * @returns {boolean} true se a viewport é mobile (< 768px), false caso contrário
 * 
 * @example
 * import { useIsMobile } from '@/hooks/use-mobile'
 * 
 * function MyComponent() {
 *   const isMobile = useIsMobile()
 *   
 *   return (
 *     <div>
 *       {isMobile ? <MobileMenu /> : <DesktopMenu />}
 *     </div>
 *   )
 * }
 */
export function useIsMobile() {
  /**
   * Estado que armazena se o dispositivo é mobile
   * - undefined: estado inicial (SSR/hidratação)
   * - boolean: true para mobile, false para desktop
   */
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    /**
     * MediaQueryList para detectar viewport mobile
     * Usa max-width: 767px (MOBILE_BREAKPOINT - 1)
     */
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    /**
     * Callback executado quando a viewport muda de tamanho
     * Atualiza o estado baseado na largura atual da janela
     */
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    /** Adiciona listener para mudanças na media query */
    mql.addEventListener("change", onChange)
    
    /** Define o estado inicial baseado na largura atual */
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    /** Cleanup: remove listener quando o componente desmonta */
    return () => mql.removeEventListener("change", onChange)
  }, []) // Array vazio: executa apenas no mount

  /**
   * Retorna boolean garantido (converte undefined para false)
   * Isso garante tipo de retorno consistente após hidratação
   */
  return !!isMobile
}
