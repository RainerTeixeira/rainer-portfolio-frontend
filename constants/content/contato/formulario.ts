/**
 * @fileoverview Configuração do formulário de contato
 * @module constants/content/contato/formulario
 * @version 1.0.0
 * @author Rainer Teixeira
 * 
 * @description
 * Campos, validações e mensagens do
 * formulário de contato.
 */

import type { LucideIcon } from 'lucide-react';

/**
 * Interface para configuração de card de contato
 * @interface
 */
export interface ContactInfoCardConfig {
  readonly icon: LucideIcon | React.ComponentType<{ className?: string }>;
  readonly title: string;
  readonly content: {
    readonly primary: string;
    readonly secondary?: string;
  } | string;
  readonly iconBg: string;
  readonly borderHover: string;
  readonly href?: string | null;
  readonly action?: string;
  readonly actionIcon?: LucideIcon;
}

/**
 * Campos do formulário
 * @constant
 * @description Configuração dos campos de entrada
 */
export const CAMPOS_FORMULARIO = {
  nome: {
    label: 'Nome Completo',
    placeholder: 'Seu nome',
    obrigatorio: true,
    tipo: 'text',
  },
  email: {
    label: 'Email',
    placeholder: 'seu@email.com',
    obrigatorio: true,
    tipo: 'email',
  },
  assunto: {
    label: 'Assunto',
    placeholder: 'Sobre o que você quer conversar?',
    obrigatorio: true,
    tipo: 'text',
  },
  mensagem: {
    label: 'Mensagem',
    placeholder: 'Descreva seu projeto ou ideia...',
    obrigatorio: true,
    tipo: 'textarea',
    linhas: 5,
  },
} as const;

/**
 * Mensagens do sistema
 * @constant
 * @description Feedbacks para o usuário
 */
export const MENSAGENS = {
  sucesso: 'Mensagem enviada com sucesso! Retornarei em breve.',
  erro: 'Erro ao enviar mensagem. Tente novamente.',
  validacao: {
    campoObrigatorio: 'Este campo é obrigatório',
    emailInvalido: 'Email inválido',
    mensagemCurta: 'Mensagem muito curta (mínimo 10 caracteres)',
  },
} as const;

import { Mail, Clock, MapPin, Phone } from 'lucide-react';
import { CONTATO } from '../../metadata/comum/social';
import { DESENVOLVEDOR } from '../../metadata/comum/desenvolvedor';

/**
 * Cards de informações de contato
 * @constant
 * @description Cards para a página de contato
 */
export const INFO_CONTATO: ReadonlyArray<ContactInfoCardConfig> = [
  {
    icon: Clock,
    title: 'Horário',
    content: {
      primary: CONTATO.horarioAtendimento.dias,
      secondary: `${CONTATO.horarioAtendimento.horario} (${CONTATO.horarioAtendimento.fuso})`,
    },
    iconBg: 'from-cyan-400 to-blue-500',
    borderHover: 'hover:border-cyan-400/60',
  },
  {
    icon: Mail,
    title: 'Email',
    content: {
      primary: DESENVOLVEDOR.email,
      secondary: `Respondo em ${CONTATO.tempoResposta.email}`,
    },
    iconBg: 'from-purple-400 to-pink-500',
    borderHover: 'hover:border-purple-400/60',
    href: `mailto:${DESENVOLVEDOR.email}`,
    action: 'Enviar Email',
  },
  {
    icon: MapPin,
    title: 'Localização',
    content: {
      primary: DESENVOLVEDOR.localizacao,
      secondary: 'Atendimento remoto global',
    },
    iconBg: 'from-orange-400 to-amber-500',
    borderHover: 'hover:border-orange-400/60',
  },
  {
    icon: Phone,
    title: 'Contato',
    content: {
      primary: DESENVOLVEDOR.disponibilidade,
      secondary: DESENVOLVEDOR.tempoResposta,
    },
    iconBg: 'from-green-400 to-emerald-500',
    borderHover: 'hover:border-green-400/60',
    action: 'Agendar Conversa',
    href: '/contato#form',
  },
] as const;

