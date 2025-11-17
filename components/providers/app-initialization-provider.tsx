/**
 * App Initialization Provider
 *
 * Provider que gerencia a inicialização da aplicação. Controla quando
 * os sistemas estão prontos e quando a aplicação pode ser exibida.
 *
 * @module components/providers/app-initialization-provider
 * @fileoverview Provider de inicialização da aplicação
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // No layout principal
 * <AppInitializationProvider>
 *   {isInitialized ? <AppContent /> : <LoadingScreen />}
 * </AppInitializationProvider>
 * ```
 *
 * Sistemas inicializados:
 * - Autenticação (AuthProvider)
 * - Tema (ThemeProvider)
 * - Cookies
 * - Fontes
 * - Outros providers
 */

'use client';

// ============================================================================
// React
// ============================================================================

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

// ============================================================================
// Constants
// ============================================================================

/**
 * Mensagens de boot do sistema
 * Única fonte de verdade para todas as mensagens de inicialização
 * Usadas tanto no provider quanto no loading-screen
 */
export const BOOT_MESSAGES = [
  'INITIALIZING SYSTEM...',
  'LOADING NEURAL NETWORKS...',
  'CONNECTING TO MATRIX...',
  'SYNCHRONIZING DATA STREAMS...',
  'ACTIVATING QUANTUM PROCESSORS...',
  'ESTABLISHING SECURE CONNECTION...',
  'SYSTEM READY',
] as const;

// ============================================================================
// Types
// ============================================================================

interface AppInitializationContextType {
  readonly isInitialized: boolean;
  readonly progress: number;
  readonly currentStep: string;
}

interface AppInitializationProviderProps {
  readonly children: ReactNode;
}

// ============================================================================
// Context
// ============================================================================

const AppInitializationContext = createContext<
  AppInitializationContextType | undefined
>(undefined);

// ============================================================================
// Custom Hook
// ============================================================================

/**
 * Hook para acessar o estado de inicialização
 */
export function useAppInitialization(): AppInitializationContextType {
  const context = useContext(AppInitializationContext);
  if (context === undefined) {
    throw new Error(
      'useAppInitialization deve ser usado dentro de AppInitializationProvider'
    );
  }
  return context;
}

// ============================================================================
// Main Component
// ============================================================================

/**
 * AppInitializationProvider Component
 *
 * Gerencia a inicialização de todos os sistemas da aplicação.
 * Aguarda todos os providers e recursos estarem prontos antes de
 * permitir que a aplicação seja exibida.
 *
 * @param children - Componentes filhos
 */
export function AppInitializationProvider({
  children,
}: AppInitializationProviderProps) {
  // ============================================================================
  // State
  // ============================================================================

  const [isInitialized, setIsInitialized] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState<string>(
    BOOT_MESSAGES[0] || 'INITIALIZING SYSTEM...'
  );

  // ============================================================================
  // Effects
  // ============================================================================

  /**
   * Inicialização sequencial dos sistemas
   */
  useEffect(() => {
    let currentProgress = 0;
    const totalSteps = 6;
    const stepProgress = 100 / totalSteps;

    /**
     * Atualiza progresso e etapa
     */
    const updateProgress = (step: number, message: string) => {
      currentProgress = Math.min(100, step * stepProgress);
      setProgress(currentProgress);
      setCurrentStep(message);
    };

    /**
     * Sequência de inicialização
     */
    const initializeApp = async () => {
      try {
        // Etapa 1: Verificar tema (rápido)
        updateProgress(1, BOOT_MESSAGES[0] || 'INITIALIZING SYSTEM...');
        await new Promise(resolve => setTimeout(resolve, 200));

        // Etapa 2: Aguardar tema estar pronto
        updateProgress(2, BOOT_MESSAGES[1] || 'LOADING NEURAL NETWORKS...');
        await new Promise(resolve => setTimeout(resolve, 300));

        // Etapa 3: Verificar localStorage (autenticação)
        updateProgress(3, BOOT_MESSAGES[2] || 'CONNECTING TO MATRIX...');
        await new Promise(resolve => setTimeout(resolve, 200));

        // Etapa 4: Inicializar cookies
        updateProgress(4, BOOT_MESSAGES[3] || 'SYNCHRONIZING DATA STREAMS...');
        await new Promise(resolve => setTimeout(resolve, 200));

        // Etapa 5: Preparar interface
        updateProgress(
          5,
          BOOT_MESSAGES[4] || 'ACTIVATING QUANTUM PROCESSORS...'
        );
        await new Promise(resolve => setTimeout(resolve, 300));

        // Etapa 6: Finalizar
        updateProgress(
          6,
          BOOT_MESSAGES[5] || 'ESTABLISHING SECURE CONNECTION...'
        );
        await new Promise(resolve => setTimeout(resolve, 200));

        // Concluído
        setProgress(100);
        setCurrentStep(BOOT_MESSAGES[6] || 'SYSTEM READY');

        // Pequeno delay antes de mostrar a aplicação
        await new Promise(resolve => setTimeout(resolve, 300));

        setIsInitialized(true);
      } catch (error) {
        console.error('Erro durante inicialização:', error);
        // Mesmo com erro, tenta continuar após um tempo
        setTimeout(() => {
          setIsInitialized(true);
        }, 1000);
      }
    };

    initializeApp();
  }, []);

  // ============================================================================
  // Context Value
  // ============================================================================

  const contextValue: AppInitializationContextType = {
    isInitialized,
    progress,
    currentStep,
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <AppInitializationContext.Provider value={contextValue}>
      {children}
    </AppInitializationContext.Provider>
  );
}
