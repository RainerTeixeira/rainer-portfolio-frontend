/**
 * App Wrapper Component
 *
 * Wrapper client-side que gerencia a exibição da loading screen
 * durante a inicialização e o conteúdo principal após inicialização.
 *
 * @module components/layout/app-wrapper
 * @fileoverview Wrapper da aplicação com loading screen
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

// ============================================================================
// React
// ============================================================================

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

// ============================================================================
// Providers
// ============================================================================

import {
  AppInitializationProvider,
  useAppInitialization,
} from '@/components/providers';

// ============================================================================
// UI Components
// ============================================================================

import { LoadingScreen } from '@rainersoft/ui';

// ============================================================================
// Types
// ============================================================================

interface AppWrapperProps {
  readonly children: ReactNode;
}

// ============================================================================
// Inner Component (usa o hook)
// ============================================================================

/**
 * AppContent Component
 *
 * Componente interno que usa o hook de inicialização
 * para decidir se mostra loading ou conteúdo.
 */
function AppContent({ children }: AppWrapperProps) {
  const { isInitialized, progress, currentStep } = useAppInitialization();

  // Mostra loading screen durante inicialização
  if (!isInitialized) {
    return <LoadingScreen progress={progress} currentStep={currentStep} />;
  }

  // Mostra conteúdo principal após inicialização
  return <>{children}</>;
}

// ============================================================================
// Main Component
// ============================================================================

/**
 * AppWrapper Component
 *
 * Wrapper que gerencia a inicialização da aplicação.
 * Mostra loading screen durante inicialização e conteúdo após.
 *
 * @param children - Conteúdo da aplicação
 */
export function AppWrapper({ children }: AppWrapperProps) {
  return (
    <AppInitializationProvider>
      <AppContent>{children}</AppContent>
    </AppInitializationProvider>
  );
}


