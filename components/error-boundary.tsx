/**
 * Error Boundary Component
 *
 * Componente de tratamento de erros global para React. Captura erros em
 * componentes filhos e exibe UI de fallback elegante e informativa com
 * opções de retry e navegação para home.
 *
 * @module components/error-boundary
 * @fileoverview Error boundary global da aplicação
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * // Uso básico
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 *
 * // Com fallback customizado
 * <ErrorBoundary fallback={<CustomError />}>
 *   <App />
 * </ErrorBoundary>
 * ```
 *
 * Características:
 * - Captura erros de renderização
 * - UI de fallback customizável
 * - Logging de erros
 * - Botão de retry
 * - Informações de debug em desenvolvimento
 * - Reset de estado
 * - Acessibilidade completa
 */

'use client';

// ============================================================================
// React
// ============================================================================

import { Component, ErrorInfo, ReactNode } from 'react';

// ============================================================================
// Icons
// ============================================================================

import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

// ============================================================================
// UI Components
// ============================================================================

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// ============================================================================
// Types
// ============================================================================

interface ErrorBoundaryProps {
  readonly children: ReactNode;
  readonly fallback?: ReactNode;
  readonly onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  readonly hasError: boolean;
  readonly error: Error | null;
  readonly errorInfo: ErrorInfo | null;
}

// ============================================================================
// Main Component
// ============================================================================

/**
 * Error Boundary Class Component
 *
 * Class component necessário pois error boundaries
 * ainda não são suportados em function components.
 *
 * Funcionalidades:
 * - Captura erros em componentDidCatch
 * - Atualiza estado em getDerivedStateFromError
 * - Permite reset via botão
 * - Callback opcional onError
 *
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  // ============================================================================
  // Constructor
  // ============================================================================

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  // ============================================================================
  // Lifecycle Methods
  // ============================================================================

  /**
   * Atualiza estado quando erro é capturado
   */
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  /**
   * Captura informações do erro e executa callback
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log do erro no console
    console.error('Error Boundary capturou erro:', error, errorInfo);

    // Atualiza estado com informações do erro
    this.setState({
      errorInfo,
    });

    // Executa callback se fornecido
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Em produção, enviar para serviço de monitoramento
    // Exemplo: Sentry, LogRocket, etc
    if (process.env.NODE_ENV === 'production') {
      // TODO: Integrar com serviço de erro (Sentry, etc)
      // Sentry.captureException(error, { extra: errorInfo })
    }
  }

  // ============================================================================
  // Handler Functions
  // ============================================================================

  /**
   * Reseta erro e tenta renderizar novamente
   */
  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  /**
   * Navega para home
   */
  handleGoHome = (): void => {
    window.location.href = '/';
  };

  // ============================================================================
  // Render
  // ============================================================================

  render(): ReactNode {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback } = this.props;

    // Se há erro, renderiza UI de fallback
    if (hasError) {
      // Usa fallback customizado se fornecido
      if (fallback) {
        return fallback;
      }

      // Renderiza UI de erro padrão
      return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background dark:bg-[var(--color-background-primary)]">
          <Card className="max-w-2xl w-full dark:bg-[var(--color-surface-primary)]/60 dark:border-[var(--color-status-error-border)]/30">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-full bg-[var(--color-status-error)]/10 dark:bg-[var(--color-status-error)]/10 border border-[var(--color-status-error-border)]/30">
                  <AlertTriangle className="h-8 w-8 text-[var(--color-status-error)] dark:text-[var(--color-status-error)]" />
                </div>
                <div>
                  <CardTitle className="text-2xl dark:text-[var(--color-status-error)]">
                    Algo deu errado
                  </CardTitle>
                  <CardDescription>Um erro inesperado ocorreu</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Mensagem de erro */}
              <div className="p-4 rounded-lg bg-[var(--color-status-error)]/10 dark:bg-[var(--color-status-error)]/30 border border-[var(--color-status-error-border)]/20">
                <p className="text-sm font-mono text-[var(--color-status-error)] dark:text-[var(--color-status-error)]">
                  {error?.message || 'Erro desconhecido'}
                </p>
              </div>

              {/* Stack trace (apenas em desenvolvimento) */}
              {process.env.NODE_ENV === 'development' && errorInfo && (
                <details className="p-4 rounded-lg bg-[var(--color-background-secondary)] dark:bg-[var(--color-background-secondary)]/30 border border-[var(--color-border-primary)]">
                  <summary className="text-sm font-semibold cursor-pointer text-[var(--color-text-primary)] dark:text-[var(--color-text-primary)] mb-2">
                    Detalhes técnicos (desenvolvimento)
                  </summary>
                  <pre className="text-xs font-mono text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary)] overflow-x-auto mt-2 whitespace-pre-wrap">
                    {errorInfo.componentStack}
                  </pre>
                </details>
              )}

              {/* Ações */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={this.handleReset}
                  className="flex-1 gap-2"
                  variant="default"
                >
                  <RefreshCw className="h-4 w-4" />
                  Tentar Novamente
                </Button>
                <Button
                  onClick={this.handleGoHome}
                  className="flex-1 gap-2"
                  variant="outline"
                >
                  <Home className="h-4 w-4" />
                  Voltar ao Início
                </Button>
              </div>

              {/* Informação adicional */}
              <p className="text-xs text-center text-muted-foreground">
                Se o erro persistir, entre em contato com o suporte.
              </p>
            </CardContent>
          </Card>
        </div>
      );
    }

    // Renderiza children normalmente
    return children;
  }
}
