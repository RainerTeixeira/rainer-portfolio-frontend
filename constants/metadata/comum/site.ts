/**
 * @fileoverview Configuração geral do site
 * @module constants/metadata/comum/site
 * @version 1.0.0
 * @author Rainer Teixeira
 * 
 * @description
 * Configurações gerais do site incluindo nome,
 * URLs, e informações legais.
 */

import { EMPRESA, CEO } from './desenvolvedor';
import { CONTATO } from './social';

/**
 * Configuração principal do site da Rainer Soft
 * @constant
 * @description Informações institucionais da empresa
 */
export const SITE_CONFIG = {
  fullName: 'Rainer Soft - Software House Premium',
  name: 'Rainer Soft',
  slogan: 'Transformando ideias em soluções digitais inovadoras',
  description: 'Software house líder em desenvolvimento de soluções enterprise, mobile, cloud e AI. Transformação digital com tecnologia de ponta.',
  url: 'https://rainersoft.com.br',
  github: 'https://github.com/rainersoft',
  linkedin: 'https://linkedin.com/company/rainersoft',
  instagram: 'https://instagram.com/rainersoft',
  youtube: 'https://youtube.com/@rainersoft',
  contact: {
    email: {
      comercial: EMPRESA.email,
      suporte: EMPRESA.suporte,
      responseTime: EMPRESA.tempoResposta,
    },
    phone: {
      comercial: '+55 24 3025-5000',
      suporte: '+55 24 3025-5001',
      whatsapp: '+55 24 99913-7382',
    },
    location: {
      headquarters: {
        address: 'Av. Sete de Setembro, 58 - Aterrado',
        city: 'Volta Redonda',
        state: 'RJ',
        country: 'Brasil',
        cep: '27215-610',
      },
      branches: [
        {
          city: 'São Paulo',
          state: 'SP',
          type: 'Escritório',
        },
        {
          city: 'Miami',
          state: 'FL',
          country: 'USA',
          type: 'Internacional',
        },
      ],
    },
    workingHours: {
      commercial: {
        days: 'Segunda a Sexta',
        hours: '9h às 18h',
        timezone: 'BRT (UTC-3)',
      },
      support: {
        days: '24/7',
        hours: 'Atendimento contínuo',
        sla: 'Resposta em até 2 horas',
      },
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
  holder: EMPRESA.nome,
  rights: 'Todos os direitos reservados',
  text: `© ${new Date().getFullYear()} ${EMPRESA.nome}. Todos os direitos reservados.`,
  cnpj: '00.000.000/0001-00',
} as const;

