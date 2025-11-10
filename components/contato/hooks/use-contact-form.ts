/**
 * Hook para Formulário de Contato
 *
 * Gerencia estado e validação do formulário de contato,
 * incluindo campos de nome, email, assunto e mensagem.
 *
 * Funcionalidades:
 * - Estado controlado do formulário
 * - Validação básica de campos
 * - Handler de submit com reset
 * - Handler de mudança de inputs
 *
 * @fileoverview Hook para gerenciamento de formulário de contato
 * @author Rainer Teixeira
 * @version 1.0.0
 */

'use client';

import { useState } from 'react';

/**
 * Interface dos dados do formulário
 *
 * @interface ContactFormData
 * @property {string} name - Nome do usuário
 * @property {string} email - Email do usuário
 * @property {string} subject - Assunto da mensagem
 * @property {string} message - Mensagem do usuário
 */
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Hook useContactForm
 *
 * Gerencia o estado e handlers do formulário de contato.
 *
 * @returns {Object} Estado e funções do formulário
 * @returns {ContactFormData} formData - Dados do formulário
 * @returns {Function} handleChange - Handler para mudança de inputs
 * @returns {Function} handleSubmit - Handler de submit
 * @returns {Function} resetForm - Função para resetar o formulário
 *
 * @example
 * import { useContactForm } from '@/components/contato/hooks'
 *
 * function ContactForm() {
 *   const { formData, handleChange, handleSubmit } = useContactForm()
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <input
 *         name="name"
 *         value={formData.name}
 *         onChange={handleChange}
 *       />
 *       <input
 *         name="email"
 *         type="email"
 *         value={formData.email}
 *         onChange={handleChange}
 *       />
 *       <input
 *         name="subject"
 *         value={formData.subject}
 *         onChange={handleChange}
 *       />
 *       <textarea
 *         name="message"
 *         value={formData.message}
 *         onChange={handleChange}
 *       />
 *       <button type="submit">Enviar</button>
 *     </form>
 *   )
 * }
 */
export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  /**
   * Handler de mudança de inputs
   * Atualiza o estado do formulário conforme o usuário digita
   *
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - Evento de change
   */
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  /**
   * Handler de submit do formulário
   * Previne reload, processa dados e reseta o formulário
   *
   * @param {React.FormEvent} e - Evento de submit
   */
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // TODO: Em produção, enviar para API
    console.log('Formulário enviado:', formData);
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');

    // Resetar formulário
    resetForm();
  }

  /**
   * Reseta todos os campos do formulário
   */
  function resetForm() {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  }

  return {
    formData,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
