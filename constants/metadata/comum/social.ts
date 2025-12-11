/**
 * @fileoverview Links de redes sociais
 * @module constants/metadata/comum/social
 * @version 1.0.0
 * @author Rainer Teixeira
 * 
 * @description
 * Links para perfis em redes sociais e plataformas
 * profissionais.
 */

/**
 * Links de redes sociais
 * @constant
 * @description URLs completas para perfis externos
 */
export const REDES_SOCIAIS = {
  github: 'https://github.com/rainerteixeira',
  linkedin: 'https://linkedin.com/in/rainerteixeira',
  twitter: 'https://twitter.com/rainerteixeira',
  instagram: 'https://instagram.com/rainerteixeira',
} as const;

/**
 * Configuração de contato
 * @constant
 * @description Informações de contato e disponibilidade
 */
export const CONTATO = {
  email: 'suporte@rainersoft.com.br',
  horarioAtendimento: {
    dias: 'Segunda a Sexta',
    horario: '9h às 18h',
    fuso: 'Brasília (GMT-3)',
  },
  tempoResposta: {
    email: '24 horas',
    urgente: '2-4 horas',
  },
} as const;

