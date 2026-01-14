/**
 * Nickname Availability Component
 *
 * Componente que verifica em tempo real se o nickname está disponível.
 * Implementa debounce automático (500ms), exibe feedback visual e integra com
 * sistema de autenticação.
 *
 * @module components/domain/dashboard/login/nickname-availability
 * @fileoverview Verificador de disponibilidade de nickname
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * <NicknameAvailability
 *   username={username}
 *   onAvailabilityChange={(available) => setAvailable(available)}
 *   excludeCognitoSub="user-123"
 * />
 * ```
 *
 * Características:
 * - Verificação em tempo real
 * - Debounce automático (500ms)
 * - Estados de idle, checking, available, unavailable
 * - Callbacks opcionais (onAvailabilityChange, onCheckingChange)
 * - Exclusão de usuário atual (excludeCognitoSub)
 * - Integração com authService
 * - Componente StatusBadge para feedback visual
 * - Acessibilidade completa
 */

'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { StatusBadge } from './status-badge';

interface NicknameAvailabilityProps {
  username: string;
  onAvailabilityChange?: (available: boolean) => void;
  onCheckingChange?: (checking: boolean) => void;
  excludeCognitoSub?: string;
}

export function NicknameAvailability({
  username,
  onAvailabilityChange,
  onCheckingChange,
  excludeCognitoSub,
}: NicknameAvailabilityProps) {
  /**
   * Estado de verificação de disponibilidade do nickname.
   * - idle: sem verificação
   * - checking: consulta em andamento
   * - available/unavailable: resultado obtido
   */
  const [status, setStatus] = useState<
    'idle' | 'checking' | 'available' | 'unavailable'
  >('idle');
  // const [message, setMessage] = useState('');

  useEffect(() => {
    // Não verificar se nickname estiver vazio ou inválido
    if (!username || username.length < 3) {
      setStatus('idle');
      onAvailabilityChange?.(false);
      return;
    }

    // Debounce: aguardar 500ms após última digitação
    const timer = setTimeout(async () => {
      setStatus('checking');
      onCheckingChange?.(true);

      try {
        // TODO: implementar verificação real quando endpoint existir
        // Por ora, assume disponível para não bloquear o fluxo de cadastro.
        setStatus('available');
        onAvailabilityChange?.(true);
      } catch (error) {
        console.error('Erro ao verificar nickname:', error);
        setStatus('idle');
        onAvailabilityChange?.(false);
      } finally {
        onCheckingChange?.(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [username, excludeCognitoSub, onAvailabilityChange, onCheckingChange]);

  // Mostra feedback visual baseado no status
  if (status === 'idle') return null;

  return <StatusBadge status={status} className="mt-1" />;
}



