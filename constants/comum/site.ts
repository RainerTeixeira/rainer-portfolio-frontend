/**
 * @fileoverview Configuração geral do site
 * @module constants/comum/site
 * @version 1.0.0
 * @author Rainer Teixeira
 * 
 * @description
 * Configurações gerais do site incluindo nome,
 * URLs, e informações legais.
 */

import { DESENVOLVEDOR } from './desenvolvedor';
import { CONTATO } from './social';

/**
 * Configuração principal do site
 * @constant
 * @description Informações gerais do site
 */
export const SITE_CONFIG = {
  fullName: 'Rainer Soft',
  name: 'Rainer Soft',
  description: 'Portfolio profissional de desenvolvimento full-stack',
  url: 'https://rainersoft.com.br',
  github: 'https://github.com/rainerteixeira',
  linkedin: 'https://linkedin.com/in/rainerteixeira',
  contact: {
    email: {
      address: DESENVOLVEDOR.email,
      responseTime: CONTATO.tempoResposta.email,
    },
    phone: {
      number: '+55 24 99913-7382',
      whatsapp: true,
    },
    location: {
      city: 'Volta Redonda',
      state: 'RJ',
      country: 'Brasil',
    },
    workingHours: {
      days: CONTATO.horarioAtendimento.dias,
      hours: CONTATO.horarioAtendimento.horario,
    },
  },
} as const;

/**
 * Data da última atualização das políticas
 * @constant
 * @description Última atualização de termos, privacidade e cookies
 */
export const POLICIES_LAST_UPDATED = '2025-01-15' as const;

/**
 * Informações de copyright
 * @constant
 * @description Texto de copyright para footer
 */
export const COPYRIGHT = {
  year: new Date().getFullYear(),
  holder: DESENVOLVEDOR.nome,
  rights: 'Todos os direitos reservados',
  text: `© ${new Date().getFullYear()} ${DESENVOLVEDOR.nome}. Todos os direitos reservados.`,
} as const;
