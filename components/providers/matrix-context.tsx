/**
 * Matrix Context Provider
 *
 * Contexto para compartilhar a matrix rain inicializada entre
 * loading-screen e carousel. A matrix é inicializada no loading
 * e passada para o carousel já pronta.
 *
 * @module components/providers/matrix-context
 * @fileoverview Contexto compartilhado para matrix rain
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
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
// Types
// ============================================================================

/**
 * Interface de coluna da chuva de matriz
 */
export interface MatrixColumn {
  readonly id: string;
  readonly leftPct: number;
  readonly fontSize: number;
  readonly animationDuration: number;
  readonly animationDelay: number;
  readonly characters: string[];
  readonly intensity: number;
  readonly type: 'binary';
  readonly speed: number;
}

interface MatrixContextType {
  readonly matrixColumns: MatrixColumn[];
  readonly isInitialized: boolean;
  readonly initializeMatrix: () => void;
}

interface MatrixProviderProps {
  readonly children: ReactNode;
}

// ============================================================================
// Constants
// ============================================================================

/**
 * Padrões de código binário pré-definidos
 */
const BINARY_PATTERNS = [
  '0101',
  '1010',
  '0110',
  '1001',
  '0011',
  '1100',
  '1111',
  '0000',
  '1000',
  '0111',
  '1101',
  '0010',
  '0100',
  '1110',
  '1011',
  '0110',
  '0001',
  '1010',
  '1001',
  '0011',
  '0101',
  '0111',
  '0100',
  '1000',
  '1100',
  '0011',
  '1001',
  '0110',
  '1010',
  '0101',
  '0000',
  '1111',
  '0010',
  '1101',
  '0111',
  '1000',
] as const;

// ============================================================================
// Context
// ============================================================================

const MatrixContext = createContext<MatrixContextType | undefined>(undefined);

// ============================================================================
// Custom Hook
// ============================================================================

/**
 * Hook para acessar o contexto da matrix
 */
export function useMatrix(): MatrixContextType {
  const context = useContext(MatrixContext);
  if (context === undefined) {
    throw new Error('useMatrix deve ser usado dentro de MatrixProvider');
  }
  return context;
}

// ============================================================================
// Main Component
// ============================================================================

/**
 * MatrixProvider Component
 *
 * Provider que gerencia a inicialização da matrix rain.
 * A matrix é inicializada uma vez e compartilhada entre componentes.
 *
 * @param children - Componentes filhos
 */
export function MatrixProvider({ children }: MatrixProviderProps) {
  // ============================================================================
  // State
  // ============================================================================

  const [matrixColumns, setMatrixColumns] = useState<MatrixColumn[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // ============================================================================
  // Functions
  // ============================================================================

  /**
   * Inicializa a matrix rain
   */
  const initializeMatrix = () => {
    if (isInitialized || typeof window === 'undefined') return;

    const width = window.innerWidth;
    const mobileBreakpoint = 640;
    const tabletBreakpoint = 1024;
    const currentIsMobile = width < mobileBreakpoint;
    const currentIsTablet =
      width >= mobileBreakpoint && width < tabletBreakpoint;

    const columnCount = currentIsMobile
      ? Math.min(12, Math.max(6, Math.floor(width / 40)))
      : currentIsTablet
        ? Math.min(18, Math.max(10, Math.floor(width / 45)))
        : Math.min(25, Math.max(15, Math.floor(width / 50)));

    // Criar colunas iniciais
    const initialColumns: MatrixColumn[] = Array.from({
      length: columnCount,
    }).map((_, i) => {
      const randomId = Math.round(Math.random() * 10000);
      const charactersCount = currentIsMobile
        ? 8 + Math.floor(Math.random() * 6)
        : 10 + Math.floor(Math.random() * 8);
      const intensity = 0.6 + Math.random() * 0.3;

      const characters: string[] = Array.from({
        length: charactersCount,
      }).map((_, idx) => {
        if (idx === 0) return '1';
        const pattern =
          BINARY_PATTERNS[Math.floor(Math.random() * BINARY_PATTERNS.length)] ||
          '0101';
        return pattern[idx % pattern.length] || '0';
      });

      return {
        id: `col-${i}-${randomId}`,
        leftPct: (i / columnCount) * 100,
        fontSize: currentIsMobile
          ? 12 + Math.random() * 4
          : currentIsTablet
            ? 14 + Math.random() * 6
            : 16 + Math.random() * 6,
        animationDuration: 3 + Math.random() * 2,
        animationDelay: (i / columnCount) * 8,
        characters,
        intensity,
        type: 'binary' as const,
        speed: 1.2,
      };
    });

    setMatrixColumns(initialColumns);
    setIsInitialized(true);
  };

  // ============================================================================
  // Effects
  // ============================================================================

  /**
   * Inicializa matrix automaticamente ao montar
   */
  useEffect(() => {
    if (typeof window !== 'undefined' && !isInitialized) {
      initializeMatrix();
    }
  }, [isInitialized]);

  // ============================================================================
  // Context Value
  // ============================================================================

  const contextValue: MatrixContextType = {
    matrixColumns,
    isInitialized,
    initializeMatrix,
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <MatrixContext.Provider value={contextValue}>
      {children}
    </MatrixContext.Provider>
  );
}
