/**
 * @fileoverview Textos da seção de contato
 * @module constants/content/contato/textos
 * @version 1.0.0
 * @description
 * Textos explicativos usados na página de contato, separados
 * para evitar hardcode direto nos componentes.
 */

/**
 * Textos da área de tempo de resposta no formulário de contato.
 * As partes dinâmicas (tempo em horas/dias) vêm de SITE_CONFIG/CONTATO.
 */
export const TEXTO_TEMPO_RESPOSTA = {
  titulo: 'Tempo de Resposta',
  descricao: 'Quando você pode esperar uma resposta.',
  prefixo: 'Normalmente respondo em',
  /**
   * Frase complementar após o tempo de resposta.
   * Exemplo final: "Normalmente respondo em 24 horas, em dias úteis."
   */
  sufixo: ', em dias úteis.',
} as const;

/**
 * Textos da área de contato urgente no formulário de contato.
 * O tempo de resposta urgente vem de CONTATO.tempoResposta.urgente.
 */
export const TEXTO_CONTATO_URGENTE = {
  prefixo: 'Para projetos urgentes, priorizo respostas em',
  whatsappLabel: 'WhatsApp',
  telefoneLabel: 'telefone',
  /**
   * Sufixo após o canal de contato.
   * Exemplo final: "Para projetos urgentes, priorizo respostas em 2-4 horas via WhatsApp."
   */
  sufixo: 'via WhatsApp.',
} as const;
