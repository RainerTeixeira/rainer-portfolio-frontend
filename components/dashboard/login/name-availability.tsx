/**
 * Name Availability Component
 *
 * Componente que verifica se o nome completo está disponível no sistema.
 * Implementa debounce automático (500ms) e cache de verificações para evitar
 * requisições duplicadas.
 *
 * @module components/dashboard/login/name-availability
 * @fileoverview Verificador de disponibilidade de nome
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 *
 * @example
 * ```tsx
 * <NameAvailability
 *   fullName={fullName}
 *   onAvailabilityChange={(available) => setAvailable(available)}
 *   onCheckingChange={(checking) => setIsChecking(checking)}
 * />
 * ```
 *
 * Características:
 * - Verificação em tempo real
 * - Debounce automático (500ms)
 * - Cache de verificações (evita requisições duplicadas)
 * - Validação mínima de 3 caracteres
 * - Callbacks opcionais (onAvailabilityChange, onCheckingChange)
 * - Integração com authService
 * - Componente StatusBadge para feedback visual
 * - Acessibilidade completa
 */

'use client';

import { authService } from '@/lib/api';
import { useEffect, useState } from 'react';
import { StatusBadge } from './status-badge';

interface NameAvailabilityProps {
  fullName: string;
  onAvailabilityChange: (isAvailable: boolean) => void;
  onCheckingChange?: (isChecking: boolean) => void;
  className?: string;
}

export function NameAvailability({
  fullName,
  onAvailabilityChange,
  onCheckingChange,
  className = '',
}: NameAvailabilityProps) {
  /**
   * Estado interno de verificação e cache do último nome validado.
   */
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [lastCheckedName, setLastCheckedName] = useState<string>('');

  useEffect(() => {
    const checkAvailability = async () => {
      // Reset UI state (não bloqueia submit enquanto não checar)
      setIsAvailable(null);
      onAvailabilityChange(true);

      // Don't check if fullName is too short or empty
      if (!fullName || fullName.trim().length < 3) {
        return;
      }

      // Don't check if it's the same fullName we just checked
      if (fullName.trim() === lastCheckedName) {
        return;
      }

      setIsChecking(true);
      onCheckingChange?.(true);
      setLastCheckedName(fullName.trim());

      try {
        const trimmedName = fullName.trim();

        if (trimmedName.length < 3) {
          setIsAvailable(false);
          onAvailabilityChange(false);
          return;
        }

        // Verificar disponibilidade via serviço centralizado
        const available = await authService.checkName(trimmedName);
        setIsAvailable(available);
        onAvailabilityChange(available);
      } catch (error) {
        console.error('Erro ao verificar disponibilidade do nome:', error);
        setIsAvailable(false);
        onAvailabilityChange(false);
      } finally {
        setIsChecking(false);
        onCheckingChange?.(false);
      }
    };

    // Debounce the check
    const timeoutId = setTimeout(checkAvailability, 500);
    return () => clearTimeout(timeoutId);
  }, [fullName, onAvailabilityChange, lastCheckedName]);

  if (!fullName || fullName.trim().length < 3) {
    return null;
  }

  if (isChecking) {
    return <StatusBadge status="checking" className={className} />;
  }

  if (isAvailable === null) {
    return null;
  }

  if (isAvailable) {
    return <StatusBadge status="available" className={className} />;
  }

  return <StatusBadge status="unavailable" className={className} />;
}


