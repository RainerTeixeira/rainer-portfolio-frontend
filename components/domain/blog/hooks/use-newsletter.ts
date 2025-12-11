/**
 * Newsletter Hook
 *
 * Hook que gerencia inscrição de usuários na newsletter com validação,
 * estados de loading/sucesso e feedback via toast. Inclui reset automático
 * após sucesso.
 *
 * @module components/domain/blog/hooks/use-newsletter
 * @fileoverview Hook para gerenciamento de newsletter
 * @author Rainer Teixeira
 * @version 2.0.0
 * @since 1.0.0
 */

'use client';

import { useState } from 'react';
import { toast } from 'sonner';

/**
 * Hook useNewsletter
 *
 * Gerencia o formulário de inscrição na newsletter.
 *
 * @returns {Object} Estado e funções de newsletter
 * @returns {string} email - Email digitado
 * @returns {Function} setEmail - Função para atualizar email
 * @returns {boolean} isLoading - Se está processando inscrição
 * @returns {boolean} isSubscribed - Se a inscrição foi concluída
 * @returns {Function} handleSubmit - Função de submit do formulário
 *
 * @example
 * import { useNewsletter } from '@/components/domain/blog/hooks'
 *
 * function NewsletterBox() {
 *   const { email, setEmail, isLoading, isSubscribed, handleSubmit } = useNewsletter()
 *
 *   if (isSubscribed) {
 *     return <p>Obrigado por se inscrever!</p>
 *   }
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <input
 *         type="email"
 *         value={email}
 *         onChange={(e) => setEmail(e.target.value)}
 *         placeholder="seu@email.com"
 *       />
 *       <button type="submit" disabled={isLoading}>
 *         {isLoading ? 'Enviando...' : 'Inscrever'}
 *       </button>
 *     </form>
 *   )
 * }
 */
export function useNewsletter() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      toast.error('Por favor, insira um email válido');
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implementar API de newsletter
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular API

      toast.success('Inscrição realizada com sucesso!');
      setIsSubscribed(true);
      setEmail('');
    } catch {
      toast.error('Erro ao se inscrever. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }

  return {
    email,
    setEmail,
    isLoading,
    isSubscribed,
    handleSubmit,
  };
}


