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
 * @version 2.1.0
 * @since 1.0.0
 */

'use client';

export const dynamic = 'force-dynamic';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';

// ============================================================================
// Types
// ============================================================================

/** Interface de coluna da chuva de matriz */
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

const MOBILE_BREAKPOINT = 640;
const TABLET_BREAKPOINT = 1024;

/** Padrões de código binário pré-definidos */
const BINARY_PATTERNS = [
  '0101', '1010', '0110', '1001', '0011', '1100', '1111', '0000',
  '1000', '0111', '1101', '0010', '0100', '1110', '1011', '0110',
  '0001', '1010', '1001', '0011', '0101', '0111', '0100', '1000',
  '1100', '0011', '1001', '0110', '1010', '0101', '0000', '1111',
  '0010', '1101', '0111', '1000',
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
 *
 * @throws Error se usado fora de MatrixProvider
 */
export function useMatrix(): MatrixContextType {
  const context = useContext(MatrixContext);
  if (!context) {
    throw new Error('useMatrix deve ser usado dentro de MatrixProvider');
  }
  return context;
}

// ============================================================================
// Helpers
// ============================================================================

function generateCharacters(count: number): string[] {
  return Array.from({ length: count }).map((_, idx) => {
    if (idx === 0) return '1';
    const pattern =
      BINARY_PATTERNS[Math.floor(Math.random() * BINARY_PATTERNS.length)] || '0101';
    return pattern[idx % pattern.length] || '0';
  });
}

function generateColumn(
  i: number,
  columnCount: number,
  isMobile: boolean,
  isTablet: boolean
): MatrixColumn {
  const randomId = Math.round(Math.random() * 10000);
  const charactersCount = isMobile
    ? 8 + Math.floor(Math.random() * 6)
    : 10 + Math.floor(Math.random() * 8);
  const intensity = 0.6 + Math.random() * 0.3;

  return {
    id: `col-${i}-${randomId}`,
    leftPct: (i / columnCount) * 100,
    fontSize: isMobile
      ? 12 + Math.random() * 4
      : isTablet
        ? 14 + Math.random() * 6
        : 16 + Math.random() * 6,
    animationDuration: 3 + Math.random() * 2,
    animationDelay: (i / columnCount) * 8,
    characters: generateCharacters(charactersCount),
    intensity,
    type: 'binary',
    speed: 1.2,
  };
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
  const [matrixColumns, setMatrixColumns] = useState<MatrixColumn[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  /** Inicializa a matrix rain */
  const initializeMatrix = useCallback(() => {
    if (isInitialized || typeof window === 'undefined') return;

    const width = window.innerWidth;
    const isMobile = width < MOBILE_BREAKPOINT;
    const isTablet = width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT;

    const columnCount = isMobile
      ? Math.min(12, Math.max(6, Math.floor(width / 40)))
      : isTablet
        ? Math.min(18, Math.max(10, Math.floor(width / 45)))
        : Math.min(25, Math.max(15, Math.floor(width / 50)));

    const initialColumns = Array.from({ length: columnCount }).map((_, i) =>
      generateColumn(i, columnCount, isMobile, isTablet)
    );

    setMatrixColumns(initialColumns);
    setIsInitialized(true);
  }, [isInitialized]);

  // Inicializa matrix automaticamente ao montar
  useEffect(() => {
    if (typeof window !== 'undefined' && !isInitialized) {
      initializeMatrix();
    }
  }, [isInitialized, initializeMatrix]);

  const contextValue: MatrixContextType = {
    matrixColumns,
    isInitialized,
    initializeMatrix,
  };

  return (
    <MatrixContext.Provider value={contextValue}>
      {children}
    </MatrixContext.Provider>
  );
}
